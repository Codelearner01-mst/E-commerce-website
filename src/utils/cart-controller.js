import { displayCartsCount } from "../utils/shared.js";
import { ShowSucessMessage } from "../utils/shared.js";
import { saveCarts } from "./saveUtils.js";
import { productsData } from "../utils/productsStore.js";
import { setProductQuantityControl } from "../utils/shared.js";
import { getCartIndex } from "../utils/helper.js";

/**
 * Return a product object from `productsData` by id.
 * @param {number} id
 * @returns {{id:number,name:string,price:number,quantity:number}|undefined}
 */
function productToAddToCartOrDisplay(id) {
  const product = productsData.find((product) => {
    const productId = product?.id;
    //Tackle undefined and NaN. e.g.(id: null id:"abc" id2: 1)
    if (
      !productId ||
      typeof productId !== "number" ||
      Number.isNaN(productId)
    ) {
      return undefined;
    }
    return productId === id;
  });
  return product;
}

//Locate to the product page
export function displayProduct(card, carts, href) {
  if (!carts || !Array.isArray(carts)) {
    return;
  }
  const productId = parseInt(card.id.split("-")[1], 10);
  const product = productToAddToCartOrDisplay(productId);
  sessionStorage.setItem("currentProduct", JSON.stringify(product)); //Store the product object temporilary to display it in the product page
  window.location.href = href;
  return;
}

export function addProductToCartAndSetControlQuantity(
  card,
  carts,
  msgEle,
  countEle,
) {
  if (!carts || !msgEle || !countEle) {
    return;
  }
  const productId = parseInt(card.id.split("-")[1], 10);
  if (isNaN(productId)) {
    return;
  }
  const product = productToAddToCartOrDisplay(productId);
  if (product === undefined) {
    return;
  }

  //Push product to cart and set up quantity controls..
  carts.push(product);
  const index = getCartIndex(product.id, carts);
  const cart = carts[index];
  setProductQuantityControl(
    card.querySelector(".quantity-control"),
    cart,
    carts,
    msgEle,
    countEle,
  );

  saveCarts(carts);
  ShowSucessMessage(msgEle, `${product.name} added to cart successfully!`);
  displayCartsCount(countEle, carts);
}
