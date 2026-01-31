import { saveCarts } from "./saveUtils.js";
const cartsCount = document.getElementById("cart-count");
const productCards = document.querySelectorAll(".product-card");
const cartButton = document.getElementById("cart-btn");

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

const carts = [];

const counterObj = {
  count: 0,
};

function goToNewPage() {
  window.location.href = "carts.html";
}

cartButton.addEventListener("click", goToNewPage);

const counterHelper = () => {
  let count = counterObj.count;
  counterObj.count = ++count;
  return count;
};

const displayCartCount = () => {
  const count = counterHelper();
  cartsCount.textContent = count;
};

function getAddedProduct(id) {
  const addedProduct = products.find((product) => {
    const productid = product?.id;
    if (!productid) {
      return false;
    }

    return productid === id;
  });
  return addedProduct;
}

productCards.forEach((card) => {
  const addToCartButton = card.querySelector("button");
  addToCartButton.addEventListener("click", () => {
    const productId = parseInt(card.id.split("-")[1], 10);
    displayCartCount();
    const addedCart = getAddedProduct(productId);
    carts.push(addedCart);
    saveCarts(carts);
  });
});

function toggleDropdownMenu() {
  const hamburgerButton = document.getElementById("hamburger-btn");
  const DropdownMenu = document.getElementById("drop-menu");
  hamburgerButton.addEventListener("click", () => {
    DropdownMenu.classList.toggle("hidden");
  });
}
toggleDropdownMenu();
