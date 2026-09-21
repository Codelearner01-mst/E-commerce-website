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

export function saveWishlist(wishlist) {
  if (wishlist && Array.isArray(wishlist)) {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
}

export function savedWishlist() {
  try {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  } catch (error) {
    return [];
  }
}
