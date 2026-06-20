export function wishlistItemHTML(product, path = "../images/", isInCart = false) {
  // Safe image path resolution
  const filename = product.image
    .replace("./src/images/", "")
    .replace("../images/", "")
    .replace("src/images/", "");
  const fullSrc = path + filename;

  const btnText = isInCart ? "Remove from Cart" : "Add to Cart";
  const btnClass = isInCart
    ? "add-cart-btn btn-secondary text-xs tracking-wider px-5 py-2.5 bg-gray-100 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
    : "add-cart-btn btn-primary text-xs tracking-wider px-5 py-2.5";

  return `
    <div class="wishlist-card flex flex-col sm:flex-row items-center justify-between border-b border-gray-100 py-6 gap-4" id="product-${product.id}">
      <div class="flex items-center gap-4 flex-col sm:flex-row w-full sm:w-auto">
        <div class="w-24 h-24 overflow-hidden rounded-md bg-gray-50 flex-shrink-0 cursor-pointer img-click">
          <img
            src="${fullSrc}"
            alt="${product.name}"
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div class="text-center sm:text-left">
          <span class="text-[9px] uppercase tracking-[0.2em] text-amber-700/70 font-sans font-medium block">Vision Jewelry</span>
          <h3 class="text-base font-serif font-medium text-gray-900 tracking-wide cursor-pointer hover:text-amber-800 transition-colors duration-300 title-click">${product.name}</h3>
          <p class="font-sans font-semibold text-sm text-gray-900 mt-1">$${product.price}</p>
        </div>
      </div>
      <div class="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
        <button class="${btnClass}">
          ${btnText}
        </button>
        <button class="remove-wishlist-btn border border-gray-200 hover:border-red-400 hover:text-red-500 text-gray-400 p-2.5 rounded-full transition-colors duration-300" aria-label="Remove from wishlist">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  `;
}
