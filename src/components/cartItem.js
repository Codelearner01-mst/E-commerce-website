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
import { saveCarts } from "../utils/saveUtils.js";
import { displayCartsCount } from "../utils/shared.js";
import { ShowSucessMessage } from "../utils/shared.js";
import { decreaseQuantity } from "../utils/quantityUpdate.js";
import { increaseQuantity } from "../utils/quantityUpdate.js";
import { calculateSubtotal } from "../utils/calculateTotal.js";

export function CartItem(cart, carts, countEle, msgEle, totalEle, subTotalEle) {
  //Cart holds a particular product in the carts array
  /**
   * Create a cart item element.
   * @param {{id:number,name:string,price:number,image:string,quantity:number}} cart
   * @param {Array} carts - the cart array (mutated by the component)
   * @param {HTMLElement} ele - element used to display cart count
   * @returns {HTMLElement}
   */
  const newSrc = cart.image.replace("./src/images/", "");

  const cartDiv = document.createElement("div");
  cartDiv.className = "flex flex-row border-b border-gray-200 pb-4";
  cartDiv.innerHTML = `
    <div class="flex gap-2.5 flex-col ml-3.5 mr-9">
      <div class="w-20 h-20">
        <img src="${newSrc}" alt="${cart.name}" class="object-cover h-full w-full" />
      </div>
      <p class="">${cart.name}</p>
      <p class="text-lg font-medium">$${cart.price}</p>
    </div>
    <div class="flex items-center gap-6.5">
     <div class="flex gap-6">
        <button class="text-gray-400 decrease-btn">&#10094;</button>
        <span class="quantity-display">${cart.quantity}</span>
        <button class="text-gray-400 increase-btn">&#10095;</button>
    </div>
      <div>
        <p id="total-price" class="text-lg font-medium total-price">$${cart.price * cart.quantity}</p>
      </div>
      <button class="bg-gray-100 rounded-full p-1.5 delete-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  `;

  if (!msgEle || !countEle) {
    return;
  }

  const decreaseBtn = cartDiv.querySelector(".decrease-btn");
  const increaseBtn = cartDiv.querySelector(".increase-btn");
  const deleteBtn = cartDiv.querySelector(".delete-btn");
  const quantityDisplay = cartDiv.querySelector(".quantity-display");
  const totalPrice = cartDiv.querySelector(".total-price");

  decreaseBtn.addEventListener("click", () => {
    decreaseQuantity(cart, quantityDisplay);
    totalPrice.textContent = `$${cart.price * cart.quantity.toFixed(2)}`;
    const result = calculateSubtotal(carts);
    totalEle.textContent = result;
    subTotalEle.textContent = result;
    displayCartsCount(countEle, carts);
    ShowSucessMessage(msgEle, "Cart updated successfully!");
    saveCarts(carts);
  });

  increaseBtn.addEventListener("click", () => {
    increaseQuantity(cart, quantityDisplay);
    totalPrice.textContent = `$${cart.price * cart.quantity}`;
    const result = calculateSubtotal(carts);
    totalEle.textContent = result;
    subTotalEle.textContent = result;
    displayCartsCount(countEle, carts);
    ShowSucessMessage(msgEle, "Cart updated successfully!");
    saveCarts(carts);
  });

  deleteBtn.addEventListener("click", () => {
    cartDiv.remove();
    const index = carts.findIndex((c) => c.id === cart.id);
    if (index > -1) {
      carts.splice(index, 1);
      const result = calculateSubtotal(carts);
      totalEle.textContent = result;
      subTotalEle.textContent = result;
      displayCartsCount(countEle, carts);
      ShowSucessMessage(msgEle, `${cart.name} remove from cart!`);
      saveCarts(carts);
    }
  });

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
