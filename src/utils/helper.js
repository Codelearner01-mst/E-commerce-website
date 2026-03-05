/**
 * Find the index of a cart item by product id.
 * @param {{id:number}} product
 * @returns {number} index in `carts` or -1
 */
export const getCartIndex = (product, carts) => {
  return carts.findIndex((c) => c.id === product.id);
};

/**
 * Check whether a product (by id) already exists in `carts`.
 * Why: do not rely on object identity because `productsData` is recreated on page load.
 * @param {{id:number}} product - product to check
 * @returns {boolean}
 */
export const isProductInCart = (product, carts) => {
  return carts.some((c) => c.id === product.id);
};
