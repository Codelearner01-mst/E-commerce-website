import { renderProduct } from "../components/render.js";
import { addProductToCart } from "../utils/cart-controller.js";
import { savedCarts } from "../utils/saveUtils.js";
import { displayCartsCount } from "../utils/shared.js";
import { getCartIndex } from "../utils/helper.js";
import { isProductInCart } from "../utils/helper.js";
import { hamburgerHTML } from "../components/loadComponents/header/hamburgerItem.js";
import { navigationHTML } from "../components/loadComponents/header/navigationItem.js";
import { cartCountHTML } from "../components/loadComponents/header/cartCountItem.js";
import { footerHTML } from "../components/loadComponents/footer/footerItem.js";
import { quantityControlItem } from "../components/quantityControlItem.js";
import { decreaseCartQuantity } from "../utils/cart-controller.js";
import { increaseCartQuantity } from "../utils/cart-controller.js";
import { ShowSucessMessage } from "../utils/shared.js";

const headerBar = document.getElementById("header-bar");
const footer = document.getElementById("footer");

headerBar.insertAdjacentHTML("beforeEnd", cartCountHTML());
headerBar.insertAdjacentHTML("beforeEnd", hamburgerHTML());
headerBar.insertAdjacentHTML("beforeEnd", navigationHTML());

footer.innerHTML = footerHTML();

const carts = savedCarts();

const productContainer = document.getElementById("product-container");
renderProduct(productContainer);

const addTocartBtn = document.getElementById("add-cart-btn");
const cartButton = document.getElementById("cart-btn");
const addToCartSuccessMessage = document.querySelector(".added-cart-success");
const cartsCount = document.getElementById("cart-count");
const currentProduct = JSON.parse(sessionStorage.getItem("currentProduct"));

cartButton.addEventListener("click", () => {
  window.location.href = "carts.html";
});

if (isProductInCart(currentProduct.id, carts)) {
  const index = getCartIndex(currentProduct.id, carts);
  const cart = carts[index];
  const cartActionsContainer = document.querySelector(
    ".cart-actions-container",
  );
  cartActionsContainer.innerHTML = quantityControlItem();
  document.querySelector(".quantity-display").textContent = cart.quantity;
  document.querySelector(".quantity-control").style.backgroundColor = "white";
  document.querySelector(".quantity-control").style.border = "none";
}

addTocartBtn.addEventListener("click", () => {
  const card = addTocartBtn.closest(".product-card");
  const cartActionsContainer = card.querySelector(".cart-actions-container");
  addProductToCart(card, carts, addToCartSuccessMessage);
  displayCartsCount(cartsCount, carts);
  cartActionsContainer.innerHTML = quantityControlItem();
  card.querySelector(".quantity-control").style.backgroundColor = "white";
  card.querySelector(".quantity-control").style.border = "none";
});

const increaseBtn = document.querySelector(".increase-btn");
const decreaseBtn = document.querySelector(".decrease-btn");

increaseBtn.addEventListener("click", () => {
  const index = getCartIndex(currentProduct.id, carts);
  const cart = carts[index];
  increaseCartQuantity(currentProduct.id, carts);
  document.querySelector(".quantity-display").textContent = cart.quantity;
  ShowSucessMessage(addToCartSuccessMessage, "Cart updated successfully!");
  displayCartsCount(cartsCount, carts);
});

decreaseBtn.addEventListener("click", () => {
  const index = getCartIndex(currentProduct.id, carts);
  const cart = carts[index];
  decreaseCartQuantity(currentProduct.id, carts);
  document.querySelector(".quantity-display").textContent = cart.quantity;
  ShowSucessMessage(addToCartSuccessMessage, "Cart updated successfully!");
  displayCartsCount(cartsCount, carts);
});

displayCartsCount(cartsCount, carts);
