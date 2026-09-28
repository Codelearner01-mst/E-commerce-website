import {
  toggleDropdownMenu,
  displayCartsCount,
  ShowSucessMessage,
} from "../utils/shared.js";
import {
  savedWishlist,
  saveWishlist,
  savedCarts,
  saveCarts,
} from "../utils/saveUtils.js";
import { wishlistItemHTML } from "../components/wishlistItem.js";
import { hamburgerHTML } from "../components/loadComponents/header/hamburgerItem.js";
import { navigationHTML } from "../components/loadComponents/header/navigationItem.js";
import { cartCountHTML } from "../components/loadComponents/header/cartCountItem.js";
import { isProductInCart } from "../utils/helper.js";

const header = document.getElementById("header-bar");
header?.insertAdjacentHTML(
  "beforeend",
  cartCountHTML() + hamburgerHTML() + navigationHTML(),
);
const wishlistList = document.getElementById("wishlist-list");
const emptyWishlistMessage = document.getElementById("empty-wishlist-message");
const cartCount = document.getElementById("cart-count");
const wishlist = (Array.isArray(savedWishlist()) ? savedWishlist() : [])
  .map((item) => Number(typeof item === "object" ? item.id : item))
  .filter((id) => Number.isInteger(id) && id > 0);
const carts = Array.isArray(savedCarts()) ? savedCarts() : [];
let productsById = new Map();

document.getElementById("cart-btn")?.addEventListener("click", () => {
  window.location.href = "/cart";
});
document
  .getElementById("hamburger-btn")
  ?.addEventListener("click", () =>
    toggleDropdownMenu(document.getElementById("drop-menu")),
  );
displayCartsCount(cartCount, carts);

function renderWishlist() {
  const products = wishlist.map((id) => productsById.get(id)).filter(Boolean);
  wishlistList.replaceChildren();
  for (const product of products) {
    wishlistList.insertAdjacentHTML(
      "beforeend",
      wishlistItemHTML(
        product,
        "/static/images/",
        isProductInCart(product.id, carts),
      ),
    );
  }
  const isEmpty = products.length === 0;
  emptyWishlistMessage.classList.toggle("hidden", !isEmpty);
  wishlistList.classList.toggle("hidden", isEmpty);
}

async function loadWishlist() {
  try {
    const response = await fetch("/api/products/data");
    if (!response.ok) throw new Error("Could not load products.");
    const payload = await response.json();
    const products = Array.isArray(payload.products) ? payload.products : [];
    productsById = new Map(
      products.map((product) => [Number(product.id), product]),
    );
    const availableIds = wishlist.filter((id) => productsById.has(id));
    if (availableIds.length !== wishlist.length) {
      wishlist.splice(0, wishlist.length, ...availableIds);
      saveWishlist(wishlist);
    }
    renderWishlist();
  } catch (error) {
    emptyWishlistMessage.textContent =
      "Your saved pieces could not be loaded. Please refresh to try again.";
    emptyWishlistMessage.classList.remove("hidden");
  }
}

wishlistList.addEventListener("click", (event) => {
  const card = event.target.closest(".wishlist-card");
  if (!card) return;
  const id = Number(card.dataset.productId || card.id.split("-").pop());
  const product = productsById.get(id);

  if (event.target.closest(".add-cart-btn") && product) {
    const cartIndex = carts.findIndex((item) => Number(item.id) === id);
    if (cartIndex >= 0) {
      carts.splice(cartIndex, 1);
      event.target.closest(".add-cart-btn").textContent = "Add to Cart";
      ShowSucessMessage("Removed from cart successfully!");
    } else {
      carts.push({
        id,
        name: product.name,
        price: Number(product.price),
        image: product.image,
        quantity: 1,
      });
      event.target.closest(".add-cart-btn").textContent = "Remove from Cart";
      ShowSucessMessage(`${product.name} added to cart successfully!`);
    }
    saveCarts(carts);
    displayCartsCount(cartCount, carts);
    return;
  }

  if (event.target.closest(".remove-wishlist-btn")) {
    const index = wishlist.indexOf(id);
    if (index >= 0) wishlist.splice(index, 1);
    saveWishlist(wishlist);
    renderWishlist();
    ShowSucessMessage("Removed from wishlist successfully!");
    return;
  }

  if (event.target.closest(".img-click, .title-click")) {
    window.location.href = `/product/${id}`;
  }
});

loadWishlist();
