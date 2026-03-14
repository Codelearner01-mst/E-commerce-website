import { savedCarts } from "../utils/saveUtils.js";
import { displayCartsCount, toggleDropdownMenu } from "../utils/shared.js";
import { displayProduct } from "../utils/cart-controller.js";
import { addProductToCartAndSetControlQuantity } from "../utils/cart-controller.js";
import { setProductQuantityControl } from "../utils/shared.js";
import { getCartIndex } from "../utils/helper.js";
import { isProductInCart } from "../utils/helper.js";
import { hamburgerHTML } from "../components/loadComponents/header/hamburgerItem.js";
import { navigationHTML } from "../components/loadComponents/header/navigationItem.js";
import { cartCountHTML } from "../components/loadComponents/header/cartCountItem.js";
import { footerHTML } from "../components/loadComponents/footer/footerItem.js";
import { productsData } from "../utils/productsStore.js";
import { renderProducts } from "../components/render.js";

const headerBar = document.getElementById("header-bar");
const footer = document.getElementById("footer");

headerBar.insertAdjacentHTML("beforeEnd", cartCountHTML());
headerBar.insertAdjacentHTML("beforeEnd", hamburgerHTML());
headerBar.insertAdjacentHTML("beforeEnd", navigationHTML("#products"));

footer.innerHTML = footerHTML();

const cartCount = document.getElementById("cart-count");
const hamburgerButton = document.getElementById("hamburger-btn");
const cartButton = document.getElementById("cart-btn");
const dropDownMenu = document.getElementById("drop-menu");
const products = document.querySelector(".product-list");
const updateCartSuccessMessage = document.querySelector(".update-cart-success");
const productList = document.getElementById("product-list");

renderProducts(productsData, productList, productsData.length);

cartButton.addEventListener("click", () => {
  window.location.href = "carts.html";
});
const carts = savedCarts();

//Set quantity control for all products already in cart when page reloads
products.querySelectorAll(".product-card").forEach((card) => {
  const cardId = parseInt(card.id.split("-")[1], 10);
  if (isProductInCart(cardId, carts)) {
    const index = getCartIndex(cardId, carts);
    setProductQuantityControl(
      card.querySelector(".quantity-control"),
      carts[index],
      carts,
      updateCartSuccessMessage,
      cartCount,
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
    displayProduct(card, carts, "product.html");
  } else if (!isProductInCart(cardId, carts)) {
    addProductToCartAndSetControlQuantity(
      card,
      carts,
      updateCartSuccessMessage,
      cartCount,
    );
  }
});

displayCartsCount(cartCount, carts);
hamburgerButton.addEventListener("click", () => {
  toggleDropdownMenu(dropDownMenu);
});
