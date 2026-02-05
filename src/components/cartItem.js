import { saveCarts } from "../utils/saveUtils.js";

export function CartItem(cart, carts) {
  const cartDiv = document.createElement("div");
  cartDiv.className = "flex flex-row";
  cartDiv.innerHTML = `
    <div class="flex gap-2.5 flex-col ml-3.5 mr-9">
      <div class="w-20 h-20">
        <img src="${cart.image}" alt="${cart.name}" class="object-cover h-full w-full" />
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
        <p class="text-lg font-medium total-price">$${cart.price * cart.quantity}</p>
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

  const decreaseBtn = cartDiv.querySelector(".decrease-btn");
  const increaseBtn = cartDiv.querySelector(".increase-btn");
  const deleteBtn = cartDiv.querySelector(".delete-btn");
  const quantityDisplay = cartDiv.querySelector(".quantity-display");
  const totalPrice = cartDiv.querySelector(".total-price");

  decreaseBtn.addEventListener("click", () => {
    if (cart.quantity > 1) {
      cart.quantity -= 1;
      quantityDisplay.textContent = cart.quantity;
      totalPrice.textContent = `$${cart.price * cart.quantity}`;
      saveCarts(carts);
    }
  });

  increaseBtn.addEventListener("click", () => {
    cart.quantity += 1;
    quantityDisplay.textContent = cart.quantity;
    totalPrice.textContent = `$${cart.price * cart.quantity}`;
    saveCarts(carts);
  });

  deleteBtn.addEventListener("click", () => {
    cartDiv.remove();
    const index = carts.findIndex(c => c.id === cart.id);
    if (index > -1) {
      carts.splice(index, 1);
      saveCarts(carts);
    }
  });

  return cartDiv;
}
