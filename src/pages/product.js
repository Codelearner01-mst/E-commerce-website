import { renderProduct } from "../components/render.js";
import { addProductToCartAndSetControlQuantity } from "../utils/cart-controller.js";
import { savedCarts } from "../utils/saveUtils.js";
import { setProductQuantityControl } from "../utils/shared.js";
import { displayCartsCount } from "../utils/shared.js";
import { getCartIndex } from "../utils/helper.js";
import { isProductInCart } from "../utils/helper.js";
import { hamburgerHTML } from "../components/loadComponents/header/hamburgerItem.js";
import { navigationHTML } from "../components/loadComponents/header/navigationItem.js";
import { cartCountHTML } from "../components/loadComponents/header/cartCountItem.js";

const headerBar = document.getElementById("header-bar");

headerBar.insertAdjacentHTML("beforeEnd", cartCountHTML());
headerBar.insertAdjacentHTML("beforeEnd", hamburgerHTML());
headerBar.insertAdjacentHTML("beforeEnd", navigationHTML());

const carts = savedCarts();

const productContainer = document.getElementById("product-container");
renderProduct(productContainer);

const addTocartBtn = document.getElementById("add-cart-btn");
const cartButton = document.getElementById("cart-btn");
const addToCartSuccessMessage = document.querySelector(".added-cart-success");
const cartsCount = document.getElementById("cart-count");
const currentProduct = JSON.parse(sessionStorage.getItem("currentProduct"));

cartButton.addEventListener("click", () => {
  window.location.href = "carts.html";
});

if (isProductInCart(currentProduct.id, carts)) {
  const index = getCartIndex(currentProduct.id, carts);
  const card = productContainer.querySelector(".product-card");
  setProductQuantityControl(
    card.querySelector(".quantity-control"),
    carts[index],
    carts,
    addToCartSuccessMessage,
    cartsCount,
  );
  card.querySelector(".quantity-control").style.backgroundColor = "white";
  card.querySelector(".quantity-control").style.border = "none";
}

addTocartBtn.addEventListener("click", () => {
  const card = addTocartBtn.closest(".product-card");
  addProductToCartAndSetControlQuantity(
    card,
    carts,
    addToCartSuccessMessage,
    cartsCount,
  );
  card.querySelector(".quantity-control").style.backgroundColor = "white";
  card.querySelector(".quantity-control").style.border = "none";
});

displayCartsCount(cartsCount, carts);
