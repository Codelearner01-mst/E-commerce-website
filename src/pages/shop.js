import { savedCarts } from "../utils/saveUtils.js";
import { displayCartsCount, toggleDropdownMenu } from "../utils/shared.js";
import { displayProduct } from "../utils/cart-controller.js";
import { addProductToCart } from "../utils/cart-controller.js";
import { getProductInCart } from "../utils/helper.js";
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
import { runCartActionsConfirmation } from "../utils/toast/notify.js";

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

const imagePath = "../images/";

renderProducts(productsData, imagePath, productList, productsData.length);

cartButton.addEventListener("click", () => {
  window.location.href = "carts.html";
});
const carts = savedCarts();

//Set quantity control for all products already in cart when page reloads
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
  displayCartsCount(cartCount, carts);
});

products.addEventListener("click", (event) => {
  const card = event.target.closest(".product-card");
  const cardId = parseInt(card.id.split("-")[1], 10);
  const cartActionsContainer = card.querySelector(".cart-actions-container");
  const cart = getProductInCart(carts, cardId);
  if (!card || card === null) {
    return;
  }
  if (event.target.tagName !== "BUTTON") {
    displayProduct(card, "product.html");
    return;
  }
  if (event.target.classList.contains("decrease-btn")) {
    decreaseCartQuantity(cardId, carts);
    card.querySelector(".quantity-display").textContent = cart.quantity;
    runCartActionsConfirmation(
      updateCartSuccessMessage,
      "Cart updated successfully!",
      carts,
      cartCount,
    );
    return;
  }

  if (event.target.classList.contains("increase-btn")) {
    increaseCartQuantity(cardId, carts);
    card.querySelector(".quantity-display").textContent = cart.quantity;
    runCartActionsConfirmation(
      updateCartSuccessMessage,
      "Cart updated successfully!",
      carts,
      cartCount,
    );
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
