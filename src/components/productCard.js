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
      </div>
    </div>
  </div>`;
}
