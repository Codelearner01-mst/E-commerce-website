/**
 * components/render.js
 * Simple renderer: iterate `carts` and append `CartItem` elements.
 */
import { CartItem } from "./cartItem.js";
import { productHTML } from "./productItem.js";
import { cartsDisplayOnlyItem } from "./cartItem.js";
import { productCardHTML } from "../components/productCard.js";

const product = JSON.parse(sessionStorage.getItem("currentProduct"));

export function renderCarts(list, carts) {
  if (!list || !carts) {
    return;
  }

  for (const cart of carts) {
    const cartElement = CartItem(cart);
    list.appendChild(cartElement);
  }
}

export function renderProduct(containerEle) {
  if (typeof product !== "object" || product === null) {
    return;
  }
  const newSrc = product.image.replace("./src/images/", "");
  product.image = newSrc;
  containerEle.appendChild(productHTML(product));
}

export function renderCartsDisplayOnly(carts, list) {
  for (let i = 0; i < carts.length; i++) {
    const cart = carts[i];
    const number = i < 9 ? `0${i + 1}` : i + 1;
    const cartElement = cartsDisplayOnlyItem(cart, number);
    list.appendChild(cartElement);
  }
}

export function renderProducts(products, path, list, number = 4) {
  if (!products || !list || !Array.isArray(products)) {
    return;
  }
  for (let i = 0; i < number; i++) {
    const product = products[i];
    product.image = path + product.image;
    const productCard = productCardHTML(product);
    list.insertAdjacentHTML("beforeEnd", productCard);
  }
}
