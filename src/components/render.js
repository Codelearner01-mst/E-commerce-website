/**
 * components/render.js
 * Simple renderer: iterate `carts` and append `CartItem` elements.
 */
import { CartItem } from "./cartItem.js";
import { productHTML } from "./productItem.js";
import { cartsDisplayOnlyItem } from "./cartItem.js";
import { productCardHTML } from "../components/productCard.js";

const product = JSON.parse(sessionStorage.getItem("currentProduct"));

export function renderCarts(
  list,
  carts,
  countEle,
  msgEle,
  totalEle,
  subTotalEle,
) {
  if (!list || !carts) {
    return;
  }

  for (const cart of carts) {
    const cartElement = CartItem(
      cart,
      carts,
      countEle,
      msgEle,
      totalEle,
      subTotalEle,
    );
    list.appendChild(cartElement);
  }
}

export function renderProduct(containerEle) {
  if (typeof product !== "object" || product === null) {
    return;
  }
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

export function renderProducts(products, list, number = 4, page) {
  if (!products || !list || !Array.isArray(products)) {
    return;
  }
  for (let i = 0; i < number; i++) {
    const product = products[i];
    if (page === "index.html") {
      product.image = "./src/images/" + product.image;
    }

    const productCard = productCardHTML(product);
    list.insertAdjacentHTML("beforeEnd", productCard);
  }
}
