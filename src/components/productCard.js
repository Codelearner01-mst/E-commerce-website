export function productCardHTML(product) {
  const oldPrice =
    product.originalPrice || (Number(product.price) * 1.2).toFixed(2);
  return `
  <div class="product-card group bg-white rounded-lg overflow-hidden" id="product-${product.id}">
    <div class="product-image-container overflow-hidden">
      <img
        src="${product.image}"
        alt="${product.name}"
        class="product-image w-full h-[230px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
      />
    </div>
    <div class="product-info p-4 px-6">
      <span class="product-label uppercase tracking-[0.18em] text-[10px]">Vision Jewelry</span>
      <h3 class="product-title font-medium">${product.name}</h3>
      <div class="cart-btns-container">
        <div class="price-row flex items-center gap-2">
          <span class="line-through text-sm text-gray-500">$${oldPrice}</span>
          <span class="product-price font-semibold">$${product.price}</span>
        </div>
        <div class="actions flex items-center justify-between mt-3">
          <button class="wishlist-btn p-1.5 rounded-full hover:bg-amber-50 hover:text-red-500 transition-colors" aria-label="Add to wishlist">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21s-7-4.35-9-6.36C1.37 12.91 2 9.5 5 7.5 7.28 6 9.5 7 12 9c2.5-2 4.72-3 7-1.5 3 2 3.63 5.41 2 7.14C19 16.65 12 21 12 21z"/></svg>
          </button>
          <div class="ml-auto flex items-center gap-2">
            <button class="add-cart-btn btn-primary px-4 py-2 text-sm font-medium">
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
    </div>
  </div>`;
}
