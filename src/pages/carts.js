import { renderCarts } from "../components/render.js";
import { loadCarts } from "../utils/saveUtils.js";
import {
  cartsCounter,
  displayCartsCount,
  toggleDropdownMenu,
} from "../utils/shared.js";

const carts = loadCarts();

const cartCountSpan = document.getElementById("cart-count");
const cartList = document.getElementById("carts-list");
const emptyCartMessage = document.getElementById("empty-cart-message");
const updateCartSuccessMessage = document.querySelector(".update-cart-success");

const hamburgerButton = document.getElementById("hamburger-btn");
const dropDownMenu = document.getElementById("drop-menu");

const resultContainer = document.getElementById("result-container");
const subtotalAmount = document.getElementById("subtotal-amount");
const totalAmount = document.getElementById("total-amount");
const checkoutButton = document.getElementById("checkout-btn");

renderCarts(cartList, carts, cartCountSpan, updateCartSuccessMessage);

const totalPriceElement = document.querySelectorAll(".total-price"); //Get the total amount of each product in cart

function calculateSubtotal() {
  let sum = 0;
  totalPriceElement.forEach((ele) => {
    const priceText = ele.textContent.replace("$", ""); //Replace "$" with empty space to avoid NaN error on strings like $23,$30 when turning it to a float number
    const price = parseFloat(priceText);
    sum += price;
  });
  return `$${sum.toFixed(2)}`;
}
const result = calculateSubtotal();
subtotalAmount.textContent = result;
totalAmount.textContent = result;

if (carts.length === 0) {
  emptyCartMessage.classList.remove("hidden");
  resultContainer.classList.add("hidden");
} else {
  emptyCartMessage.classList.add("hidden");
  resultContainer.classList.remove("hidden");
}

const count = cartsCounter(carts);
displayCartsCount(cartCountSpan, count);

toggleDropdownMenu(hamburgerButton, dropDownMenu);
