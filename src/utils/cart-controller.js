import { displayCartsCount } from "../utils/shared.js";
import { ShowSucessMessage } from "../utils/shared.js";
import { saveCarts } from "./saveUtils.js";
import { productsData } from "../utils/productsStore.js";
import { getCartIndex } from "../utils/helper.js";
import { increaseQuantity } from "./quantityUpdate.js";
import { decreaseQuantity } from "./quantityUpdate.js";
import { quantityControlItem } from "../components/quantityControlItem.js";

/**
 * Return a product object from `productsData` by id.
 * @param {number} id
 * @returns {{id:number,name:string,price:number,quantity:number}|undefined}
 */
function productToAddToCartOrDisplay(id) {
  const product = productsData.find((product) => {
    const productId = product?.id;
    //Tackle undefined and NaN. e.g.(id: null id:"abc" id2: 1)
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

//Locate to the product page
export function displayProduct(card, carts, href) {
  if (!carts || !Array.isArray(carts)) {
    return;
  }
  const productId = parseInt(card.id.split("-")[1], 10);
  const product = productToAddToCartOrDisplay(productId);
  sessionStorage.setItem("currentProduct", JSON.stringify(product)); //Store the product object temporilary to display it in the product page
  window.location.href = href;
}

export const increaseCartQuantity = (id, carts) => {
  if (!Array.isArray(carts)) {
    return;
  }
  const index = getCartIndex(id, carts);
  const cart = carts[index];
  increaseQuantity(cart);
  saveCarts(carts);
};

export const decreaseCartQuantity = (id, carts) => {
  if (!Array.isArray(carts)) {
    return;
  }
  const index = getCartIndex(id, carts);
  const cart = carts[index];
  decreaseQuantity(cart);
  saveCarts(carts);
};

export function addProductToCart(card, carts, msgEle) {
  if (!carts || !msgEle) {
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
  carts.push(product);
  ShowSucessMessage(msgEle, `${product.name} added to cart successfully!`);
  saveCarts(carts);
}
