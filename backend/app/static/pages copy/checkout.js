import { toggleDropdownMenu } from "../utils/shared.js";
import { renderCartsDisplayOnly } from "../components/render.js";
import { savedCarts, saveCarts } from "../utils/saveUtils.js";
import { displayCartsCount } from "../utils/shared.js";
import { calculateSubtotal } from "../utils/calculateTotal.js";

import { hamburgerHTML } from "../components/loadComponents/header/hamburgerItem.js";
import { navigationHTML } from "../components/loadComponents/header/navigationItem.js";
import { cartCountHTML } from "../components/loadComponents/header/cartCountItem.js";

const headerBar = document.getElementById("header-bar");

headerBar.insertAdjacentHTML("beforeEnd", cartCountHTML());
headerBar.insertAdjacentHTML("beforeEnd", hamburgerHTML());
headerBar.insertAdjacentHTML(
  "beforeEnd",
  navigationHTML(),
);


const cartsCount = document.getElementById("cart-count");
const cartButton = document.getElementById("cart-btn");
const checkoutForm = document.getElementById("checkout-form");
const hamburgerButton = document.getElementById("hamburger-btn");
const dropDownMenu = document.getElementById("drop-menu");
const confirmationModal = document.getElementById("confirmation-modal");
const modalContent = document.getElementById("modal-content");
const confirmPaymentMethod = document.getElementById("confirm-payment-method");
const confirmTotalAmount = document.getElementById("confirm-total-amount");
const randomOrderId = document.getElementById("random-order-id");
const cartList = document.getElementById("carts");
const subtotalAmount = document.getElementById("subtotal-amount");
const totalAmount = document.getElementById("total-amount");
const checkoutError = document.getElementById("checkout-error");
const placeOrderButton = document.getElementById("place-order-btn");

const carts = savedCarts();

window.addEventListener("pageshow", (event) => {
  const carts = savedCarts();
  renderCartsDisplayOnly(carts, cartList);
});

cartButton.addEventListener("click", () => {
  window.location.href = "/cart";
});

const result = calculateSubtotal(carts);
subtotalAmount.textContent = result;
totalAmount.textContent = result;

checkoutForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  checkoutError.hidden = true;
  const cartItems = savedCarts();
  if (cartItems.length === 0) {
    checkoutError.textContent = "Your cart is empty. Add an item before placing an order.";
    checkoutError.hidden = false;
    return;
  }

  const formData = new FormData(checkoutForm);
  const selectedPayment = formData.get("payment");
  const paymentText = {
    "credit-card": "Credit / Debit Card",
    paypal: "PayPal",
    cod: "Cash on Delivery",
  }[selectedPayment] || selectedPayment;

  placeOrderButton.disabled = true;
  placeOrderButton.textContent = "PLACING ORDER…";
  try {
    const response = await fetch("/api/orders/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: {
          first_name: formData.get("firstname"),
          last_name: formData.get("lastname"),
          phone: formData.get("phoneNumber"),
          country: formData.get("country"),
          address: formData.get("address"),
          email: formData.get("email"),
          city: formData.get("city"),
          message: formData.get("desciption"),
        },
        payment_method: selectedPayment,
        items: cartItems.map((item) => ({
          product_id: Number(item.id),
          quantity: Number(item.quantity),
        })),
      }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "We could not place your order.");

    const order = data.order;
    randomOrderId.textContent = order.id;
    confirmPaymentMethod.textContent = paymentText;
    confirmTotalAmount.textContent = `$${Number(order.total).toFixed(2)}`;
    saveCarts([]);
    confirmationModal.classList.remove("hidden");
    requestAnimationFrame(() => requestAnimationFrame(() => {
      confirmationModal.classList.remove("opacity-0");
      modalContent.classList.remove("scale-95");
      modalContent.classList.add("scale-100");
    }));
  } catch (error) {
    checkoutError.textContent = error.message || "A network error occurred. Please try again.";
    checkoutError.hidden = false;
  } finally {
    placeOrderButton.disabled = false;
    placeOrderButton.textContent = "PLACE ORDER";
  }
});

hamburgerButton.addEventListener("click", () => {
  toggleDropdownMenu(dropDownMenu);
});

displayCartsCount(cartsCount, carts);
