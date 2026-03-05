export function quantityControlItem(cart) {
  const container = document.createElement("div");
  container.className = "flex gap-6";
  container.innerHTML = ` 
          <button class="text-gray-400 decrease-btn">&#10094;</button>
          <span class="quantity-display">${cart.quantity}</span>
          <button class="text-gray-400 increase-btn">&#10095;</button>
`;
  return container;
}
