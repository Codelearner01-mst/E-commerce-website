//This function hides addTocart button asnd show quantity control buttons
export function ShowQuantityControlButtons(quantityBtn, addToCartBtn) {
  if (
    !quantityBtn ||
    quantityBtn === null ||
    !addToCartBtn ||
    addToCartBtn === null
  ) {
    return;
  }
  addToCartBtn.classList.add("hidden"); //Hide "Add to cart" button
  quantityBtn.classList.remove("hidden"); // Show quantity controls button
  quantityBtn.classList.add("flex");
}

//This function hides quantity control buttons asnd show addTocart button
export function showAddToCartButton(quantityBtn, addToCartBtn) {
  if (
    !quantityBtn ||
    quantityBtn === null ||
    !addToCartBtn ||
    addToCartBtn === null
  ) {
    return;
  }
  addToCartBtn.classList.remove("hidden"); //show "add to cart" button
  quantityBtn.classList.add("hidden"); //Hide quantity controls button
  quantityBtn.classList.remove("flex");
}
