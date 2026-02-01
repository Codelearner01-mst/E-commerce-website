export function saveCarts(carts) {
  localStorage.setItem("carts", JSON.stringify(carts));
}

export function loadCarts() {
  try {
    //return null and missing data and return empty array
    return JSON.parse(localStorage.getItem("carts")) || [];
  } catch (error) {
    console.error("Corrupted cart data");
    return [];
  }
}
