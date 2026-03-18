import { toggleDropdownMenu } from "../utils/shared.js";
import { renderProduct } from "../components/render.js";
import { addProductToCart } from "../utils/cart-controller.js";
import { savedCarts } from "../utils/saveUtils.js";
import { displayCartsCount } from "../utils/shared.js";
import { getCartIndex } from "../utils/helper.js";
import { getProductInCart } from "../utils/helper.js";
import { isProductInCart } from "../utils/helper.js";
import { hamburgerHTML } from "../components/loadComponents/header/hamburgerItem.js";
import { navigationHTML } from "../components/loadComponents/header/navigationItem.js";
import { cartCountHTML } from "../components/loadComponents/header/cartCountItem.js";
import { footerHTML } from "../components/loadComponents/footer/footerItem.js";
import { quantityControlItem } from "../components/quantityControlItem.js";
import { decreaseCartQuantity } from "../utils/cart-controller.js";
import { increaseCartQuantity } from "../utils/cart-controller.js";
import { ShowSucessMessage } from "../utils/shared.js";
import { productsData } from "../utils/productsStore.js";
import { runCartActionsConfirmation } from "../utils/toast/notify.js";

const headerBar = document.getElementById("header-bar");
const footer = document.getElementById("footer");

headerBar.insertAdjacentHTML("beforeEnd", cartCountHTML());
headerBar.insertAdjacentHTML("beforeEnd", hamburgerHTML());
headerBar.insertAdjacentHTML("beforeEnd", navigationHTML());

footer.innerHTML = footerHTML();

const carts = savedCarts();

const productContainer = document.getElementById("product-container");
renderProduct(productContainer, "../images/");

const addTocartBtn = document.getElementById("add-cart-btn");
const cartButton = document.getElementById("cart-btn");
const addToCartSuccessMessage = document.querySelector(".added-cart-success");
const cartsCount = document.getElementById("cart-count");

const hamburgerButton = document.getElementById("hamburger-btn");
const dropDownMenu = document.getElementById("drop-menu");

const currentProduct = JSON.parse(sessionStorage.getItem("currentProduct"));

const index = getCartIndex(currentProduct.id, productsData);
const product = productsData[index];
product.image = "../images/" + product.image;

cartButton.addEventListener("click", () => {
  window.location.href = "carts.html";
});

if (isProductInCart(currentProduct.id, carts)) {
  const cart = getProductInCart(carts, currentProduct.id);
  const cartActionsContainer = document.querySelector(
    ".cart-actions-container",
  );
  cartActionsContainer.innerHTML = quantityControlItem();
  document.querySelector(".quantity-display").textContent = cart.quantity;
}

function decreaseFunc() {
  const cart = getProductInCart(carts, currentProduct.id);
  decreaseCartQuantity(currentProduct.id, carts);
  document.querySelector(".quantity-display").textContent = cart.quantity;
  runCartActionsConfirmation(
    addToCartSuccessMessage,
    "Cart updated successfully!",
    carts,
    cartsCount,
  );
}

function increaseFunc() {
  const cart = getProductInCart(carts, currentProduct.id);
  increaseCartQuantity(currentProduct.id, carts);
  document.querySelector(".quantity-display").textContent = cart.quantity;
  runCartActionsConfirmation(
    addToCartSuccessMessage,
    "Cart updated successfully!",
    carts,
    cartsCount,
  );
}

addTocartBtn.addEventListener("click", () => {
  const card = addTocartBtn.closest(".product-card");
  const cartActionsContainer = card.querySelector(".cart-actions-container");
  addProductToCart(card, carts, addToCartSuccessMessage);
  displayCartsCount(cartsCount, carts);
  cartActionsContainer.innerHTML = quantityControlItem();

  const increaseBtn = document.querySelector(".increase-btn");
  const decreaseBtn = document.querySelector(".decrease-btn");

  increaseBtn.addEventListener("click", () => {
    increaseFunc();
  });
  decreaseBtn.addEventListener("click", () => {
    decreaseFunc();
  });
});

if (isProductInCart(currentProduct.id, carts)) {
  const increaseBtn = document.querySelector(".increase-btn");
  const decreaseBtn = document.querySelector(".decrease-btn");

  increaseBtn.addEventListener("click", () => {
    increaseFunc();
  });

  decreaseBtn.addEventListener("click", () => {
    decreaseFunc();
  });
}

hamburgerButton.addEventListener("click", () => {
  toggleDropdownMenu(dropDownMenu);
});

displayCartsCount(cartsCount, carts);
