export function cartsCounter(carts) {
  if (!carts) {
    return;
  }
  return carts.length;
}

export function displayCartsCount(element, count) {
  if (!element) {
    return;
  }
  element.textContent = count;
}
