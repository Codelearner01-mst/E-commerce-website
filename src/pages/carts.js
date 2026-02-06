import { renderCarts } from "../components/render.js";
import { loadCarts } from "../utils/saveUtils.js";
import {
  cartsCounter,
  displayCartsCount,
  toggleDropdownMenu,
} from "../utils/shared.js";

const cartCountSpan = document.getElementById("cart-count");
const cartList = document.getElementById("carts-list");
const emptyCartMessage = document.getElementById("empty-cart-message");

const hamburgerButton = document.getElementById("hamburger-btn");
const dropDownMenu = document.getElementById("drop-menu");

if (!cartList) {
  console.error("Cart list element not found");
}

const carts = loadCarts();
if (carts.length === 0) {
  emptyCartMessage.classList.remove("hidden");
}
renderCarts(cartList, carts);

const count = cartsCounter(carts);
displayCartsCount(cartCountSpan, count);

toggleDropdownMenu(hamburgerButton, dropDownMenu);
