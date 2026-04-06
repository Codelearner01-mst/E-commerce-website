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
const message = document.querySelector(".update-cart-success");

const imagePath = "../images/";

renderProducts(productsData, imagePath, products, productsData.length);

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
      card.querySelector(".add-cart-btn").classList.add("hidden");
      card.querySelector(".quantity-control-btns").classList.remove("hidden");
      card.querySelector(".quantity-control-btns").classList.add("flex");
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

  const updateMessage = "Cart updated successfully!";
  if (event.target.classList.contains("decrease-btn")) {
    if (cart.quantity === 1) {
      removeProductFromCart(cardId, carts);
      card.querySelector(".add-cart-btn").classList.remove("hidden");
      card.querySelector(".quantity-control-btns").classList.add("hidden");
      runCartActionsConfirmation(message, updateMessage, carts, cartCount);
    } else {
      decreaseCartQuantity(cardId, carts);
      card.querySelector(".quantity-display").textContent = cart.quantity;
      runCartActionsConfirmation(message, updateMessage, carts, cartCount);
    }
    return;
  }

  if (event.target.classList.contains("increase-btn")) {
    increaseCartQuantity(cardId, carts);
    card.querySelector(".quantity-display").textContent = cart.quantity;
    runCartActionsConfirmation(message, updateMessage, carts, cartCount);
    return;
  }

  addProductToCart(card, carts, message);
  displayCartsCount(cartCount, carts);
  card.querySelector(".add-cart-btn").classList.add("hidden");
  card.querySelector(".quantity-control-btns").classList.remove("hidden");
  card.querySelector(".quantity-control-btns").classList.add("flex");
});

displayCartsCount(cartCount, carts);
hamburgerButton.addEventListener("click", () => {
  toggleDropdownMenu(dropDownMenu);
});
