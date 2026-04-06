// Product HTML displayed when user clicks on a product

export function productHTML(product) {
  if (
    typeof product === "object" &&
    !Array.isArray(product) &&
    product !== null
  ) {
    const div = document.createElement("div");
    div.className = "product-card w-full";
    div.id = `product-${product.id}`;
    div.innerHTML = `
      <div class="lg:grid lg:grid-cols-2 lg:gap-16 lg:max-w-6xl lg:mx-auto xl:px-8 w-full">

        <!-- Image -->
        <div class="relative overflow-hidden bg-gray-50  w-full
                    xs:w-[26rem] h-[26rem]
                    sm:w-[28rem] sm:h-[34rem]
                    lg:w-full lg:h-[44rem] lg:mx-0 mb-10 lg:mb-0">
          <img
            class="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            src="${product.image}"
            alt="${product.name}"
          />
        </div>

        <!-- Info -->
        <div class="flex flex-col justify-center gap-5 px-4 lg:px-0 lg:py-8">
          <span class="eyebrow">Vision Jewelry</span>

          <h1 class="text-3xl md:text-4xl lg:text-[2.6rem] font-serif font-medium
                     tracking-wide text-gray-900 leading-tight">
            ${product.name}
          </h1>

          <p class="text-2xl font-sans font-medium text-amber-800 tracking-wide">
            $${product.price}
          </p>

          <!-- Divider -->
          <div class="w-12 h-px bg-amber-700 my-1"></div>

          <p class="text-[1rem] text-gray-500 font-sans leading-relaxed max-w-md">
            ${product.description}
          </p>

          <div class="cart-btns-container flex flex-col gap-3 mt-4 max-w-sm">
            <button id="add-cart-btn" class="add-cart-btn btn-primary-full">
              Add to Cart
            </button>
             <div class="quantity-control-btns hidden items-center bg-white border rounded-2xl border-yellow-700  w-max h-9 overflow-hidden shadow-sm">
                <button class="decrease-btn w-15 h-full flex items-center justify-center text-yellow-800 bg-transparent hover:bg-yellow-800 hover:text-white transition-colors duration-300 text-xl font-light focus:outline-none cursor-pointer">&#8722;</button>
                <span class="quantity-display flex-1 px-4 font-serif text-gray-900 text-base min-w-[3rem] text-center select-none border-x border-yellow-700/30 h-full flex items-center justify-center">1</span>
                <button class="increase-btn w-15 h-full flex items-center justify-center text-yellow-800 bg-transparent hover:bg-yellow-800 hover:text-white transition-colors duration-300 text-xl font-light focus:outline-none cursor-pointer">&#43;</button>
             </div>
            <button class="btn-secondary">
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
