import { loadCarts } from "../utils/saveUtils.js";
import {
  cartsCounter,
  displayCartsCount,
  toggleDropdownMenu,
} from "../utils/shared.js";

const cartCount = document.getElementById("cart-count");
const hamburgerButton = document.getElementById("hamburger-btn");
const dropDownMenu = document.getElementById("drop-menu");
const products = document.querySelector(".product-list");

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
  {
    id: 4,
    name: "Product 4",
    price: 29.99,
    image: "product4.jpg",
    quantity: 1,
  },
  {
    id: 5,
    name: "Product 5",
    price: 39.99,
    image: "product5.jpg",
    quantity: 1,
  },
  {
    id: 6,
    name: "Product 6",
    price: 49.99,
    image: "product6.jpg",
    quantity: 1,
  },
];

const carts = loadCarts();

const count = cartsCounter(carts);
displayCartsCount(cartCount, count);
toggleDropdownMenu(hamburgerButton, dropDownMenu);
