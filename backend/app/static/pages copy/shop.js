import { renderProducts } from "../components/render.js";
import { savedCarts, savedWishlist, saveWishlist } from "../utils/saveUtils.js";
import { displayCartsCount, toggleDropdownMenu } from "../utils/shared.js";
import {
  addProductToCart,
  decreaseCartQuantity,
  increaseCartQuantity,
  removeProductFromCart,
} from "../utils/cart-controller.js";
import { getProductInCart } from "../utils/helper.js";
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

const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search-input");
const categoryRail = document.querySelector(".cat-rail-inner");
const filterMenu = document.getElementById("filter-menu");
const filterButton = document.getElementById("filter-btn");
const sortSelect = document.getElementById("sort-by");
const carts = savedCarts();
const cartCount = document.getElementById("cart-count");

let allProducts = [];
let activeCategory = "all";
let activePriceRange = null;
let sortMode = "relevance";
const imagePath = "/static/images/";

function setCategory(category) {
  activeCategory = category || "all";
  categoryRail?.querySelectorAll(".cat-btn").forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.category === activeCategory,
    );
  });
  applyFilters();
}

function applyFilters() {
  if (!productList) return;
  const term = searchInput?.value.trim().toLowerCase() || "";
  let view = allProducts.filter((product) => {
    const matchesCategory =
      activeCategory === "all" || product.category === activeCategory;
    const matchesTerm = `${product.name} ${product.description || ""}`
      .toLowerCase()
      .includes(term);
    const price = Number(product.price);
    const matchesPrice =
      !activePriceRange ||
      (price >= activePriceRange.min &&
        (activePriceRange.max === null || price <= activePriceRange.max));
    return matchesCategory && matchesTerm && matchesPrice;
  });

  if (sortMode === "price-asc")
    view.sort((a, b) => Number(a.price) - Number(b.price));
  if (sortMode === "price-desc")
    view.sort((a, b) => Number(b.price) - Number(a.price));
  if (sortMode === "newest") view.sort((a, b) => Number(b.id) - Number(a.id));

  renderProducts(view, imagePath, productList);
  if (!view.length) {
    const empty = document.createElement("p");
    empty.className = "col-span-full py-12 text-center text-gray-500";
    empty.textContent = "No products match those filters.";
    productList.append(empty);
  }
  initializeCartCards();
}

function populateCategories(categories) {
  if (!categoryRail || !filterMenu) return;
  categoryRail
    .querySelectorAll(".cat-btn:not([data-category='all'])")
    .forEach((node) => node.remove());
  const categoryList = filterMenu.querySelector("[aria-label='Categories']");
  categoryList
    ?.querySelectorAll(".category-item:not([data-category='all'])")
    .forEach((node) => node.remove());

  for (const category of categories) {
    const button = document.createElement("button");
    button.className = "cat-btn";
    button.dataset.category = category.name;
    button.textContent = category.name;
    categoryRail.append(button);

    if (categoryList) {
      const item = document.createElement("li");
      item.className = "category-item";
      item.dataset.category = category.name;
      item.textContent = category.name;
      categoryList.append(item);
    }
  }
}

async function loadCatalog() {
  try {
    const [productsResponse, categoriesResponse] = await Promise.all([
      fetch("/api/products/data"),
      fetch("/api/products/categories"),
    ]);
    if (!productsResponse.ok) throw new Error("Product request failed.");
    const productsData = await productsResponse.json();
    const categoriesData = categoriesResponse.ok
      ? await categoriesResponse.json()
      : { categories: [] };
    allProducts = Array.isArray(productsData.products)
      ? productsData.products
      : [];
    populateCategories(
      Array.isArray(categoriesData.categories) ? categoriesData.categories : [],
    );
    const requestedCategory = new URLSearchParams(window.location.search).get("category");
    if (
      requestedCategory &&
      Array.isArray(categoriesData.categories) &&
      categoriesData.categories.some((category) => category.name === requestedCategory)
    ) {
      setCategory(requestedCategory);
    } else {
      applyFilters();
    }
  } catch (error) {
    if (productList)
      productList.innerHTML =
        "<p class='col-span-full py-12 text-center text-gray-500'>We could not load the collection. Please refresh to try again.</p>";
  }
}

