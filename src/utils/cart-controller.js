import { displayCartsCount } from "../utils/shared.js";
import { ShowSucessMessage } from "../utils/shared.js";
import { saveCarts } from "./saveUtils.js";
import { productsData } from "../utils/productsStore.js";
import { setProductQuantityControl } from "../utils/shared.js";
//import { productHTML } from "../components/productItem";

/**
 * Check whether a product (by id) already exists in `carts`.
 * Why: do not rely on object identity because `productsData` is recreated on page load.
 * @param {{id:number}} product - product to check
 * @returns {boolean}
 */
function isProductInCart(product, carts) {
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

export function displayProduct(card, carts, href) {
  if (!carts || !Array.isArray(carts)) {
    return;
  }
  const productId = parseInt(card.id.split("-")[1], 10);
  const product = productToAddToCartOrDisplay(productId);
  sessionStorage.setItem("currentProduct", JSON.stringify(product));
  window.location.href = href;
  return;
}

export function addToCartOrControlQuantity(card, carts, msgEle, countEle) {
  if (!carts || !msgEle || !countEle) {
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

  if (!isProductInCart(product, carts)) {
    carts.push(product);
    const index = getCartIndex(product, carts);
    const cart = carts[index];
    setProductQuantityControl(
      card.querySelector(".quantity-control"),
      cart,
      carts,
      msgEle,
      countEle,
    );
  }
  saveCarts(carts);
  ShowSucessMessage(msgEle, true);
  displayCartsCount(countEle, carts);
}
