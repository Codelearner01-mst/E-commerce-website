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
import {
  addProductToCart,
  removeProductFromCart,
} from "../utils/cart-controller.js";
import { hamburgerHTML } from "../components/loadComponents/header/hamburgerItem.js";
import { navigationHTML } from "../components/loadComponents/header/navigationItem.js";
import { cartCountHTML } from "../components/loadComponents/header/cartCountItem.js";
import { footerHTML } from "../components/loadComponents/footer/footerItem.js";
import { productsData } from "../utils/productsStore.js";
import { isProductInCart } from "../utils/helper.js";

const headerBar = document.getElementById("header-bar");
const footer = document.getElementById("footer");

// Inject header navigation and footer components
headerBar.insertAdjacentHTML("beforeEnd", cartCountHTML());
headerBar.insertAdjacentHTML("beforeEnd", hamburgerHTML());
headerBar.insertAdjacentHTML(
  "beforeEnd",
  navigationHTML(
    "./shop.html",
    "./about.html",
    "./contact.html",
    "./wishlist.html",
  ),
);

footer.innerHTML = footerHTML("./shop.html", "./about.html", "./contact.html");

const wishlist = savedWishlist();
const carts = savedCarts();

const wishlistList = document.getElementById("wishlist-list");
const emptyWishlistMessage = document.getElementById("empty-wishlist-message");
const cartCount = document.getElementById("cart-count");
const cartButton = document.getElementById("cart-btn");

const hamburgerButton = document.getElementById("hamburger-btn");
const dropDownMenu = document.getElementById("drop-menu");

// Initialize cart badge count
displayCartsCount(cartCount, carts);

cartButton.addEventListener("click", () => {
  window.location.href = "carts.html";
});

hamburgerButton.addEventListener("click", () => {
  toggleDropdownMenu(dropDownMenu);
});

// Render the wishlist items
function renderWishlist() {
  wishlistList.innerHTML = "";
  if (wishlist.length === 0) {
    toggleHiddenOnEmptyWishlist();
    return;
  }

  for (const item of wishlist) {
    const isInCart = isProductInCart(item.id, carts);
    wishlistList.insertAdjacentHTML(
      "beforeEnd",
      wishlistItemHTML(item, "../images/", isInCart),
    );
  }
  toggleHiddenOnEmptyWishlist();
}

function toggleHiddenOnEmptyWishlist() {
  if (wishlist.length === 0) {
    emptyWishlistMessage.classList.remove("hidden");
    wishlistList.classList.add("hidden");
  } else {
    emptyWishlistMessage.classList.add("hidden");
    wishlistList.classList.remove("hidden");
  }
}

// Initial render
renderWishlist();

// Event listeners for card actions
wishlistList.addEventListener("click", (event) => {
  const target = event.target;
  const card = target.closest(".wishlist-card");
  if (!card) return;

  const cardId = parseInt(card.id.split("-")[1], 10);

  // 1. Move to cart / Remove from cart click
  if (target.classList.contains("add-cart-btn")) {
    const isInCart = isProductInCart(cardId, carts);

    if (isInCart) {
      // Remove from cart
      removeProductFromCart(cardId, carts);
      saveCarts(carts);

      // Toggle button to Add
      target.textContent = "Add to Cart";
      target.className =
        "add-cart-btn btn-primary text-xs tracking-wider px-5 py-2.5";
      ShowSucessMessage("Removed from cart successfully!");
    } else {
      // Pull the clean product directly from productsData to avoid stale/prefixed image paths
      const productToAdd = productsData.find((p) => p.id === cardId);
      if (productToAdd) {
        carts.push({ ...productToAdd });
        saveCarts(carts);
        ShowSucessMessage(`${productToAdd.name} added to cart successfully!`);
      }

      // Toggle button to Remove
      target.textContent = "Remove from Cart";
      target.className =
        "add-cart-btn btn-secondary text-xs tracking-wider px-5 py-2.5 bg-gray-100 hover:bg-red-50 hover:text-red-600 hover:border-red-200";
    }

    displayCartsCount(cartCount, carts);
    return;
  }

  // 2. Remove click
  if (target.closest(".remove-wishlist-btn")) {
    const removeIndex = wishlist.findIndex((w) => w.id === cardId);
    if (removeIndex > -1) {
      wishlist.splice(removeIndex, 1);
      saveWishlist(wishlist);

      // Smooth slide-out slide animation
      card.classList.add(
        "opacity-0",
        "transition-all",
        "duration-500",
        "-translate-y-2",
      );
      setTimeout(() => {
        card.remove();
        toggleHiddenOnEmptyWishlist();
      }, 500);
      ShowSucessMessage("Removed from wishlist successfully!");
    }
    return;
  }

  // 3. Navigation details click
  if (
    target.closest(".img-click") ||
    target.classList.contains("title-click")
  ) {
    const selectedProduct = productsData.find((p) => p.id === cardId);
    if (selectedProduct) {
      sessionStorage.setItem("currentProduct", JSON.stringify(selectedProduct));
      window.location.href = "./product.html";
    }
  }
});
