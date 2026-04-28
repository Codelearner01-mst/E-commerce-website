import { savedCarts } from "../utils/saveUtils.js";
import { displayCartsCount, toggleDropdownMenu } from "../utils/shared.js";
import { displayProduct } from "../utils/cart-controller.js";
import { addProductToCart } from "../utils/cart-controller.js";
import { removeProductFromCart } from "../utils/cart-controller.js";
import { getProductInCart } from "../utils/helper.js";
import { isProductInCart } from "../utils/helper.js";
import { hamburgerHTML } from "../components/loadComponents/header/hamburgerItem.js";
import { navigationHTML } from "../components/loadComponents/header/navigationItem.js";
import { cartCountHTML } from "../components/loadComponents/header/cartCountItem.js";
import { footerHTML } from "../components/loadComponents/footer/footerItem.js";
import { productsData } from "../utils/productsStore.js";
import { renderProducts } from "../components/render.js";
import { decreaseCartQuantity } from "../utils/cart-controller.js";
import { increaseCartQuantity } from "../utils/cart-controller.js";
import { runCartActionsConfirmation } from "../utils/toast/notify.js";
import {
  ShowQuantityControlButtons,
  showAddToCartButton,
} from "../utils/toggler.js";

const headerBar = document.getElementById("header-bar");
const footer = document.getElementById("footer");

headerBar.insertAdjacentHTML("beforeEnd", cartCountHTML());
headerBar.insertAdjacentHTML("beforeEnd", hamburgerHTML());
headerBar.insertAdjacentHTML(
  "beforeEnd",
  navigationHTML("#products", "./about.html", "./contact.html"),
);

footer.innerHTML = footerHTML("#products", "./about.html", "./contact.html");

const cartCount = document.getElementById("cart-count");
const hamburgerButton = document.getElementById("hamburger-btn");
const cartButton = document.getElementById("cart-btn");
const dropDownMenu = document.getElementById("drop-menu");
const products = document.getElementById("product-list");

const imagePath = "../images/";

renderProducts(productsData, imagePath, products, productsData.length);

cartButton.addEventListener("click", () => {
  window.location.href = "carts.html";
});
const carts = savedCarts();

const toastMsg = "Cart updated successfully!";

//Set quantity control for all products already in cart when page reloads
window.addEventListener("pageshow", (event) => {
  const carts = savedCarts();
  products.querySelectorAll(".product-card").forEach((card) => {
    const cardId = parseInt(card.id.split("-")[1], 10);
    const cart = getProductInCart(carts, cardId);
    if (isProductInCart(cardId, carts)) {
      const quantityControlsBtn = card.querySelector(".quantity-control-btns");
      const addToCartBtn = card.querySelector(".add-cart-btn");
      ShowQuantityControlButtons(quantityControlsBtn, addToCartBtn);
      card.querySelector(".quantity-display").textContent = cart.quantity;
    }
  });
  displayCartsCount(cartCount, carts);
});

products.addEventListener("click", (event) => {
  const card = event.target.closest(".product-card");
  const cardId = parseInt(card.id.split("-")[1], 10);
  const cart = getProductInCart(carts, cardId);
  if (!card || card === null) {
    return;
  }
  if (event.target.tagName !== "BUTTON") {
    displayProduct(card, "product.html");
    return;
  }

  const quantityControlsBtn = card.querySelector(".quantity-control-btns");
  const addToCartBtn = card.querySelector(".add-cart-btn");

  if (event.target.classList.contains("decrease-btn")) {
    if (cart.quantity === 1) {
      removeProductFromCart(cardId, carts);
      showAddToCartButton(quantityControlsBtn, addToCartBtn);
      runCartActionsConfirmation(toastMsg, carts, cartCount);
    } else {
      decreaseCartQuantity(cardId, carts);
      card.querySelector(".quantity-display").textContent = cart.quantity;
      runCartActionsConfirmation(toastMsg, carts, cartCount);
    }
    return;
  }

  if (event.target.classList.contains("increase-btn")) {
    increaseCartQuantity(cardId, carts);
    card.querySelector(".quantity-display").textContent = cart.quantity;
    runCartActionsConfirmation(toastMsg, carts, cartCount);
    return;
  }

  addProductToCart(card, carts);
  displayCartsCount(cartCount, carts);
  ShowQuantityControlButtons(quantityControlsBtn, addToCartBtn);
});

displayCartsCount(cartCount, carts);
hamburgerButton.addEventListener("click", () => {
  toggleDropdownMenu(dropDownMenu);
});
