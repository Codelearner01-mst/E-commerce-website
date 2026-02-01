function cartHTML(productName, price, quantity, imageUrl) {
  const cartDiv = document.createElement("div");
  cartDiv.className = "flex flex-row";
  cartDiv.innerHTML = `
              <div class="flex gap-2.5 flex-col ml-3.5 mr-9">
                <div class="w-20 h-20">
                  <img src="${imageUrl}" alt="${productName}" class="object-cover h-full w-full" />
                </div>
                <p class="">${productName}</p>
                <p class="text-lg font-medium">$${price}</p>
              </div>
              <div class="flex items-center gap-6.5">
              <div class="flex gap-6">
                <button class="text-gray-400">&#10094;</button>
                <span id="quantity">${quantity}</span>
                <button class="text-gray-400">&#10095;</button>
              </div>
              <div
              <p class="text-lg font-medium">$${price * quantity}</p>
              </div>
            <button class="bg-gray-100 rounded-full p-1.5"
            >
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
  return cartDiv;
}

export function renderCarts(list, carts) {
  if (!list || !carts) {
    return;
  }

  for (const cart of carts) {
    const HTML = cartHTML(cart.name, cart.price, cart.quantity, cart.image);
    list.appendChild(HTML);
  }
}
