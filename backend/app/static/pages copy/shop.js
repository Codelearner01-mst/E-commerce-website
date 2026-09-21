import { savedCarts, savedWishlist, saveWishlist } from "../utils/saveUtils.js";
import { displayCartsCount, toggleDropdownMenu } from "../utils/shared.js";
import { displayProduct } from "../utils/cart-controller.js";
import { addProductToCart } from "../utils/cart-controller.js";
import { removeProductFromCart } from "../utils/cart-controller.js";
import { getProductInCart } from "../utils/helper.js";
import { isProductInCart } from "../utils/helper.js";
import { hamburgerHTML } from "../components/loadComponents/header/hamburgerItem.js";
import { navigationHTML } from "../components/loadComponents/header/navigationItem.js";
import { cartCountHTML } from "../components/loadComponents/header/cartCountItem.js";
import { footerHTML } from "../components/loadComponents/footer/footerItem.js";
import { productsData } from "../utils/productsStore.js";
import { renderProducts } from "../components/render.js";
import { decreaseCartQuantity } from "../utils/cart-controller.js";
import { increaseCartQuantity } from "../utils/cart-controller.js";
import { runCartActionsConfirmation } from "../utils/toast/notify.js";
import {
  ShowQuantityControlButtons,
  showAddToCartButton,
} from "../utils/toggler.js";

const headerBar = document.getElementById("header-bar");
const footer = document.getElementById("footer");

headerBar.insertAdjacentHTML("beforeEnd", cartCountHTML());
headerBar.insertAdjacentHTML("beforeEnd", hamburgerHTML());
headerBar.insertAdjacentHTML(
  "beforeEnd",
  navigationHTML("#products", "./about.html", "./contact.html"),
);

footer.innerHTML = footerHTML("#products", "./about.html", "./contact.html");

const cartCount = document.getElementById("cart-count");
const hamburgerButton = document.getElementById("hamburger-btn");
const cartButton = document.getElementById("cart-btn");
const dropDownMenu = document.getElementById("drop-menu");
const products = document.getElementById("product-list");
const searchInput = document.getElementById("search-input");
const catBtns = document.querySelectorAll(".cat-btn");
const searchSticky = document.querySelector(".search-sticky");
// if category buttons were removed, avoid errors by providing a default
if (!catBtns || catBtns.length === 0) {
  // create a virtual 'all' active category so filtering code can still work
  // some code paths expect `.cat-btn.active` to exist; create a lightweight stub
  const stub = document.createElement("button");
  stub.className = "cat-btn active";
  stub.dataset.category = "all";
  // do not insert into DOM, only querySelector will find it if needed by code that checks document
}

const imagePath = "../images/";

// currentView holds the array currently displayed (after filters/sorts)
let currentView = productsData.slice();

renderProducts(currentView, imagePath, products, currentView.length);

let lastScrollY = window.scrollY;
let isTicking = false;
window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (!isTicking) {
    if (currentScrollY > lastScrollY && currentScrollY > 700) {
      searchSticky.classList.add("search-sticky-hidden");
    } else {
      searchSticky.classList.remove("search-sticky-hidden");
    }
    isTicking = true;
  } else {
    lastScrollY = currentScrollY;
    isTicking = false;
  }
});

function filterProductsByCategory(cat) {
  if (!cat || cat === null) return;

  if (cat === "all") {
    const filterAll = productsData.filter((product) =>
      product.name.toLowerCase().includes(searchInput.value.toLowerCase()),
    );
    currentView = filterAll;
    products.innerHTML = "";
    renderProducts(currentView, imagePath, products, currentView.length);
  } else {
    const filteredProducts = productsData.filter(
      (product) =>
        product.category === cat &&
        product.name.toLowerCase().includes(searchInput.value.toLowerCase()),
    );
    if (filteredProducts.length === 0) {
      products.innerHTML =
        "<p class='text-center text-gray-500'>OOops! No products found.</p>";
      return;
    }
    currentView = filteredProducts;
    products.innerHTML = ""; // Clear previous products before rendering filtered ones
    renderProducts(currentView, imagePath, products, currentView.length);
  }
}

