import { renderProduct } from "../components/render.js";
import { addToCartOrControlQuantity } from "../utils/cart-controller.js";
import { loadCarts } from "../utils/saveUtils.js";
import { setProductQuantityControl } from "../utils/shared.js";
import { displayCartsCount } from "../utils/shared.js";
import { getCartIndex } from "../utils/helper.js";
import { isProductInCart } from "../utils/helper.js";

const carts = loadCarts();

const productContainer = document.getElementById("product-container");
renderProduct(productContainer);

const addTocartBtn = document.getElementById("add-cart-btn");
const addToCartSuccessMessage = document.querySelector(".added-cart-success");
const cartsCount = document.getElementById("cart-count");
const currentProduct = JSON.parse(sessionStorage.getItem("currentProduct"));

if (isProductInCart(currentProduct, carts)) {
  const index = getCartIndex(currentProduct, carts);
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
  addToCartOrControlQuantity(card, carts, addToCartSuccessMessage, cartsCount);
  card.querySelector(".quantity-control").style.backgroundColor = "white";
  card.querySelector(".quantity-control").style.border = "none";
});

displayCartsCount(cartsCount, carts);
