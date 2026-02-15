/**
 * pages/home.js
 * Main entry for the home page UI logic.
 *
 * Responsibilities:
 * - Load persisted cart state from localStorage
 * - Wire up product "Add to Cart" interactions
 * - Keep the cart count display in sync
 *
 * Data model (cart item):
 * { id: number, name: string, price: number, image: string, quantity: number }
 */
import { toggleDropdownMenu } from "../utils/shared.js";
import { loadCarts } from "../utils/saveUtils.js";
import { addToCartAndShowMessage } from "../utils/cart-controller.js";
import { cartsCounter, displayCartsCount } from "../utils/shared.js";

const cartsCount = document.getElementById("cart-count");
const products = document.querySelector(".product-list");
const cartButton = document.getElementById("cart-btn");
const messageForm = document.getElementById("message-form");

const hamburgerButton = document.getElementById("hamburger-btn");
const dropDownMenu = document.getElementById("drop-menu");

const addToCartSuccessMessage = document.querySelector(".added-cart-success");

let carts = loadCarts();

function goToNewPage() {
  window.location.href = "carts.html";
}

cartButton.addEventListener("click", goToNewPage);

addToCartAndShowMessage(products, carts, cartsCount, addToCartSuccessMessage);

function submitMessage() {
  if (messageForm === null) {
    return;
  }
  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message sent succcessfully!");
    messageForm
      .querySelectorAll(".input-field")
      .forEach((Input) => (Input.value = ""));
  });
}
submitMessage();
toggleDropdownMenu(hamburgerButton, dropDownMenu);

const count = cartsCounter(carts);
displayCartsCount(cartsCount, count);