// Filter by price range (min inclusive, max exclusive if provided)
function filterByPrice(min, max) {
  const activeBtn = document.querySelector(".cat-btn.active");
  const activeCat = activeBtn ? activeBtn.dataset.category : "all";
  const searchTerm = searchInput.value.trim().toLowerCase();

  const results = productsData.filter((product) => {
    const withinCategory =
      activeCat === "all" ? true : product.category === activeCat;
    const withinSearch = product.name.toLowerCase().includes(searchTerm);
    const priceOk = (() => {
      const price = Number(product.price) || 0;
      if (max === "" || max === null || max === undefined)
        return price >= Number(min);
      return price >= Number(min) && price <= Number(max);
    })();
    return withinCategory && withinSearch && priceOk;
  });

  if (results.length === 0) {
    products.innerHTML =
      "<p class='text-center text-gray-500'>OOops! No products found.</p>";
    currentView = [];
    return;
  }
  currentView = results;
  products.innerHTML = "";
  renderProducts(currentView, imagePath, products, currentView.length);
}

// Sort currentView according to option
function sortProducts(option) {
  if (!currentView || currentView.length === 0) return;
  const copy = currentView.slice();
  if (option === "price-asc") {
    copy.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (option === "price-desc") {
    copy.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (option === "newest") {
    // If products have an id or created date, use that; fallback to id desc
    copy.sort((a, b) => Number(b.id) - Number(a.id));
  }
  currentView = copy;
  products.innerHTML = "";
  renderProducts(currentView, imagePath, products, currentView.length);
}

// expose for external calls/testing
window.filterByPrice = filterByPrice;
window.sortProducts = sortProducts;

searchInput.addEventListener("input", (event) => {
  const searchTerm = event.target.value;
  const activeBtn = document.querySelector(".cat-btn.active");
  const activeCat = activeBtn ? activeBtn.dataset.category : "all";
  setTimeout(() => {
    if (activeCat === "all") {
      const searchResults = productsData.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      if (searchResults.length === 0) {
        products.innerHTML =
          "<p class='text-center text-gray-500'>OOops! No products found.</p>";
        return;
      }
      products.innerHTML = "";
      renderProducts(searchResults, imagePath, products, searchResults.length);
    } else {
      const searchResults = productsData.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          product.category === activeCat,
      );
      if (searchResults.length === 0) {
        products.innerHTML =
          "<p class='text-center text-gray-500'>OOops! No products found.</p>";
        return;
      }
      products.innerHTML = "";
      renderProducts(searchResults, imagePath, products, searchResults.length);
    }
  }, 300); // Debounce the search input by 300ms
});

let prevCat = "all";
catBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    if (prevCat !== category) {
      document
        .querySelector(`[data-category="${prevCat}"]`)
        .classList.remove("active");
      btn.classList.add("active");
      const filtered = filterProductsByCategory(category);
      prevCat = category;
    }
  });
});

// Toolbar interactions
const sortSelect = document.getElementById("sort-by");
const filterBtn = document.getElementById("filter-btn");
const filterMenu = document.getElementById("filter-menu");

if (sortSelect) {
  sortSelect.addEventListener("change", (e) => {
    sortProducts(e.target.value);
  });
}

if (filterBtn && filterMenu) {
  filterBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = filterMenu.classList.toggle("open");
    filterBtn.setAttribute("aria-expanded", String(open));
  });

  document.addEventListener("click", (ev) => {
    if (!filterMenu.contains(ev.target) && ev.target !== filterBtn) {
      filterMenu.classList.remove("open");
      filterBtn.setAttribute("aria-expanded", "false");
    }
  });

  filterMenu.addEventListener("click", (ev) => {
    const groupToggle = ev.target.closest(".group-toggle");
    if (groupToggle) {
      ev.stopPropagation();
      const parent = groupToggle.closest(".filter-group");
      if (parent) parent.classList.toggle("expanded");
      return;
    }

    const priceItem = ev.target.closest(".price-range");
    const catItem = ev.target.closest(".category-item");
    const clearBtn = ev.target.closest("#clear-filters");

    if (priceItem) {
      const min = priceItem.dataset.min;
      const max = priceItem.dataset.max;
      filterByPrice(min, max);
      filterMenu.classList.remove("open");
      filterBtn.setAttribute("aria-expanded", "false");
      return;
    }

    if (catItem) {
      const cat = catItem.dataset.category;
      const btn = document.querySelector(`.cat-btn[data-category="${cat}"]`);
      if (btn) btn.click();
      filterMenu.classList.remove("open");
      filterBtn.setAttribute("aria-expanded", "false");
      return;
    }

    if (clearBtn) {
      const active = document.querySelector(".cat-btn.active");
      if (active) active.classList.remove("active");
      const allBtn = document.querySelector('.cat-btn[data-category="all"]');
      if (allBtn) allBtn.classList.add("active");
      prevCat = "all";
      searchInput.value = "";
      currentView = productsData.slice();
      products.innerHTML = "";
      renderProducts(currentView, imagePath, products, currentView.length);
      filterMenu.classList.remove("open");
      filterBtn.setAttribute("aria-expanded", "false");
    }
  });

  const toggles = filterMenu.querySelectorAll(".group-toggle");
  toggles.forEach((g) => {
    g.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const parent = g.closest(".filter-group");
        if (parent) parent.classList.toggle("expanded");
      }
    });
  });
}

