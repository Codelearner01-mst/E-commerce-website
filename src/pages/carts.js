import { renderCarts } from "../components/render.js";
import { savedCarts } from "../utils/saveUtils.js";
import { displayCartsCount, toggleDropdownMenu } from "../utils/shared.js";
import { calculateSubtotal } from "../utils/calculateTotal.js";
import { hamburgerHTML } from "../components/loadComponents/header/hamburgerItem.js";
import { navigationHTML } from "../components/loadComponents/header/navigationItem.js";
import { footerHTML } from "../components/loadComponents/footer/footerItem.js";
import { cartCountHTML } from "../components/loadComponents/header/cartCountItem.js";

const headerBar = document.getElementById("header-bar");
const footer = document.getElementById("footer");

headerBar.insertAdjacentHTML("beforeEnd", cartCountHTML());
headerBar.insertAdjacentHTML("beforeEnd", hamburgerHTML());
headerBar.insertAdjacentHTML("beforeEnd", navigationHTML("./shop.html"));

footer.innerHTML = footerHTML();

const carts = savedCarts();

const cartCountSpan = document.getElementById("cart-count");
const cartButton = document.getElementById("cart-btn");
const cartList = document.getElementById("carts-list");
const emptyCartMessage = document.getElementById("empty-cart-message");
const updateCartSuccessMessage = document.querySelector(".update-cart-success");

const hamburgerButton = document.getElementById("hamburger-btn");
const dropDownMenu = document.getElementById("drop-menu");

const resultContainer = document.getElementById("result-container");
const subtotalAmount = document.getElementById("subtotal-amount");
const totalAmount = document.getElementById("total-amount");
const checkoutButton = document.getElementById("checkout-btn");

renderCarts(
  cartList,
  carts,
  cartCountSpan,
  updateCartSuccessMessage,
  totalAmount,
  subtotalAmount,
);

checkoutButton.addEventListener("click", () => {
  window.location.href = "checkout.html";
});

cartButton.addEventListener("click", () => {
  window.location.href = "carts.html";
});

const result = calculateSubtotal(carts);
subtotalAmount.textContent = result;
totalAmount.textContent = result;

if (carts.length === 0) {
  emptyCartMessage.classList.remove("hidden");
  resultContainer.classList.add("hidden");
} else {
  emptyCartMessage.classList.add("hidden");
  resultContainer.classList.remove("hidden");
}

displayCartsCount(cartCountSpan, carts);

hamburgerButton.addEventListener("click", () => {
  toggleDropdownMenu(dropDownMenu);
});
