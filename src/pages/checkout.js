import { toggleDropdownMenu } from "../utils/shared.js";
import { renderCartsDisplayOnly } from "../components/render.js";
import { savedCarts } from "../utils/saveUtils.js";
import { displayCartsCount } from "../utils/shared.js";
import { calculateSubtotal } from "../utils/calculateTotal.js";

import { hamburgerHTML } from "../components/loadComponents/header/hamburgerItem.js";
import { navigationHTML } from "../components/loadComponents/header/navigationItem.js";
import { cartCountHTML } from "../components/loadComponents/header/cartCountItem.js";

const headerBar = document.getElementById("header-bar");

headerBar.insertAdjacentHTML("beforeEnd", cartCountHTML());
headerBar.insertAdjacentHTML("beforeEnd", hamburgerHTML());
headerBar.insertAdjacentHTML("beforeEnd", navigationHTML("./shop.html"));

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

const carts = savedCarts();

renderCartsDisplayOnly(carts, cartList);

cartButton.addEventListener("click", () => {
  window.location.href = "carts.html";
});

const result = calculateSubtotal(carts);
subtotalAmount.textContent = result;
totalAmount.textContent = result;

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get selected payment method
  const selectedPayment = document.querySelector(
    'input[name="payment"]:checked',
  );
  let paymentText = "Credit / Debit Card";
  if (selectedPayment) {
    if (selectedPayment.value === "paypal") paymentText = "PayPal";
    else if (selectedPayment.value === "cod") paymentText = "Cash on Delivery";
  }

  // Generate random order ID
  randomOrderId.textContent = Math.floor(1000 + Math.random() * 9000);

  // Update modal info
  confirmPaymentMethod.textContent = paymentText;
  confirmTotalAmount.textContent =
    totalAmount && totalAmount.textContent !== "$0.00"
      ? totalAmount.textContent
      : "$189.88"; // Fallback placeholder if actual calculation isn't present

  // Show modal
  confirmationModal.classList.remove("hidden");

  // Trigger animations after a tiny delay for CSS transitions to work
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      confirmationModal.classList.remove("opacity-0");
      modalContent.classList.remove("scale-95");
      modalContent.classList.add("scale-100");
    });
  });
});

hamburgerButton.addEventListener("click", () => {
  toggleDropdownMenu(dropDownMenu);
});

displayCartsCount(cartsCount, carts);
