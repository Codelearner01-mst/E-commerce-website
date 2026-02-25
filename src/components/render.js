/**
 * components/render.js
 * Simple renderer: iterate `carts` and append `CartItem` elements.
 */
import { CartItem } from "./cartItem.js";
import { productHTML } from "./productItem.js";

const product = JSON.parse(sessionStorage.getItem("currentProduct"));

export function renderCarts(list, carts, countEle, msgEle) {
  if (!list || !carts) {
    return;
  }

  for (const cart of carts) {
    const cartElement = CartItem(cart, carts, countEle, msgEle);
    list.appendChild(cartElement);
  }
}

export function renderProduct(containerEle) {
  //const product
  if (typeof product !== "object" || product === null) {
    return;
  }
  containerEle.appendChild(productHTML(product));
}
