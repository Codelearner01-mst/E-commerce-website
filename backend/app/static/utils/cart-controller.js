import { ShowSucessMessage } from "../utils/shared.js";
import { saveCarts } from "./saveUtils.js";
import { getCartIndex } from "../utils/helper.js";
import { increaseQuantity } from "./quantityUpdate.js";
import { decreaseQuantity } from "./quantityUpdate.js";

/**
 * Read a product snapshot from a database-backed product card.
 * @param {number} id
 * @returns {{id:number,name:string,price:number,quantity:number}|undefined}
 */
function productFromCard(card) {
  const id = Number(card?.dataset?.productId || card?.id?.split("-").pop());
  const name =
    card?.dataset?.productName ||
    card?.querySelector(".product-title")?.textContent?.trim();
  const price = Number(
    card?.dataset?.productPrice ||
      card
        ?.querySelector(".product-price")
        ?.textContent?.replace(/[^\d.]/g, ""),
  );
  const image =
    card?.dataset?.productImage ||
    card?.querySelector("img")?.getAttribute("src");
  if (
    !Number.isInteger(id) ||
    id < 1 ||
    !name ||
    !Number.isFinite(price) ||
    !image
  )
    return null;
  return { id, name, price, image, quantity: 1 };
}

//Locate to the product page
export function displayProduct(card, href) {
  const productId = parseInt(card.id.split("-")[1], 10);
  if (!Number.isInteger(productId) || productId < 1) return;
  window.location.href = `/product/${productId}`;
}

export const increaseCartQuantity = (id, carts) => {
  if (!Array.isArray(carts)) {
    return;
  }
  const index = getCartIndex(id, carts);
  const cart = carts[index];
  increaseQuantity(cart);
  saveCarts(carts);
};

export const decreaseCartQuantity = (id, carts) => {
  if (!Array.isArray(carts)) {
    return;
  }
  const index = getCartIndex(id, carts);
  const cart = carts[index];
  decreaseQuantity(cart);
  saveCarts(carts);
};

export function removeProductFromCart(id, carts) {
  if (!Array.isArray(carts)) {
    return;
  }
  const index = getCartIndex(id, carts);
  if (index === -1) {
    return;
  }
  carts.splice(index, 1);
  saveCarts(carts);
}

export function addProductToCart(card, carts) {
  if (!Array.isArray(carts)) return;
  const productId = parseInt(card.id.split("-")[1], 10);
  if (isNaN(productId)) {
    return;
  }
  const product = productFromCard(card);
  if (!product) {
    return;
  }
  const existing = carts.find((item) => Number(item.id) === product.id);
  if (existing) existing.quantity = Number(existing.quantity || 1) + 1;
  else carts.push(product);
  ShowSucessMessage(`${product.name} added to cart successfully!`);
  saveCarts(carts);
}
