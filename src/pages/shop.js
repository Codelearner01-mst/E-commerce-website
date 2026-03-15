import { savedCarts } from "../utils/saveUtils.js";
import { displayCartsCount, toggleDropdownMenu } from "../utils/shared.js";
import { displayProduct } from "../utils/cart-controller.js";
import { addProductToCart } from "../utils/cart-controller.js";
import { getCartIndex } from "../utils/helper.js";
import { isProductInCart } from "../utils/helper.js";
import { hamburgerHTML } from "../components/loadComponents/header/hamburgerItem.js";
import { navigationHTML } from "../components/loadComponents/header/navigationItem.js";
import { cartCountHTML } from "../components/loadComponents/header/cartCountItem.js";
import { footerHTML } from "../components/loadComponents/footer/footerItem.js";
import { productsData } from "../utils/productsStore.js";
import { renderProducts } from "../components/render.js";
import { quantityControlItem } from "../components/quantityControlItem.js";
import { decreaseCartQuantity } from "../utils/cart-controller.js";
import { increaseCartQuantity } from "../utils/cart-controller.js";
import { ShowSucessMessage } from "../utils/shared.js";

const headerBar = document.getElementById("header-bar");
const footer = document.getElementById("footer");

headerBar.insertAdjacentHTML("beforeEnd", cartCountHTML());
headerBar.insertAdjacentHTML("beforeEnd", hamburgerHTML());
headerBar.insertAdjacentHTML("beforeEnd", navigationHTML("#products"));

footer.innerHTML = footerHTML();

const cartCount = document.getElementById("cart-count");
const hamburgerButton = document.getElementById("hamburger-btn");
const cartButton = document.getElementById("cart-btn");
const dropDownMenu = document.getElementById("drop-menu");
const products = document.querySelector(".product-list");
const updateCartSuccessMessage = document.querySelector(".update-cart-success");
const productList = document.getElementById("product-list");

renderProducts(productsData, productList, productsData.length);

cartButton.addEventListener("click", () => {
  window.location.href = "carts.html";
});
const carts = savedCarts();

//Set quantity control for all products already in cart when page reloads
products.querySelectorAll(".product-card").forEach((card) => {
  const cardId = parseInt(card.id.split("-")[1], 10);
  const index = getCartIndex(cardId, carts);
  const cart = carts[index];
  if (isProductInCart(cardId, carts)) {
    const cartActionsContainer = card.querySelector(".cart-actions-container");
    cartActionsContainer.innerHTML = quantityControlItem();
    card.querySelector(".quantity-display").textContent = cart.quantity;
  }
});

products.addEventListener("click", (event) => {
  const card = event.target.closest(".product-card");
  const cardId = parseInt(card.id.split("-")[1], 10);
  const cartActionsContainer = card.querySelector(".cart-actions-container");
  const index = getCartIndex(cardId, carts);
  const cart = carts[index];
  if (!card || card === null) {
    return;
  }
  if (event.target.tagName !== "BUTTON") {
    displayProduct(card, carts, "product.html");
    return;
  }
  if (event.target.classList.contains("decrease-btn")) {
    decreaseCartQuantity(cardId, carts);
    card.querySelector(".quantity-display").textContent = cart.quantity;
    ShowSucessMessage(updateCartSuccessMessage, "Cart updated successfully!");
    displayCartsCount(cartCount, carts);
    return;
  }

  if (event.target.classList.contains("increase-btn")) {
    increaseCartQuantity(cardId, carts);
    card.querySelector(".quantity-display").textContent = cart.quantity;
    ShowSucessMessage(updateCartSuccessMessage, "Cart updated successfully!");
    displayCartsCount(cartCount, carts);
    return;
  }

  addProductToCart(card, carts, updateCartSuccessMessage);
  displayCartsCount(cartCount, carts);
  cartActionsContainer.innerHTML = quantityControlItem();
});

displayCartsCount(cartCount, carts);
hamburgerButton.addEventListener("click", () => {
  toggleDropdownMenu(dropDownMenu);
});
