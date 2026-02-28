import { loadCarts } from "../utils/saveUtils.js";
import { displayCartsCount, toggleDropdownMenu } from "../utils/shared.js";
import { displayProduct } from "../utils/cart-controller.js";
import { addToCartOrControlQuantity } from "../utils/cart-controller.js";
import { setProductQuantityControl } from "../utils/shared.js";

const cartCount = document.getElementById("cart-count");
const hamburgerButton = document.getElementById("hamburger-btn");
const cartButton = document.getElementById("cart-btn");
const dropDownMenu = document.getElementById("drop-menu");
const products = document.querySelector(".product-list");
const updateCartSuccessMessage = document.querySelector(".update-cart-success");

cartButton.addEventListener("click", () => {
  window.location.href = "carts.html";
});
const carts = loadCarts();

products.querySelectorAll(".product-card").forEach((card) => {
  const cardId = parseInt(card.id.split("-")[1], 10);
  if (carts.some((cart) => cart.id === cardId)) {
    const index = carts.findIndex((c) => c.id === cardId);
    setProductQuantityControl(
      card.querySelector(".quantity-control"),
      carts[index],
      carts,
      updateCartSuccessMessage,
      cartCount,
    );
  }
});

products.addEventListener("click", (event) => {
  const card = event.target.closest(".product-card");
  if (!card || card === null) {
    return;
  }
  if (event.target.tagName !== "BUTTON") {
    displayProduct(card, carts);
  }
  addToCartOrControlQuantity(card, carts, updateCartSuccessMessage, cartCount);
});

displayCartsCount(cartCount, carts);
hamburgerButton.addEventListener("click", () => {
  toggleDropdownMenu(dropDownMenu);
});
