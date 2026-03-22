export function saveCarts(carts) {
  if (carts && Array.isArray(carts)) {
    localStorage.setItem("carts", JSON.stringify(carts));
  }
}

export function savedCarts() {
  try {
    return JSON.parse(localStorage.getItem("carts")) || [];
  } catch (error) {
    return [];
  }
}