function initializeCartCards() {
  for (const card of productList?.querySelectorAll(".product-card") || []) {
    const item = getProductInCart(carts, Number(card.dataset.productId));
    if (!item) continue;
    ShowQuantityControlButtons(
      card.querySelector(".quantity-control-btns"),
      card.querySelector(".add-cart-btn"),
    );
    const display = card.querySelector(".quantity-display");
    if (display) display.textContent = item.quantity;
  }
}

categoryRail?.addEventListener("click", (event) => {
  const button = event.target.closest(".cat-btn");
  if (button) setCategory(button.dataset.category);
});

searchInput?.addEventListener("input", applyFilters);
sortSelect?.addEventListener("change", (event) => {
  sortMode = event.target.value;
  applyFilters();
});

filterButton?.addEventListener("click", (event) => {
  event.stopPropagation();
  const open = filterMenu.classList.toggle("open");
  filterButton.setAttribute("aria-expanded", String(open));
});
document.addEventListener("click", (event) => {
  if (
    filterMenu &&
    !filterMenu.contains(event.target) &&
    !filterButton?.contains(event.target)
  ) {
    filterMenu.classList.remove("open");
    filterButton?.setAttribute("aria-expanded", "false");
  }
});

filterMenu?.addEventListener("click", (event) => {
  const toggle = event.target.closest(".group-toggle");
  if (toggle) {
    toggle.closest(".filter-group")?.classList.toggle("expanded");
    return;
  }
  const category = event.target.closest(".category-item");
  if (category) {
    setCategory(category.dataset.category);
    return;
  }
  const priceRange = event.target.closest(".price-range");
  if (priceRange) {
    activePriceRange = {
      min: Number(priceRange.dataset.min),
      max: priceRange.dataset.max ? Number(priceRange.dataset.max) : null,
    };
    applyFilters();
    return;
  }
  if (event.target.closest("#clear-filters")) {
    activePriceRange = null;
    searchInput.value = "";
    sortMode = "relevance";
    if (sortSelect) sortSelect.value = sortMode;
    setCategory("all");
  }
});

productList?.addEventListener("click", (event) => {
  const card = event.target.closest(".product-card");
  if (!card) return;
  const id = Number(card.dataset.productId);
  const product = getProductInCart(carts, id);
  const wishlistButton = event.target.closest(
    ".wishlist-btn, .wishlist-inline-btn",
  );
  if (wishlistButton) {
    const wishlist = savedWishlist();
    const index = wishlist.findIndex(
      (item) => Number(typeof item === "object" ? item.id : item) === id,
    );
    if (index < 0) wishlist.push(id);
    else wishlist.splice(index, 1);
    saveWishlist(wishlist);
    wishlistButton.classList.toggle("saved", index < 0);
    wishlistButton.setAttribute("aria-pressed", String(index < 0));
    return;
  }
  if (event.target.closest(".increase-btn")) {
    increaseCartQuantity(id, carts);
    card.querySelector(".quantity-display").textContent = getProductInCart(
      carts,
      id,
    ).quantity;
    runCartActionsConfirmation("Cart updated successfully!", carts, cartCount);
    return;
  }
  if (event.target.closest(".decrease-btn")) {
    if (product?.quantity <= 1) {
      removeProductFromCart(id, carts);
      showAddToCartButton(
        card.querySelector(".quantity-control-btns"),
        card.querySelector(".add-cart-btn"),
      );
    } else {
      decreaseCartQuantity(id, carts);
      card.querySelector(".quantity-display").textContent = getProductInCart(
        carts,
        id,
      ).quantity;
    }
    runCartActionsConfirmation("Cart updated successfully!", carts, cartCount);
    return;
  }
  if (event.target.closest(".add-cart-btn")) {
    addProductToCart(card, carts);
    ShowQuantityControlButtons(
      card.querySelector(".quantity-control-btns"),
      card.querySelector(".add-cart-btn"),
    );
    card.querySelector(".quantity-display").textContent = getProductInCart(
      carts,
      id,
    ).quantity;
    displayCartsCount(cartCount, carts);
    return;
  }
  if (!event.target.closest("a, button"))
    window.location.href = `/product/${id}`;
});

document.getElementById("cart-btn")?.addEventListener("click", () => {
  window.location.href = "/cart";
});
document
  .getElementById("hamburger-btn")
  ?.addEventListener("click", () =>
    toggleDropdownMenu(document.getElementById("drop-menu")),
  );
displayCartsCount(cartCount, carts);
loadCatalog();
