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
import { displayCartsCount } from "../utils/shared.js";
import { displayProduct } from "../utils/cart-controller.js";
import { addToCartOrControlQuantity } from "../utils/cart-controller.js";
import { setProductQuantityControl } from "../utils/shared.js";

const cartsCount = document.getElementById("cart-count");
const products = document.querySelector(".product-list");
const cartButton = document.getElementById("cart-btn");
const messageForm = document.getElementById("message-form");

const hamburgerButton = document.getElementById("hamburger-btn");
const dropDownMenu = document.getElementById("drop-menu");

const addToCartSuccessMessage = document.querySelector(".added-cart-success");

const carts = loadCarts();

function goToNewPage() {
  window.location.href = "src/pages/carts.html";
}

cartButton.addEventListener("click", goToNewPage);

products.querySelectorAll(".product-card").forEach((card) => {
  const cardId = parseInt(card.id.split("-")[1], 10);
  if (carts.some((cart) => cart.id === cardId)) {
    const index = carts.findIndex((c) => c.id === cardId);
    setProductQuantityControl(
      card.querySelector(".quantity-control"),
      carts[index],
      carts,
      addToCartSuccessMessage,
      cartsCount,
    );
  }
});

products.addEventListener("click", (event) => {
  const card = event.target.closest(".product-card");
  if (!card || card === null) {
    return;
  }
  if (event.target.tagName !== "BUTTON") {
    displayProduct(card, carts, "src/pages/product.html");
  } else {
    addToCartOrControlQuantity(
      card,
      carts,
      addToCartSuccessMessage,
      cartsCount,
    );
  }
});

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

hamburgerButton.addEventListener("click", () => {
  toggleDropdownMenu(dropDownMenu);
});

displayCartsCount(cartsCount, carts);
