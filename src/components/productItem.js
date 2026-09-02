// Product HTML displayed when user clicks on a product

export function productHTML(product) {
  if (
    typeof product === "object" &&
    !Array.isArray(product) &&
    product !== null
  ) {
    const div = document.createElement("div");
    div.className = " w-full ";
    div.id = `product-${product.id}`;
    const oldPrice =
      product.originalPrice || (Number(product.price) * 1.2).toFixed(2);
    div.innerHTML = `
 <div class="px-4 md:px-8 lg:px-12 xl:px-16 py-6 md:grid lg:grid-cols-2 md:gap-8 lg:gap-16 md:max-w-5xl lg:max-w-6xl md:mx-auto w-full">

  <!-- Image -->
  <div class="relative overflow-hidde w-65 h-78 mb-10 md:mb-0 md:h-full ">
    <img
      class="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
      src="${product.image}"
      alt="${product.name}"
    />
  </div>

  <!-- Info -->
  <div class="flex flex-col justify-center gap-5 px-4 md:px-0 lg:py-8">
          <span class="eyebrow">Vision Jewelry</span>

          <h1 class="text-3xl md:text-4xl lg:text-[2.6rem] font-serif font-medium
                     tracking-wide text-gray-900 leading-tight">
            ${product.name}
          </h1>

          <p class="text-2xl font-sans font-medium text-amber-800 tracking-wide">
            <span class="line-through text-sm text-gray-500 mr-2">$${oldPrice}</span>
            $${product.price}
          </p>

          <!-- Divider -->
          <div class="w-12 h-px bg-amber-700 my-1"></div>

          <p class="text-[1rem] text-gray-500 font-sans leading-relaxed max-w-md">
            ${product.description}
          </p>

          <div class="cart-btns-container flex flex-col md:flex-row gap-3 mt-4 max-w-sm">
            <button id="add-cart-btn" class="add-cart-btn btn-primary-full">
              Add to Cart
            </button>
             <div class="quantity-control-btns hidden items-center bg-white border rounded-2xl border-yellow-700  h-9 w-50 md:w-40 mx-auto px-6 py-3 overflow-hidden ">
                <button class="decrease-btn text-yellow-800 bg-transparent hover:bg-yellow-800 hover:text-white transition-colors duration-300 text-xl font-light focus:outline-none cursor-pointer">&#8722;</button>
                <span class="quantity-display flex-1 font-serif text-gray-900 text-lg text-center select-none border-x border-yellow-700/30 h-full flex items-center justify-center">1</span>
                <button class="increase-btn text-yellow-800 text-2xl bg-transparent hover:bg-yellow-800 hover:text-white transition-colors duration-300 font-light focus:outline-none cursor-pointer">&#43;</button>
             </div>
            <button id="wishlist-btn" class="btn-secondary">
              Save to Wishlist
            </button>
          </div>

          <!-- Details strip -->
          <div class="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-2 text-xs text-gray-400 uppercase tracking-[0.15em]">
            <p>✦ &nbsp;Handcrafted with care</p>
            <p>✦ &nbsp;Free shipping on orders over $150</p>
            <p>✦ &nbsp;30-day returns</p>
          </div>
        </div>

      </div>
    `;
    return div;
  }
  return {};
}
