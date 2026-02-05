import { CartItem } from "./cartItem.js";

export function renderCarts(list, carts) {
  if (!list || !carts) {
    return;
  }

  for (const cart of carts) {
    const cartElement = CartItem(cart, carts);
    list.appendChild(cartElement);
  }
}
