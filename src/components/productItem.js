//Product HTML to display when user clicked on product

export function productHTML(product) {
  if (
    typeof product === "object" &&
    !Array.isArray(product) &&
    product !== null
  ) {
    const div = document.createElement("div");
    div.className =
      "product-card lg:flex lg:gap-12 lg:max-w-6xl lg:mx-auto xl:px-8 w-full";
    div.id = `product-${product.id}`;
    div.innerHTML = `
         <div class="xs:w-[26rem] h-90 w-full mx-auto sm:w-[28rem] sm:h-[31rem] lg:w-[35rem] lg:h-[38rem] lg:mx-0 mb-8 overflow-hidden rounded-md shadow-sm">
           <img class="product-image w-full h-full object-cover" src="${product.image}" alt="${product.name}">
         </div>
       <div class="flex items-center flex-col justify-center gap-2.5">
         <h1 class="text-3xl md:text-4xl font-serif tracking-widest uppercase text-gray-900 text-center">${product.name}</h1>
         <p class="text-2xl text-yellow-700 font-medium">$${product.price}</p>
         <p class="text-[1.1rem] text-gray-600 font-sans text-center max-w-2xl px-4 my-2 leading-relaxed">${product.description}</p>
          <div class="cart-actions-container">
            <button id="add-cart-btn" class="add-cart-btn btn-primary">
              +Add To Cart
            </button>
          </div>
       </div>
   `;
    return div;
  }
  return {};
}
