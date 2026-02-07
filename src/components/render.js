import { CartItem } from "./cartItem.js";

export function renderCarts(list, carts, ele) {
  if (!list || !carts) {
    return;
  }

  for (const cart of carts) {
    const cartElement = CartItem(cart, carts, ele);
    list.appendChild(cartElement);
  }
}
