/**
 * pages/home.js
 * Main entry for the home page UI logic.
 *
 * Responsibilities:
 * - Load persisted cart state from localStorage
 * - Wire up product "Add to Cart" interactions
 * - Keep the cart count display in sync
 *
 * Data model (cart item):
 * { id: number, name: string, price: number, image: string, quantity: number }
 */
import { toggleDropdownMenu } from "../utils/shared.js";
import { savedCarts } from "../utils/saveUtils.js";
import { displayCartsCount } from "../utils/shared.js";
import { displayProduct } from "../utils/cart-controller.js";
import { addProductToCart } from "../utils/cart-controller.js";
import { removeProductFromCart } from "../utils/cart-controller.js";
import { getProductInCart } from "../utils/helper.js";
import { isProductInCart } from "../utils/helper.js";
import { productsData } from "../utils/productsStore.js";
import { hamburgerHTML } from "../components/loadComponents/header/hamburgerItem.js";
import { navigationHTML } from "../components/loadComponents/header/navigationItem.js";
import { cartCountHTML } from "../components/loadComponents/header/cartCountItem.js";
import { footerHTML } from "../components/loadComponents/footer/footerItem.js";
import { renderProducts } from "../components/render.js";
import { quantityControlItem } from "../components/quantityControlItem.js";
import { decreaseCartQuantity } from "../utils/cart-controller.js";
import { increaseCartQuantity } from "../utils/cart-controller.js";
import { runCartActionsConfirmation } from "../utils/toast/notify.js";
import { AddToCartHtml } from "../components/addToCartButton.js";

const headerBar = document.getElementById("header-bar");
const footer = document.getElementById("footer");

headerBar.insertAdjacentHTML("beforeEnd", cartCountHTML());
headerBar.insertAdjacentHTML("beforeEnd", hamburgerHTML());
headerBar.insertAdjacentHTML(
  "beforeEnd",
  navigationHTML("./src/pages/shop.html"),
);

footer.innerHTML = footerHTML();

const cartsCount = document.getElementById("cart-count");
const products = document.querySelector(".product-list");
const cartButton = document.getElementById("cart-btn");
const messageForm = document.getElementById("message-form");

const hamburgerButton = document.getElementById("hamburger-btn");
const dropDownMenu = document.getElementById("drop-menu");
const productList = document.getElementById("product-list");

const imagePath = "./src/images/";

renderProducts(productsData, imagePath, productList);

const successMsgEle = document.querySelector(".added-cart-success");

const carts = savedCarts();

function goToNewPage() {
  window.location.href = "src/pages/carts.html";
}

cartButton.addEventListener("click", goToNewPage);

window.addEventListener("pageshow", (event) => {
  const carts = savedCarts();
  products.querySelectorAll(".product-card").forEach((card) => {
    const cardId = parseInt(card.id.split("-")[1], 10);
    const cart = getProductInCart(carts, cardId);
    if (isProductInCart(cardId, carts)) {
      const cartActionsContainer = card.querySelector(
        ".cart-actions-container",
      );
      cartActionsContainer.innerHTML = quantityControlItem();
      card.querySelector(".quantity-display").textContent = cart.quantity;
    }
  });
  displayCartsCount(cartsCount, carts);
});

products.addEventListener("click", (event) => {
  const card = event.target.closest(".product-card");
  const cartActionsContainer = card.querySelector(".cart-actions-container");
  const cardId = parseInt(card.id.split("-")[1], 10);
  const cart = getProductInCart(carts, cardId);
  if (!card || card === null) {
    return;
  }
  if (event.target.tagName !== "BUTTON") {
    displayProduct(card, "src/pages/product.html");
    return;
  }

  const updateMessage = "Cart updated successfully!";

  if (event.target.classList.contains("decrease-btn")) {
    if (cart.quantity === 1) {
      removeProductFromCart(cardId, carts);
      cartActionsContainer.innerHTML = AddToCartHtml();
      runCartActionsConfirmation(
        successMsgEle,
        updateMessage,
        carts,
        cartsCount,
      );
    } else {
      decreaseCartQuantity(cardId, carts);
      card.querySelector(".quantity-display").textContent = cart.quantity;
      runCartActionsConfirmation(
        successMsgEle,
        updateMessage,
        carts,
        cartsCount,
      );
    }
    return;
  }

  if (event.target.classList.contains("increase-btn")) {
    increaseCartQuantity(cardId, carts);
    card.querySelector(".quantity-display").textContent = cart.quantity;
    runCartActionsConfirmation(successMsgEle, updateMessage, carts, cartsCount);
    return;
  }

  addProductToCart(card, carts, successMsgEle);
  displayCartsCount(cartsCount, carts);
  cartActionsContainer.innerHTML = quantityControlItem();
});

function submitMessage() {
  if (messageForm === null) {
    return;
  }
  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message sent succcessfully!");
    messageForm
      .querySelectorAll(".input-field")
      .forEach((Input) => (Input.value = ""));
  });
}
submitMessage();

hamburgerButton.addEventListener("click", () => {
  toggleDropdownMenu(dropDownMenu);
});

displayCartsCount(cartsCount, carts);
