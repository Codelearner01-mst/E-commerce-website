export function cartsCounter(carts) {
  if (!carts) {
    return;
  }

  let cartsCount = 0;
  for (const c of carts) {
    cartsCount += c.quantity;
  }
  return cartsCount;
}

export function displayCartsCount(element, count) {
  if (!element) {
    return;
  }
  element.textContent = count;
}
