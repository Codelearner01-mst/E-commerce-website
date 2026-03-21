/**
 * components/cartItem.js
 * Cart item renderer and controls.
 *
 * Exports a factory function `CartItem(cart, carts, ele)` that returns a DOM
 * element representing a cart row. The returned element wires up event
 * handlers that modify `carts` in-place and persist changes via `saveCarts`.
 *
 * Expected `cart` shape:
 * { id: number, name: string, price: number, image: string, quantity: number }
 */

export function CartItem(cart, path) {
  //Cart holds a particular product in the carts array
  /**
   * Create a cart item element.
   * @param {{id:number,name:string,price:number,image:string,quantity:number}} cart
   * @param {Array} carts - the cart array (mutated by the component)
   * @param {HTMLElement} ele - element used to display cart count
   * @returns {HTMLElement}
   */
  const newSrc = cart.image.replace("./src/images/", path);

  const cartDiv = document.createElement("div");
  cartDiv.className = "cart-card flex flex-row border-b border-gray-200 pb-4";
  cartDiv.id = `product-${cart.id}`;
  cartDiv.innerHTML = `
    <div class="flex gap-2.5 flex-col ml-3.5 mr-9">
      <div class="w-20 h-20">
        <img src="${newSrc}" alt="${cart.name}" class="object-cover h-full w-full" />
      </div>
      <p class="">${cart.name}</p>
      <p class="text-lg font-medium">$${cart.price}</p>
    </div>
    <div class="flex items-center gap-6.5">
      <div class="flex items-center bg-white border border-yellow-700 rounded-sm w-max h-9 overflow-hidden shadow-sm">
        <button class="decrease-btn w-9 h-full flex items-center justify-center text-yellow-800 bg-transparent hover:bg-yellow-800 hover:text-white transition-colors duration-300 text-xl font-light focus:outline-none cursor-pointer">&#8722;</button>
        <span class="quantity-display flex-1 px-4 font-serif text-gray-900 text-base min-w-[3rem] text-center select-none border-x border-yellow-700/30 h-full flex items-center justify-center">${cart.quantity}</span>
        <button class="increase-btn w-9 h-full flex items-center justify-center text-yellow-800 bg-transparent hover:bg-yellow-800 hover:text-white transition-colors duration-300 text-xl font-light focus:outline-none cursor-pointer">&#43;</button>
      </div>
      <div>
        <p id="total-price" class="text-lg font-medium total-price">$${cart.price * cart.quantity}</p>
      </div>
      <button class="delete-btn flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-red-700 transition-colors duration-300 uppercase tracking-widest focus:outline-none ml-2">
        <i class="fa-regular fa-trash-can text-lg"></i>
        <span class="hidden sm:inline">Remove</span>
      </button>
    </div>
  `;

  return cartDiv;
}

export function cartsDisplayOnlyItem(cart, numbering) {
  if (typeof cart !== "object" && Array.isArray(cart) && cart === null) {
    return;
  }
  const cartDiv = document.createElement("div");
  cartDiv.className = "flex flex-row justify-between font-light";
  cartDiv.innerHTML = `<p><span>${numbering}</span>. ${cart.name}</p>
                <p>$${cart.price}</p>`;
  return cartDiv;
}
