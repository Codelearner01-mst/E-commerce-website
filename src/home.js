import { loadCarts, saveCarts } from "./saveUtils.js";
import { cartsCounter, displayCartsCount } from "./shared.js";
const cartsCountSpan = document.getElementById("cart-count");
const productCards = document.querySelectorAll(".product-card");
const cartButton = document.getElementById("cart-btn");
const savedCarts = loadCarts();

const products = [
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

let carts = [];

carts = savedCarts;

function goToNewPage() {
  window.location.href = "carts.html";
}

cartButton.addEventListener("click", goToNewPage);

function hasSameProductInCart(product) {
  for (const c of carts) {
    if (c.id === product.id) {
      return true;
    }
  }
}

const getCartIndex = (product) => {
  return carts.findIndex((c) => c.id === product.id);
};

function updateCartQuantity(product) {
  const index = getCartIndex(product);
  const cart = carts[index];
  cart.quantity += 1;
}

function productToAddToCart(id) {
  const product = products.find((product) => {
    const productId = product?.id;
    if (!productId) {
      return;
    }

    return productId === id;
  });
  return product;
}

productCards.forEach((card) => {
  const addToCartButton = card.querySelector("button");
  addToCartButton.addEventListener("click", () => {
    const productId = parseInt(card.id.split("-")[1], 10);
    if (productId === NaN) {
      return;
    }
    const product = productToAddToCart(productId);

    if (hasSameProductInCart(product)) {
      updateCartQuantity(product);
    } else {
      carts.push(product);
    }
    saveCarts(carts);
    const count = cartsCounter(carts);
    displayCartsCount(cartsCountSpan, count);
  });
});

function clearAllCarts() {
  for (const c of carts) {
    carts.pop(c);
    saveCarts(carts);
  }
}
//clearAllCarts();

function toggleDropdownMenu() {
  const hamburgerButton = document.getElementById("hamburger-btn");
  const DropdownMenu = document.getElementById("drop-menu");
  hamburgerButton.addEventListener("click", () => {
    DropdownMenu.classList.toggle("hidden");
  });
}
const count = cartsCounter(carts);
displayCartsCount(cartsCountSpan, count);
toggleDropdownMenu();
