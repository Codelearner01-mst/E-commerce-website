import { toggleDropdownMenu } from "../utils/shared.js";

const checkoutForm = document.getElementById("checkout-form");
const email = document.getElementById("email");
const hamburgerButton = document.getElementById("hamburger-btn");
const dropDownMenu = document.getElementById("drop-menu");
checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Your checkout form is submitted successfully");
});

hamburgerButton.addEventListener("click", () => {
  toggleDropdownMenu(dropDownMenu);
});
