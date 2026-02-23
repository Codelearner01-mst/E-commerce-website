//Product HTML to display when user clicked on product

export function productHTML(product) {
  if (
    typeof product === "object" &&
    !Array.isArray(product) &&
    product !== null
  ) {
    return `
       <div class="product-details">
         <div>
           <img src="${product.image}" alt="${product.name}">
         </div>
         <p>${product.name}</p>
         <p>${product.price}</p>
       </div>
   `;
  }
  return {};
}

//export default productHTML;
