export function decreaseQuantity(cart, ele) {
  if (cart.quantity > 1) {
    cart.quantity -= 1;
    ele.textContent = cart.quantity;
  }
}

export function increaseQuantity(cart, ele) {
  cart.quantity += 1;
  ele.textContent = cart.quantity;
}
