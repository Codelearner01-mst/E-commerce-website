import { renderProduct } from "../components/render.js";
import { addToCartOrControlQuantity } from "../utils/cart-controller.js";
import { loadCarts } from "../utils/saveUtils.js";

const carts = loadCarts();

const productContainer = document.getElementById("product-container");
renderProduct(productContainer);

const addTocartBtn = document.getElementById("add-cart-btn");
const addToCartSuccessMessage = document.querySelector(".added-cart-success");
const cartsCount = document.getElementById("cart-count");

addTocartBtn.addEventListener("click", () => {
  const card = addTocartBtn.closest(".product-card");
  addToCartOrControlQuantity(card, carts, addToCartSuccessMessage, cartsCount);
  card.querySelector(".quantity-control").style.backgroundColor = "white";
  card.querySelector(".quantity-control").style.border = "none";
});
