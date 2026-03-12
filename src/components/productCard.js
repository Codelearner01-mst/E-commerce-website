export function productCardHTML(product) {
  return `  <div class="product-card" id="produtct-${product.id}">
              <div class="product-image-container">
                <img
                  src="${product.image}"
                  alt="${product.image}"
                  class="product-image"
                />
              </div>
              <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="flex justify-between items-center">
                  <p class="product-price">${product.price}</p>
                  <div class="quantity-control">
                    <button class="add-cart-btn btn-primary">
                      +Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>`;
}
