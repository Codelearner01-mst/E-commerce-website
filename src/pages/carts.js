import { renderCarts } from "../components/render.js";
import { savedCarts } from "../utils/saveUtils.js";
import { displayCartsCount, toggleDropdownMenu } from "../utils/shared.js";
import { decreaseCartQuantity } from "../utils/cart-controller.js";
import { increaseCartQuantity } from "../utils/cart-controller.js";
import { calculateSubtotal } from "../utils/calculateTotal.js";
import { hamburgerHTML } from "../components/loadComponents/header/hamburgerItem.js";
import { navigationHTML } from "../components/loadComponents/header/navigationItem.js";
import { footerHTML } from "../components/loadComponents/footer/footerItem.js";
import { cartCountHTML } from "../components/loadComponents/header/cartCountItem.js";
import { saveCarts } from "../utils/saveUtils.js";
import { getCartIndex } from "../utils/helper.js";
import { getProductInCart } from "../utils/helper.js";
import { displayProduct } from "../utils/cart-controller.js";
import { runCartActionsConfirmation } from "../utils/toast/notify.js";

const headerBar = document.getElementById("header-bar");
const footer = document.getElementById("footer");

headerBar.insertAdjacentHTML("beforeEnd", cartCountHTML());
headerBar.insertAdjacentHTML("beforeEnd", hamburgerHTML());
headerBar.insertAdjacentHTML("beforeEnd", navigationHTML("./shop.html"));

footer.innerHTML = footerHTML();

const carts = savedCarts();

const cartCount = document.getElementById("cart-count");
const cartButton = document.getElementById("cart-btn");
const cartList = document.getElementById("carts-list");
const emptyCartMessage = document.getElementById("empty-cart-message");
const toastEle = document.querySelector(".update-cart-success");

const hamburgerButton = document.getElementById("hamburger-btn");
const dropDownMenu = document.getElementById("drop-menu");

const resultContainer = document.getElementById("result-container");
const subtotalAmount = document.getElementById("subtotal-amount");
const totalAmount = document.getElementById("total-amount");
const checkoutButton = document.getElementById("checkout-btn");

renderCarts(cartList, carts);

function toggleHiddenOnEmptyCarts() {
  if (carts.length === 0) {
    emptyCartMessage.classList.remove("hidden");
    resultContainer.classList.add("hidden");
  } else {
    emptyCartMessage.classList.add("hidden");
    resultContainer.classList.remove("hidden");
  }
}

function resultAmount() {
  const result = calculateSubtotal(carts);
  totalAmount.textContent = result;
  subtotalAmount.textContent = result;
}

toggleHiddenOnEmptyCarts();

function disableButton(btn) {
  btn.disabled = true;
  btn.classList.remove("cursor-pointer");
  btn.classList.add("cursor-not-allowed", "opacity-50");
}

function enableButton(btn) {
  btn.disabled = false;
  btn.classList.add("cursor-pointer");
  btn.classList.remove("cursor-not-allowed", "opacity-50");
}

document.querySelectorAll(".cart-card").forEach((card) => {
  const cardId = parseInt(card.id.split("-")[1], 10);
  const cart = getProductInCart(carts, cardId);
  if (cart.quantity < 2) {
    const decreaseBtn = card.querySelector(".decrease-btn");
    disableButton(decreaseBtn);
  }
});

cartList.addEventListener("click", (event) => {
  const target = event.target.closest("button") || event.target.closest("img");

  if (!target) {
    return;
  }

  const card = target.closest(".cart-card");
  const cardId = parseInt(card.id.split("-")[1], 10);
  const cart = getProductInCart(carts, cardId);

  let toastMsg = "Cart updated successfully!";

  if (target.classList.contains("decrease-btn")) {
    decreaseCartQuantity(cardId, carts);
    if (cart.quantity === 1) {
      const decreaseBtn = target
        .closest(".cart-btns-box")
        .querySelector(".decrease-btn");
      //disable decrease button when quantity reaches 1
      disableButton(decreaseBtn);
    }
    card.querySelector(".total-price").textContent =
      `$${cart.price * cart.quantity.toFixed(2)}`;
    resultAmount();
    runCartActionsConfirmation(toastEle, toastMsg, carts, cartCount);
    card.querySelector(".quantity-display").textContent = cart.quantity;
    return;
  }

  if (target.classList.contains("increase-btn")) {
    const decreaseBtn = target
      .closest(".cart-btns-box")
      .querySelector(".decrease-btn");
    enableButton(decreaseBtn);
    increaseCartQuantity(cardId, carts);
    card.querySelector(".quantity-display").textContent = cart.quantity;
    card.querySelector(".total-price").textContent =
      `$${cart.price * cart.quantity.toFixed(2)}`;
    resultAmount();
    runCartActionsConfirmation(toastEle, toastMsg, carts, cartCount);
    return;
  }

  if (target.classList.contains("delete-btn")) {
    toastMsg = `${cart.name} remove from cart!`;
    card.remove();
    const index = getCartIndex(cardId, carts);
    if (index > -1) {
      carts.splice(index, 1);
      resultAmount();
      runCartActionsConfirmation(toastEle, toastMsg, carts, cartCount);
      saveCarts(carts);
      toggleHiddenOnEmptyCarts();
      return;
    }
  }
  displayProduct(card, "./product.html");
});

checkoutButton.addEventListener("click", () => {
  window.location.href = "checkout.html";
});

cartButton.addEventListener("click", () => {
  window.location.href = "carts.html";
});

const result = calculateSubtotal(carts);
subtotalAmount.textContent = result;
totalAmount.textContent = result;

displayCartsCount(cartCount, carts);

hamburgerButton.addEventListener("click", () => {
  toggleDropdownMenu(dropDownMenu);
});
