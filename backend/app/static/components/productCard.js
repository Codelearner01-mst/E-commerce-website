import { escapeHtml } from "../utils/product-format.js";

export function productCardHTML(product) {
  const name = escapeHtml(product.name);
  const image = escapeHtml(product.image);
  const price = Number(product.price).toFixed(2);
  return `
  <div class="product-card bg-white overflow-hidden" id="product-${product.id}"
       data-product-id="${product.id}" data-product-name="${name}"
       data-product-price="${price}" data-product-image="${image}">
    <div class="product-image-container overflow-hidden">
      <img
        src="${image}"
        alt="${name}"
        class="product-image w-full h-[230px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
      />
    </div>
    <div class="product-info p-4 px-6">
          <h3 class="product-title font-medium">${name}</h3>
      <div class="flex items-center flex-col gap-2 mt-2">
        <div class="price-row flex items-center gap-2">
           <span class="old-price line-through text-gray-500">$20</span> <span class="product-price font-semibold">$${price}</span>
        </div>
          <div class="flex gap-2">
            <button class="add-cart-btn btn-primary px-4 py-2 font-medium">
              Add to Cart
            </button>
            <div class="quantity-control-btns hidden items-center bg-white border border-yellow-700  w-max h-9 overflow-hidden shadow-sm">
              <button class="decrease-btn w-9 h-full flex items-center justify-center text-yellow-800 bg-transparent hover:bg-yellow-700 hover:text-white transition-colors duration-300 text-xl font-light focus:outline-none cursor-pointer">&#8722;</button>
              <span class="quantity-display flex-1 px-4 font-serif text-gray-900 text-base min-w-[3rem] text-center select-none border-x border-yellow-100 h-full flex items-center justify-center">1</span>
              <button class="increase-btn w-9 h-full flex items-center justify-center text-yellow-800 bg-transparent hover:bg-yellow-700 hover:text-white transition-colors duration-300 text-xl font-light focus:outline-none cursor-pointer">&#43;</button>
            </div>
          </div>
      </div>
    </div>
  </div>`;
}
