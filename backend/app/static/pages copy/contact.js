import { hamburgerHTML } from "../components/loadComponents/header/hamburgerItem.js";
import { navigationHTML } from "../components/loadComponents/header/navigationItem.js";
import { cartCountHTML } from "../components/loadComponents/header/cartCountItem.js";
import { displayCartsCount, toggleDropdownMenu } from "../utils/shared.js";
import { savedCarts } from "../utils/saveUtils.js";

const headerBar = document.getElementById("header-bar");

headerBar.insertAdjacentHTML("beforeEnd", cartCountHTML());
headerBar.insertAdjacentHTML("beforeEnd", hamburgerHTML());
headerBar.insertAdjacentHTML(
  "beforeEnd",
  navigationHTML(),
);


const cartCount = document.getElementById("cart-count");
const hamburgerButton = document.getElementById("hamburger-btn");
const dropDownMenu = document.getElementById("drop-menu");
const cartButton = document.getElementById("cart-btn");

cartButton.addEventListener("click", () => {
  window.location.href = "/cart";
});

const carts = savedCarts();

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    this.style.display = "none";
    document.getElementById("form-success").classList.add("visible");
  });

displayCartsCount(cartCount, carts);
hamburgerButton.addEventListener("click", () => {
  toggleDropdownMenu(dropDownMenu);
});
