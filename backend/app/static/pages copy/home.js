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
import { savedWishlist, saveWishlist } from "../utils/saveUtils.js";
import { displayCartsCount } from "../utils/shared.js";
import { displayProduct } from "../utils/cart-controller.js";
import { addProductToCart } from "../utils/cart-controller.js";
import { removeProductFromCart } from "../utils/cart-controller.js";
import { getProductInCart } from "../utils/helper.js";
import { isProductInCart } from "../utils/helper.js";
import { hamburgerHTML } from "../components/loadComponents/header/hamburgerItem.js";
import { navigationHTML } from "../components/loadComponents/header/navigationItem.js";
import { cartCountHTML } from "../components/loadComponents/header/cartCountItem.js";
import { renderProducts } from "../components/render.js";
import { decreaseCartQuantity } from "../utils/cart-controller.js";
import { increaseCartQuantity } from "../utils/cart-controller.js";
import { runCartActionsConfirmation } from "../utils/toast/notify.js";
import {
  ShowQuantityControlButtons,
  showAddToCartButton,
} from "../utils/toggler.js";

const headerBar = document.getElementById("header-bar");

headerBar.insertAdjacentHTML("beforeEnd", cartCountHTML());
headerBar.insertAdjacentHTML("beforeEnd", hamburgerHTML());
headerBar.insertAdjacentHTML("beforeEnd", navigationHTML());

const cartsCount = document.getElementById("cart-count");
const cartButton = document.getElementById("cart-btn");
const messageForm = document.getElementById("message-form");

const hamburgerButton = document.getElementById("hamburger-btn");
const dropDownMenu = document.getElementById("drop-menu");
const products = document.getElementById("product-list");

const imagePath = "/static/images/";

let productsData = [];

async function loadHomeCatalog() {
  try {
    const [productsResponse, categoriesResponse] = await Promise.all([
      fetch("/api/products/data"),
      fetch("/api/products/categories"),
    ]);
    if (!productsResponse.ok) throw new Error("Product request failed.");
    const productPayload = await productsResponse.json();
    const categoryPayload = categoriesResponse.ok
      ? await categoriesResponse.json()
      : { categories: [] };
    productsData = Array.isArray(productPayload.products)
      ? productPayload.products
      : [];
    renderProducts(productsData.slice(0, 4), imagePath, products);
    syncCartCards();

    const categoryGrid = document.querySelector(".category-grid");
    if (categoryGrid && Array.isArray(categoryPayload.categories)) {
      const categoryImages = [
        "sabrianna-a9HPsYvWr-E-unsplash.jpg",
        "atul-mohan-TmOPo7TpLzw-unsplash - Copy.jpg",
        "alex-azabache-y2ErhoE92KA-unsplash.jpg",
        "nexaro-studio-vbsN7MUXyT4-unsplash.jpg",
      ];
      categoryGrid.replaceChildren(
        ...categoryPayload.categories.slice(0, 4).map((category, index) => {
          const link = document.createElement("a");
          link.className = "category-card";
          link.href = `/shop?category=${encodeURIComponent(category.name)}`;
          link.style.backgroundImage = `url("${imagePath}${encodeURIComponent(categoryImages[index % categoryImages.length])}")`;
          const content = document.createElement("div");
          content.className = "category-card-content";
          const eyebrow = document.createElement("span");
          eyebrow.className = "eyebrow";
          eyebrow.textContent = "Collection";
          const title = document.createElement("h3");
          title.textContent = category.name;
          content.append(eyebrow, title);
          link.append(content);
          return link;
        }),
      );
    }
  } catch (error) {
    if (products)
      products.innerHTML =
        "<p class='col-span-full py-8 text-center text-gray-500'>Featured pieces are temporarily unavailable.</p>";
  }
}

loadHomeCatalog();

const carts = savedCarts();

function goToNewPage() {
  window.location.href = "/cart";
}

cartButton.addEventListener("click", goToNewPage);

window.addEventListener("pageshow", (event) => {
  syncCartCards();
  displayCartsCount(cartsCount, savedCarts());
});

function syncCartCards() {
  const carts = savedCarts();
  products.querySelectorAll(".product-card").forEach((card) => {
    const cardId = parseInt(card.id.split("-")[1], 10);
    const addToCartBtn = card.querySelector(".add-cart-btn");
    const quantityControlsBtn = card.querySelector(".quantity-control-btns");
    const cart = getProductInCart(carts, cardId);
    if (isProductInCart(cardId, carts)) {
      ShowQuantityControlButtons(quantityControlsBtn, addToCartBtn);
      card.querySelector(".quantity-display").textContent = cart.quantity;
    }
  });
}

products.addEventListener("click", (event) => {
  const card = event.target.closest(".product-card");
  if (!card) return;
  const cardId = parseInt(card.id.split("-")[1], 10);
  const addToCartBtn = card.querySelector(".add-cart-btn");
  const quantityControlsBtn = card.querySelector(".quantity-control-btns");
  const cart = getProductInCart(carts, cardId);
  const wishlistButton = event.target.closest(
    ".wishlist-btn, .wishlist-inline-btn",
  );
  if (wishlistButton) {
    const wishlist = savedWishlist();
    const wishlistIndex = wishlist.findIndex(
      (item) => Number(typeof item === "object" ? item.id : item) === cardId,
    );
    if (wishlistIndex === -1) wishlist.push(cardId);
    else wishlist.splice(wishlistIndex, 1);
    saveWishlist(wishlist);
    wishlistButton.classList.toggle("saved", wishlistIndex === -1);
    wishlistButton.setAttribute("aria-pressed", String(wishlistIndex === -1));
    return;
  }
  if (!event.target.closest("button")) {
    displayProduct(card, "/product");
    return;
  }

  const toastMsg = "Cart updated successfully!";

  const actionButton = event.target.closest("button");
  if (actionButton.classList.contains("decrease-btn")) {
    if (cart.quantity === 1) {
      removeProductFromCart(cardId, carts);
      showAddToCartButton(quantityControlsBtn, addToCartBtn);
      runCartActionsConfirmation(toastMsg, carts, cartsCount);
    } else {
      decreaseCartQuantity(cardId, carts);
      card.querySelector(".quantity-display").textContent = cart.quantity;
      runCartActionsConfirmation(toastMsg, carts, cartsCount);
    }
    return;
  }

  if (actionButton.classList.contains("increase-btn")) {
    increaseCartQuantity(cardId, carts);
    card.querySelector(".quantity-display").textContent = cart.quantity;
    runCartActionsConfirmation(toastMsg, carts, cartsCount);
    return;
  }

  addProductToCart(card, carts);
  displayCartsCount(cartsCount, carts);
  ShowQuantityControlButtons(quantityControlsBtn, addToCartBtn);
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
