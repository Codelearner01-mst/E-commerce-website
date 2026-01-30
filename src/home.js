import { saveCarts } from "./saveUtils.js";
const cartsCount = document.getElementById("cart-count");
const productCards = document.querySelectorAll(".product-card");

const products = [
  {
    id: 1,
    name: "Product 1",
    price: 29.99,
    image: "product1.jpg",
  },
  {
    id: 2,
    name: "Product 2",
    price: 39.99,
    image: "product2.jpg",
  },
  {
    id: 3,
    name: "Product 3",
    price: 49.99,
    image: "product3.jpg",
  },
];

const carts = [];

const counterObj = {
  count: 0,
};

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

function CartHTML(productName, price, quantity, imageUrl) {
  return `<div class="cart-info">
              <div class="produt-info">
                <div class="product-image-container">
                  <img src="${imageUrl}" alt="${productName}" class="" />
                </div>
                <div class="product-details">
                <p class="">${productName}</p>
                <p class="">$${price}</p>
                </div>
              </div>
              <div class="product-quantity">
                <button role="" class="prev">&#10094;</button>
                <span>1</span>
                <button class="next">&#10095;</button>
              </div>
              <p class="total-price">${price * quantity}</p>
            </div>`;
}

function toggleDropdownMenu() {
  const hambergerButton = document.getElementById("hamburger-btn");
  const DropdownMenu = document.getElementById("drop-menu");
  hambergerButton.addEventListener("click", () => {
    DropdownMenu.classList.toggle("hidden");
  });
}
toggleDropdownMenu();
