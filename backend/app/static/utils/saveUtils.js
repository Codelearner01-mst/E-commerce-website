export function saveCarts(carts) {
  if (carts && Array.isArray(carts)) {
    localStorage.setItem("carts", JSON.stringify(carts));
  }
}

export function savedCarts() {
  try {
    const carts = JSON.parse(localStorage.getItem("carts"));
    return Array.isArray(carts) ? carts : [];
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
    const wishlist = JSON.parse(localStorage.getItem("wishlist"));
    return Array.isArray(wishlist) ? wishlist : [];
  } catch (error) {
    return [];
  }
}
