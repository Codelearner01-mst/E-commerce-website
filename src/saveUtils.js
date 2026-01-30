export function saveCarts(carts) {
  localStorage.setItem("carts", JSON.stringify(carts));
}

export function loadCarts() {
  const savedCarts = JSON.parse(localStorage.getItem("carts"));
  return savedCarts;
}
