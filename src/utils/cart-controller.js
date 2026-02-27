import { displayCartsCount } from "../utils/shared.js";
import { ShowSucessMessage } from "../utils/shared.js";
import { saveCarts } from "./saveUtils.js";
import { productsData } from "../utils/productsStore.js";
//import { productHTML } from "../components/productItem";

/**
 * Check whether a product (by id) already exists in `carts`.
 * Why: do not rely on object identity because `productsData` is recreated on page load.
 * @param {{id:number}} product - product to check
 * @returns {boolean}
 */
function hasSameProductInCart(product, carts) {
  return carts.some((c) => c.id === product.id);
}

/**
 * Find the index of a cart item by product id.
 * @param {{id:number}} product
 * @returns {number} index in `carts` or -1
 */
const getCartIndex = (product, carts) => {
  return carts.findIndex((c) => c.id === product.id);
};

/**
 * Increment quantity for the cart item matching `product.id`.
 * Side effects: mutates `carts` (in-memory) — caller must persist with `saveCarts`.
 * @param {{id:number}} product
 */
function updateCartQuantity(product, carts) {
  const index = getCartIndex(product, carts);
  const cart = carts[index];
  cart.quantity += 1;
}

/**
 * Return a product object from `productsData` by id.
 * @param {number} id
 * @returns {{id:number,name:string,price:number,quantity:number}|undefined}
 */
function productToAddToCartOrDisplay(id) {
  const product = productsData.find((product) => {
    const productId = product?.id;
    //Tackle undefined and not a Number id. e.g.(id: null id:"abc" id2: 1)
    if (
      !productId ||
      typeof productId !== "number" ||
      Number.isNaN(productId)
    ) {
      return undefined;
    }

    return productId === id;
  });
  return product;
}

export function addToCartOrDisplayProduct(products, carts, msgEle, countEle) {
  if (!products || !carts || !msgEle || !countEle) {
    return;
  }
  products.addEventListener("click", (event) => {
    const card = event.target.closest(".product-card");
    if (!card || card === null) {
      return;
    }

    const productId = parseInt(card.id.split("-")[1], 10);
    if (isNaN(productId)) {
      return;
    }

    const product = productToAddToCartOrDisplay(productId);
    if (product === undefined) {
      return;
    }
    if (event.target.tagName !== "BUTTON") {
      sessionStorage.setItem("currentProduct", JSON.stringify(product));
      window.location.href = "product.html";
      return;
    }

    carts.push(product);
    card.querySelector(".quantity-control").innerHTML =
      ` <div class="flex gap-6">
        <button class="text-gray-400 decrease-btn">&#10094;</button>
        <span class="quantity-display">1</span>
        <button class="text-gray-400 increase-btn">&#10095;</button>
      </div>`;
    saveCarts(carts);
    ShowSucessMessage(msgEle, true);
    displayCartsCount(countEle, carts);
  });
}
