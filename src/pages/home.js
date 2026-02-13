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
import { loadCarts, saveCarts } from "../utils/saveUtils.js";
import {
  cartsCounter,
  displayCartsCount,
  toggleDropdownMenu,
} from "../utils/shared.js";
import { ShowSucessMessage } from "../utils/shared.js";

const cartsCount = document.getElementById("cart-count");
const products = document.querySelector(".product-list");
const cartButton = document.getElementById("cart-btn");
const messageForm = document.getElementById("message-form");

const hamburgerButton = document.getElementById("hamburger-btn");
const dropDownMenu = document.getElementById("drop-menu");

const addToCartSuccessMessage = document.querySelector(".added-cart-success");

const productsData = [
  {
    id: 1,
    name: "Product 1",
    price: 29.99,
    image: "product1.jpg",
    quantity: 1,
  },
  {
    id: 2,
    name: "Product 2",
    price: 39.99,
    image: "product2.jpg",
    quantity: 1,
  },
  {
    id: 3,
    name: "Product 3",
    price: 49.99,
    image: "product3.jpg",
    quantity: 1,
  },
];

let carts = loadCarts();

function goToNewPage() {
  window.location.href = "carts.html";
}

cartButton.addEventListener("click", goToNewPage);

/**
 * Check whether a product (by id) already exists in `carts`.
 * Why: do not rely on object identity because `productsData` is recreated on page load.
 * @param {{id:number}} product - product to check
 * @returns {boolean}
 */
function hasSameProductInCart(product) {
  return carts.some((c) => c.id === product.id);
}

/**
 * Find the index of a cart item by product id.
 * @param {{id:number}} product
 * @returns {number} index in `carts` or -1
 */
const getCartIndex = (product) => {
  return carts.findIndex((c) => c.id === product.id);
};

/**
 * Increment quantity for the cart item matching `product.id`.
 * Side effects: mutates `carts` (in-memory) — caller must persist with `saveCarts`.
 * @param {{id:number}} product
 */
function updateCartQuantity(product) {
  const index = getCartIndex(product);
  const cart = carts[index];
  cart.quantity += 1;
}

/**
 * Return a product object from `productsData` by id.
 * @param {number} id
 * @returns {{id:number,name:string,price:number,quantity:number}|undefined}
 */
function productToAddToCart(id) {
  const product = productsData.find((product) => {
    const productId = product?.id;
    //Tackle undefined and not a Number id. e.g.(id: null id:"abc" id2: 1)
    if (!productId || productId === undefined || isNaN(productId)) {
      return;
    }

    return productId === id;
  });
  return product;
}

products.addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") {
    return;
  }
  const card = event.target.closest(".product-card");
  if (!card || card === null) {
    return;
  }
  const productId = parseInt(card.id.split("-")[1], 10);
  if (isNaN(productId)) {
    return;
  }
  const product = productToAddToCart(productId);
  if (product === undefined) {
    return;
  }

  if (hasSameProductInCart(product)) {
    updateCartQuantity(product);
  } else {
    carts.push(product);
  }
  saveCarts(carts);
  ShowSucessMessage(addToCartSuccessMessage, true);
  const count = cartsCounter(carts);
  displayCartsCount(cartsCount, count);
});

function clearAllCarts() {
  for (const c of carts) {
    carts.pop(c);
    saveCarts(carts);
  }
}

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Message sent succcessfully!");
  messageForm
    .querySelectorAll(".input-field")
    .forEach((Input) => (Input.value = ""));
});

toggleDropdownMenu(hamburgerButton, dropDownMenu);

const count = cartsCounter(carts);
displayCartsCount(cartsCount, count);
