export function productCardHTML(product) {
  return `
  <div class="product-card group" id="product-${product.id}">
    <div class="product-image-container">
      <img
        src="${product.image}"
        alt="${product.name}"
        class="product-image"
        loading="lazy"
      />
    </div>
    <div class="product-info">
      <span class="product-label">Vision Jewelry</span>
      <h3 class="product-title">${product.name}</h3>
      <div class="cart-btns-container flex justify-between items-center mt-2.5">
        <p class="product-price">$${product.price}</p>
        <button class="add-cart-btn btn-primary">
          Add to Cart
        </button>
        <div class="quantity-control-btns hidden items-center bg-white border border-yellow-700 rounded-sm w-max h-9 overflow-hidden shadow-sm">
            <button class="decrease-btn w-9 h-full flex items-center justify-center text-yellow-800 bg-transparent hover:bg-yellow-800 hover:text-white transition-colors duration-300 text-xl font-light focus:outline-none cursor-pointer">&#8722;</button>
            <span class="quantity-display flex-1 px-4 font-serif text-gray-900 text-base min-w-[3rem] text-center select-none border-x border-yellow-700/30 h-full flex items-center justify-center">1</span>
            <button class="increase-btn w-9 h-full flex items-center justify-center text-yellow-800 bg-transparent hover:bg-yellow-800 hover:text-white transition-colors duration-300 text-xl font-light focus:outline-none cursor-pointer">&#43;</button>
         </div>
      </div>
    </div>
  </div>`;
}
