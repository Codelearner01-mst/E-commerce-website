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
  // Strip any existing prefix so we always work with a raw filename,
  // then prepend the correct path for this page.
  const filename = cart.image
    .replace("./src/images/", "")
    .replace("../images/", "")
    .replace("src/images/", "");
  const newSrc = path + filename;

  const cartDiv = document.createElement("div");
  cartDiv.className =
    "cart-card flex flex-row border-b border-gray-200 pb-4 bg-gray-50 py-3";
  cartDiv.id = `product-${cart.id}`;
  cartDiv.innerHTML = `
   
      <div class="w-40">
        <img src="${newSrc}" alt="${cart.name}" class="object-cover h-full w-full" />
               <button
                    class="wishlist-btn p-1.5 rounded-full hover:bg-[#f7f0e8] hover:text-[#b65b52] transition-colors"
                    aria-label="Add to wishlist"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 21s-7-4.35-9-6.36C1.37 12.91 2 9.5 5 7.5 7.28 6 9.5 7 12 9c2.5-2 4.72-3 7-1.5 3 2 3.63 5.41 2 7.14C19 16.65 12 21 12 21z"
                      />
                    </svg>
                  </button>
      </div>
      <div class="flex flex-row justify-between flex-1 gap-2">
    <div class="flex gap-2.5 flex-col ml-3.5 mr-9">
      <p class="">${cart.name}</p>
      <p class="text-lg font-medium">$${cart.price}</p>
       <div class="flex items-center rounded-sm w-max h-9 overflow-hidden cart-btns-box">
        <button class="decrease-btn w-5 h-full flex items-center justify-center bg-yellow-700  text-white  hover:bg-yellow-600 hover:text-white transition-colors duration-300 text-sm font-light focus:outline-none cursor-pointer">&#8722;</button>
        <span class="quantity-display flex-1 font-serif text-gray-900 text-base min-w-[3rem] text-center select-none border-x border-yellow-700/30 h-full flex items-center justify-center">${cart.quantity}</span>
        <button class="increase-btn w-5 h-full flex items-center justify-center bg-yellow-700 text-white hover:bg-yellow-600 hover:text-white transition-colors duration-300 text-sm font-light focus:outline-none cursor-pointer">&#43;</button>
      </div>
    </div>
    <div class="flex flex-col items-center justify-between mr-3">
      <button class="delete-btn flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-red-700 transition-colors duration-300 uppercase tracking-widest focus:outline-none ml-2">
        <i class="fa-solid fa-times  text-lg"></i>
      </button>
      <div>
        <p id="total-price" class="text-lg font-medium total-price">$${cart.price * cart.quantity}</p>
      </div>
    
    </div>
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
