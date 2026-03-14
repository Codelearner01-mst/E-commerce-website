/**
 * Decrease cart quantity by 1
 * @param {HTMLElement} ele - quantity display element
 * @param {{id:number,name:string,price:number,image:string,quantity:number}} cart
 */
export function decreaseQuantity(cart, ele) {
  if (cart.quantity > 1) {
    cart.quantity -= 1;
    ele.textContent = cart.quantity;
  }
}

/**
 * Increase cart quantity by 1
 * @param {HTMLElement} ele - quantity display element
 * @param {{id:number,name:string,price:number,image:string,quantity:number}} cart
 */
export function increaseQuantity(cart, ele) {
  cart.quantity += 1;
  ele.textContent = cart.quantity;
}
