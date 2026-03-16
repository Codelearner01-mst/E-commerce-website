//Product HTML to display when user clicked on product

export function productHTML(product) {
  if (
    typeof product === "object" &&
    !Array.isArray(product) &&
    product !== null
  ) {
    const div = document.createElement("div");
    div.className = "product-card";
    div.id = `product-${product.id}`;
    div.innerHTML = `
         <div class="xs:w-[26rem] h-90 w-full mx-auto left-26 sm:w-[28rem] sm:h-[31rem] mb-8 overflow-hidden">
           <img class="product-image" src="${product.image}" alt="${product.name}">
         </div>
       <div class="flex items-center flex-col justify-center gap-2.5">
         <p class="text-[1.4rem] font-medium">${product.name}</p>
         <p class="text-[1.4rem] font-medium">$${product.price}</p>
          <div class="cart-actions-container">
            <button class="add-cart-btn btn-primary">
              +Add To Cart
            </button>
          </div>
       </div>
   `;
    return div;
  }
  return {};
}
