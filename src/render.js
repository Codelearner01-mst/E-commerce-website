function CartHTML(productName, price, quantity, imageUrl) {
  const cartDiv = document.createElement("div");
  cartDiv.className = "cart-item";
  cartDiv.innerHTML = `<div class="cart-info">
              <div class="produt-info">
                <div class="product-image-container">
                  <img src="${imageUrl}" alt="${productName}" class="" />
                </div>
                <div class="product-details">
                <p class="">${productName}</p>
                <p class="">$${price}</p>
                </div>
              </div>
              <div class="product-quantity">
                <button role="" class="prev">&#10094;</button>
                <span>1</span>
                <button class="next">&#10095;</button>
              </div>
              <p class="total-price">${price * quantity}</p>
            </div>`;
  return cartDiv;
}

export function renderCarts(list, carts) {
  if (!list) {
    console.error("List element not found");
    return;
  }

  for (const cart of carts) {
    const HTML = CartHTML(cart.name, cart.price, cart.quantity, cart.image);
    console.log(HTML);
    list.appendChild(HTML);
  }
}
