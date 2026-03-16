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
import { toggleDropdownMenu } from "../utils/shared.js";
import { savedCarts } from "../utils/saveUtils.js";
import { displayCartsCount } from "../utils/shared.js";
import { displayProduct } from "../utils/cart-controller.js";
import { addProductToCartAndSetControlQuantity } from "../utils/cart-controller.js";
import { setProductQuantityControl } from "../utils/shared.js";
import { getCartIndex } from "../utils/helper.js";
import { isProductInCart } from "../utils/helper.js";
import { productsData } from "../utils/productsStore.js";
import { hamburgerHTML } from "../components/loadComponents/header/hamburgerItem.js";
import { navigationHTML } from "../components/loadComponents/header/navigationItem.js";
import { cartCountHTML } from "../components/loadComponents/header/cartCountItem.js";
import { footerHTML } from "../components/loadComponents/footer/footerItem.js";
import { renderProducts } from "../components/render.js";

const headerBar = document.getElementById("header-bar");
const footer = document.getElementById("footer");

headerBar.insertAdjacentHTML("beforeEnd", cartCountHTML());
headerBar.insertAdjacentHTML("beforeEnd", hamburgerHTML());
headerBar.insertAdjacentHTML(
  "beforeEnd",
  navigationHTML("./src/pages/shop.html"),
);

footer.innerHTML = footerHTML();

const cartsCount = document.getElementById("cart-count");
const products = document.querySelector(".product-list");
const cartButton = document.getElementById("cart-btn");
const messageForm = document.getElementById("message-form");

const hamburgerButton = document.getElementById("hamburger-btn");
const dropDownMenu = document.getElementById("drop-menu");
const productList = document.getElementById("product-list");

const imagePath = "./src/images/";

renderProducts(productsData, imagePath, productList);

const addToCartSuccessMessage = document.querySelector(".added-cart-success");

const carts = savedCarts();

function goToNewPage() {
  window.location.href = "src/pages/carts.html";
}

cartButton.addEventListener("click", goToNewPage);

//Set quantity control for all products already in cart when page reloads
products.querySelectorAll(".product-card").forEach((card) => {
  const cardId = parseInt(card.id.split("-")[1], 10);
  if (isProductInCart(cardId, carts)) {
    const index = getCartIndex(cardId, carts);
    setProductQuantityControl(
      card.querySelector(".quantity-control"),
      carts[index],
      carts,
      addToCartSuccessMessage,
      cartsCount,
    );
  }
});

products.addEventListener("click", (event) => {
  const card = event.target.closest(".product-card");
  const cardId = parseInt(card.id.split("-")[1], 10);
  if (!card || card === null) {
    return;
  }
  if (event.target.tagName !== "BUTTON") {
    displayProduct(card, carts, "src/pages/product.html");
  } else if (!isProductInCart(cardId, carts)) {
    addProductToCartAndSetControlQuantity(
      card,
      carts,
      addToCartSuccessMessage,
      cartsCount,
    );
  }
});

function submitMessage() {
  if (messageForm === null) {
    return;
  }
  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message sent succcessfully!");
    messageForm
      .querySelectorAll(".input-field")
      .forEach((Input) => (Input.value = ""));
  });
}
submitMessage();

hamburgerButton.addEventListener("click", () => {
  toggleDropdownMenu(dropDownMenu);
});

displayCartsCount(cartsCount, carts);
