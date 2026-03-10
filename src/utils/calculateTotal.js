const getCartTotals = (carts) => {
  return carts.map((cart) => {
    if (cart.quantity > 1) {
      return cart.price * cart.quantity;
    }
    return cart.price;
  });
};

export function calculateSubtotal(carts) {
  const cartTotals = getCartTotals(carts);

  if (!cartTotals.length) {
    return 0;
  }
  const sum = cartTotals.reduce((acc, total) => {
    return acc + total;
  });

  return `$${sum.toFixed(2)}`;
}