cartButton.addEventListener("click", () => {
  window.location.href = "carts.html";
});
const carts = savedCarts();

const toastMsg = "Cart updated successfully!";

//Set quantity control for all products already in cart when page reloads
window.addEventListener("pageshow", (event) => {
  const carts = savedCarts();
  products.querySelectorAll(".product-card").forEach((card) => {
    const cardId = parseInt(card.id.split("-")[1], 10);
    const cart = getProductInCart(carts, cardId);
    if (isProductInCart(cardId, carts)) {
      const quantityControlsBtn = card.querySelector(".quantity-control-btns");
      const addToCartBtn = card.querySelector(".add-cart-btn");
      ShowQuantityControlButtons(quantityControlsBtn, addToCartBtn);
      card.querySelector(".quantity-display").textContent = cart.quantity;
    }
  });
  displayCartsCount(cartCount, carts);
});

products.addEventListener("click", (event) => {
  const card = event.target.closest(".product-card");
  if (!card || card === null) return;
  const cardId = parseInt(card.id.split("-")[1], 10);
  const cart = getProductInCart(carts, cardId);

  // Wishlist toggle handling (short-circuit other button handlers)
  const wishBtn = event.target.closest(".wishlist-btn, .wishlist-inline-btn");
  if (wishBtn) {
    try {
      const wishlist = savedWishlist();
      const idx = wishlist.indexOf(cardId);
      let active;
      if (idx === -1) {
        wishlist.push(cardId);
        active = true;
      } else {
        wishlist.splice(idx, 1);
        active = false;
      }
      saveWishlist(wishlist);
      wishBtn.setAttribute("aria-pressed", active ? "true" : "false");
      if (active) wishBtn.classList.add("saved");
      else wishBtn.classList.remove("saved");
    } catch (e) {
      // ignore storage errors
    }
    return;
  }

  if (event.target.tagName !== "BUTTON") {
    displayProduct(card, "product.html");
    return;
  }

  const quantityControlsBtn = card.querySelector(".quantity-control-btns");
  const addToCartBtn = card.querySelector(".add-cart-btn");

  if (event.target.classList.contains("decrease-btn")) {
    if (cart.quantity === 1) {
      removeProductFromCart(cardId, carts);
      showAddToCartButton(quantityControlsBtn, addToCartBtn);
      runCartActionsConfirmation(toastMsg, carts, cartCount);
    } else {
      decreaseCartQuantity(cardId, carts);
      card.querySelector(".quantity-display").textContent = cart.quantity;
      runCartActionsConfirmation(toastMsg, carts, cartCount);
    }
    return;
  }

  if (event.target.classList.contains("increase-btn")) {
    increaseCartQuantity(cardId, carts);
    card.querySelector(".quantity-display").textContent = cart.quantity;
    runCartActionsConfirmation(toastMsg, carts, cartCount);
    return;
  }

  addProductToCart(card, carts);
  displayCartsCount(cartCount, carts);
  ShowQuantityControlButtons(quantityControlsBtn, addToCartBtn);
});

displayCartsCount(cartCount, carts);
hamburgerButton.addEventListener("click", () => {
  toggleDropdownMenu(dropDownMenu);
});
