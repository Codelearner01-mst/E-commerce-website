import { renderProduct, renderSimilarProducts } from "../components/render.js";
import { savedCarts, savedWishlist, saveWishlist } from "../utils/saveUtils.js";
import {
  addProductToCart,
  decreaseCartQuantity,
  increaseCartQuantity,
  removeProductFromCart,
} from "../utils/cart-controller.js";
import { getProductInCart } from "../utils/helper.js";
import { displayCartsCount, toggleDropdownMenu } from "../utils/shared.js";
import {
  ShowQuantityControlButtons,
  showAddToCartButton,
} from "../utils/toggler.js";
import { runCartActionsConfirmation } from "../utils/toast/notify.js";
import { hamburgerHTML } from "../components/loadComponents/header/hamburgerItem.js";
import { navigationHTML } from "../components/loadComponents/header/navigationItem.js";
import { cartCountHTML } from "../components/loadComponents/header/cartCountItem.js";

const header = document.getElementById("header-bar");
header?.insertAdjacentHTML(
  "beforeend",
  cartCountHTML() + hamburgerHTML() + navigationHTML(),
);

const productContainer = document.getElementById("product-container");
const similarContainer = document.getElementById("products-similar-container");
const productId = Number(
  document.querySelector("[data-product-id]")?.dataset.productId,
);
const carts = savedCarts();
const cartCount = document.getElementById("cart-count");

async function loadProduct() {
  if (!Number.isInteger(productId) || productId < 1) {
    showProductError("This product link is invalid.");
    return;
  }
  try {
    const productResponse = await fetch(`/api/products/${productId}`);
    if (productResponse.status === 404) {
      showProductError("We could not find that product.");
      return;
    }
    if (!productResponse.ok) throw new Error("Product request failed.");
    const productPayload = await productResponse.json();
    const product = productPayload.product;
    if (!product) {
      showProductError("We could not find that product.");
      return;
    }
    document.title = `${product.name} | Vision Jewelry`;
    document.getElementById("product-page-title").textContent = product.name;
    renderProduct(productContainer, product);
    connectProductActions(product);
    try {
      const productsResponse = await fetch("/api/products/data");
      const productsPayload = productsResponse.ok
        ? await productsResponse.json()
        : {};
      renderSimilarProducts(
        similarContainer,
        product,
        Array.isArray(productsPayload.products) ? productsPayload.products : [],
      );
    } catch (error) {
      similarContainer.replaceChildren();
    }
  } catch (error) {
    showProductError(
      "Product details are temporarily unavailable. Please try again.",
    );
  }
}

function showProductError(message) {
  if (productContainer) {
    const note = document.createElement("p");
    note.className = "py-12 text-center text-gray-500";
    note.textContent = message;
    productContainer.replaceChildren(note);
  }
}

function connectProductActions(product) {
  const card = productContainer.querySelector(".product-card");
  if (!card) return;
  const id = Number(product.id);
  const addButton = card.querySelector(".add-cart-btn");
  const controls = card.querySelector(".quantity-control-btns");
  const quantityDisplay = card.querySelector(".quantity-display");
  const wishlistButton = card.querySelector("#wishlist-btn");

  function syncCartState() {
    const cartItem = getProductInCart(carts, id);
    if (cartItem) {
      ShowQuantityControlButtons(controls, addButton);
      quantityDisplay.textContent = cartItem.quantity;
    } else {
      showAddToCartButton(controls, addButton);
    }
    displayCartsCount(cartCount, carts);
  }

  function syncWishlistState() {
    const wishlist = savedWishlist();
    const inWishlist = wishlist.some(
      (item) => Number(typeof item === "object" ? item.id : item) === id,
    );
    wishlistButton.textContent = inWishlist
      ? "Remove from wishlist"
      : "Save to Wishlist";
    wishlistButton.setAttribute("aria-pressed", String(inWishlist));
  }

  addButton.addEventListener("click", () => {
    addProductToCart(card, carts);
    syncCartState();
  });
  controls.querySelector(".increase-btn")?.addEventListener("click", () => {
    increaseCartQuantity(id, carts);
    syncCartState();
    runCartActionsConfirmation("Cart updated successfully!", carts, cartCount);
  });
  controls.querySelector(".decrease-btn")?.addEventListener("click", () => {
    const cartItem = getProductInCart(carts, id);
    if (cartItem?.quantity <= 1) removeProductFromCart(id, carts);
    else decreaseCartQuantity(id, carts);
    syncCartState();
    runCartActionsConfirmation("Cart updated successfully!", carts, cartCount);
  });
  wishlistButton.addEventListener("click", () => {
    const wishlist = savedWishlist();
    const index = wishlist.findIndex(
      (item) => Number(typeof item === "object" ? item.id : item) === id,
    );
    if (index === -1) wishlist.push(id);
    else wishlist.splice(index, 1);
    saveWishlist(wishlist);
    syncWishlistState();
  });

  similarContainer.addEventListener("click", (event) => {
    const similarCard = event.target.closest(".product-card");
    if (similarCard && !event.target.closest("button")) {
      window.location.href = `/product/${Number(similarCard.dataset.productId)}`;
    }
  });
  syncCartState();
  syncWishlistState();
}

document.getElementById("cart-btn")?.addEventListener("click", () => {
  window.location.href = "/cart";
});
document
  .getElementById("hamburger-btn")
  ?.addEventListener("click", () =>
    toggleDropdownMenu(document.getElementById("drop-menu")),
  );
loadProduct();
