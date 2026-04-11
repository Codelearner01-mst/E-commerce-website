import { toggleDropdownMenu } from "../utils/shared.js";
import { renderProduct } from "../components/render.js";
import { addProductToCart } from "../utils/cart-controller.js";
import { savedCarts } from "../utils/saveUtils.js";
import { displayCartsCount } from "../utils/shared.js";
import { getCartIndex } from "../utils/helper.js";
import { getProductInCart } from "../utils/helper.js";
import { isProductInCart } from "../utils/helper.js";
import { removeProductFromCart } from "../utils/cart-controller.js";
import { hamburgerHTML } from "../components/loadComponents/header/hamburgerItem.js";
import { navigationHTML } from "../components/loadComponents/header/navigationItem.js";
import { cartCountHTML } from "../components/loadComponents/header/cartCountItem.js";
import { footerHTML } from "../components/loadComponents/footer/footerItem.js";
import { decreaseCartQuantity } from "../utils/cart-controller.js";
import { increaseCartQuantity } from "../utils/cart-controller.js";
import { productsData } from "../utils/productsStore.js";
import { runCartActionsConfirmation } from "../utils/toast/notify.js";

const headerBar = document.getElementById("header-bar");
const footer = document.getElementById("footer");

headerBar.insertAdjacentHTML("beforeEnd", cartCountHTML());
headerBar.insertAdjacentHTML("beforeEnd", hamburgerHTML());
headerBar.insertAdjacentHTML(
  "beforeEnd",
  navigationHTML("./shop.html", "./about.html", "./contact.html"),
);

footer.innerHTML = footerHTML("./shop.html", "./about.html", "./contact.html");

const carts = savedCarts();

const productContainer = document.getElementById("product-container");
renderProduct(productContainer, "../images/");

const addTocartBtn = document.getElementById("add-cart-btn");
const cartButton = document.getElementById("cart-btn");
const toastEle = document.querySelector(".added-cart-success");
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

window.addEventListener("pageshow", (event) => {
  const currentProduct = JSON.parse(sessionStorage.getItem("currentProduct"));
  if (isProductInCart(currentProduct.id, carts)) {
    const cart = getProductInCart(carts, currentProduct.id);

    // 1. Render the HTML and pass the cart object
    document.querySelector(".add-cart-btn").classList.add("hidden");
    document.querySelector(".quantity-control-btns").classList.remove("hidden");
    document.querySelector(".quantity-control-btns").classList.add("flex");
    document.querySelector(".quantity-display").textContent = cart.quantity;

    // 2. Attach listeners because the buttons now exist
    const increaseBtn = document.querySelector(".increase-btn");
    const decreaseBtn = document.querySelector(".decrease-btn");

    increaseBtn.addEventListener("click", () => {
      increaseFunc();
    });

    decreaseBtn.addEventListener("click", () => {
      decreaseFunc();
    });
  }
  displayCartsCount(cartsCount, carts);
});

const toastMsg = "Cart updated successfully!";

function decreaseFunc() {
  const cart = getProductInCart(carts, currentProduct.id);
  if (cart.quantity === 1) {
    removeProductFromCart(currentProduct.id, carts);
    document.querySelector(".add-cart-btn").classList.remove("hidden");
    document.querySelector(".quantity-control-btns").classList.add("hidden");
    runCartActionsConfirmation(toastEle, toastMsg, carts, cartsCount);
  } else {
    decreaseCartQuantity(currentProduct.id, carts);
    document.querySelector(".quantity-display").textContent = cart.quantity;
    runCartActionsConfirmation(toastEle, toastMsg, carts, cartsCount);
  }
}

function increaseFunc() {
  const cart = getProductInCart(carts, currentProduct.id);
  increaseCartQuantity(currentProduct.id, carts);
  document.querySelector(".quantity-display").textContent = cart.quantity;
  runCartActionsConfirmation(toastEle, toastMsg, carts, cartsCount);
}

addTocartBtn.addEventListener("click", () => {
  const card = addTocartBtn.closest(".product-card");
  card.querySelector(".add-cart-btn").classList.add("hidden");
  card.querySelector(".quantity-control-btns").classList.remove("hidden");
  card.querySelector(".quantity-control-btns").classList.add("flex");
  addProductToCart(card, carts, toastEle);
  displayCartsCount(cartsCount, carts);

  const increaseBtn = document.querySelector(".increase-btn");
  const decreaseBtn = document.querySelector(".decrease-btn");

  increaseBtn.addEventListener("click", () => {
    increaseFunc();
  });
  decreaseBtn.addEventListener("click", () => {
    decreaseFunc();
  });
});

hamburgerButton.addEventListener("click", () => {
  toggleDropdownMenu(dropDownMenu);
});

displayCartsCount(cartsCount, carts);
