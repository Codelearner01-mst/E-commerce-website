//Product HTML to display when user clicked on product

export function productHTML(product) {
  if (
    typeof product === "object" &&
    !Array.isArray(product) &&
    product !== null
  ) {
    const div = document.createElement("div");
    div.className = "product-details";
    div.innerHTML = `
         <div class="xs:w-[26rem] h-90 w-full mx-auto left-26 sm:w-[28rem] sm:h-[31rem] mb-8 overflow-hidden">
           <img class="product-image" src="${product.image}" alt="${product.name}">
         </div>
       <div class="flex items-center flex-col justify-center gap-2.5">
         <p class="text-[1.4rem] font-medium">${product.name}</p>
         <p class="text-[1.4rem] font-medium">$${product.price}</p>
         <div class="text-[1.1rem] bg-amber-600 border border-amber-400 px-7 py-2.5">
           <p class="text-white">ADD TO CART</p>
         </div>
       </div>
   `;
    return div;
  }
  return {};
}
