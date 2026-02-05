import { renderCarts } from "../components/render.js";
import { loadCarts } from "../utils/saveUtils.js";

//Get all carts to be displayed in carts.html
//add each cart to cart list when cart button is clicked

const cartList = document.getElementById("carts-list");
const emptyCartMessage = document.getElementById("empty-cart-message");

if (!cartList) {
  console.error("Cart list element not found");
}

const carts = loadCarts();
if (carts.length === 0) {
  emptyCartMessage.classList.remove("hidden");
}
renderCarts(cartList, carts);
