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

const hamburgerButton = document.getElementById("hamburger-btn");
const dropDownMenu = document.getElementById("drop-menu");

const resultContainer = document.getElementById("result-container");
const subtotalAmount = document.getElementById("subtotal-amount");
const totalAmount = document.getElementById("total-amount");
const checkoutButton = document.getElementById("checkout-btn");

renderCarts(cartList, carts, cartCountSpan);

const totalPriceElement = document.querySelectorAll(".total-price");

function calculateSubtotal() {
  let sum = 0;
  totalPriceElement.forEach((elem) => {
    const priceText = elem.textContent.replace("$", "");
    const price = parseFloat(priceText);
    console.log("Parsed price:", price);
    sum += price;
  });
  return `$${sum.toFixed()}`;
}
const result = calculateSubtotal();
subtotalAmount.textContent = result;
totalAmount.textContent = result;

if (!cartList) {
  console.error("Cart list element not found");
}

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
