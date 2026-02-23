import { loadCarts } from "../utils/saveUtils.js";
import { displayCartsCount, toggleDropdownMenu } from "../utils/shared.js";

import { addToCartOrDisplayProduct } from "../utils/cart-controller.js";

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

addToCartOrDisplayProduct(products, carts, cartCount, updateCartSuccessMessage);

displayCartsCount(cartCount, carts);
hamburgerButton.addEventListener("click", () => {
  toggleDropdownMenu(dropDownMenu);
});
