const cartsCount = document.getElementById("cart-count");
const addToCartButton = document.querySelectorAll(".add-cart-btn");

const counterObj = {
  count: 0,
};

const counterHelper = () => {
  let count = counterObj?.count;
  counterObj.count = ++count;
  return count;
};

const displayCartCount = () => {
  const count = counterHelper();
  cartsCount.textContent = count;
};

addToCartButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log("Button clicked");
    displayCartCount();
  });
});

function toggleDropdownMenu() {
  const hambergerButton = document.getElementById("hamburger-btn");
  const DropdownMenu = document.getElementById("drop-menu");
  hambergerButton.addEventListener("click", () => {
    DropdownMenu.classList.toggle("hidden");
  });
}
toggleDropdownMenu();
