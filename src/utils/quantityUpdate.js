/**
 * Decrease cart quantity by 1
 * @param {{id:number,name:string,price:number,image:string,quantity:number}} cart
 */
export function decreaseQuantity(cart) {
  if (cart.quantity > 1) {
    cart.quantity -= 1;
  }
}

/**
 * Increase cart quantity by 1
 * @param {{id:number,name:string,price:number,image:string,quantity:number}} cart
 */
export function increaseQuantity(cart) {
  cart.quantity += 1;
}
