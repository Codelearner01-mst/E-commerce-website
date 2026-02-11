/**
 * components/render.js
 * Simple renderer: iterate `carts` and append `CartItem` elements.
 */
import { CartItem } from "./cartItem.js";

export function renderCarts(list, carts, countEle, msgEle) {
  if (!list || !carts) {
    return;
  }

  for (const cart of carts) {
    const cartElement = CartItem(cart, carts, countEle, msgEle);
    list.appendChild(cartElement);
  }
}
