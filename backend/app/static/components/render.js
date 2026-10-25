import { CartItem, cartsDisplayOnlyItem } from "./cartItem.js";
import { productCardHTML } from "./productCard.js";
import { productHTML } from "./productItem.js";
import { savedWishlist } from "../utils/saveUtils.js";
import { escapeHtml, resolveProductImage } from "../utils/product-format.js";

const IMAGE_MODE = "production";
export function renderCarts(list, carts) {
  if (!list || !Array.isArray(carts)) return;
  list.replaceChildren(...carts.map((cart) => CartItem(cart)));
}

export function renderProduct(container, product) {
  if (!container || !product) return;
  const normalized = {
    ...product,
    image: resolveProductImage(product.image, IMAGE_MODE),
  };
  container.replaceChildren(productHTML(normalized));
}

export function renderSimilarProducts(container, currentProduct, allProducts) {
  if (!container || !currentProduct || !Array.isArray(allProducts)) return;
  let similar = allProducts.filter(
    (product) =>
      product.id !== currentProduct.id &&
      product.category_id === currentProduct.category_id,
  );
  if (!similar.length)
    similar = allProducts.filter((product) => product.id !== currentProduct.id);
  similar = similar.slice(0, 3);
  if (!similar.length) {
    container.replaceChildren();
    return;
  }

  const heading = document.createElement("h2");
  heading.className = "text-2xl md:text-3xl font-serif text-center mb-8";
  heading.textContent = "Similar Creations";
  const grid = document.createElement("div");
  grid.className =
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4";
  grid.innerHTML = similar
    .map(
      (product) => `
    <a class="product-card group bg-white rounded-lg overflow-hidden" id="product-${product.id}" data-product-id="${product.id}" href="/product/${product.id}">
      <div class="product-image-container overflow-hidden">
        <img src="${escapeHtml(resolveProductImage(product.image, IMAGE_MODE))}" alt="${escapeHtml(product.name)}" class="product-image w-full h-[230px] object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
      </div>
      <div class="product-info p-4 px-6">
        <span class="product-label uppercase tracking-[0.18em] text-[10px]">${escapeHtml(product.category || "Vision Jewelry")}</span>
        <h3 class="product-title font-medium">${escapeHtml(product.name)}</h3>
        <p class="font-semibold mt-2">$${Number(product.price).toFixed(2)}</p>
      </div>
    </a>
  `,
    )
    .join("");
  container.replaceChildren(heading, grid);
}

export function renderCartsDisplayOnly(carts, list) {
  if (!list || !Array.isArray(carts)) return;
  list.replaceChildren(
    ...carts.map((cart, index) =>
      cartsDisplayOnlyItem(cart, String(index + 1).padStart(2, "0")),
    ),
  );
}

export function renderProducts(products, list) {
  if (!list || !Array.isArray(products)) return;
  const normalized = products.map((product) => ({
    ...product,
    image: resolveProductImage(product.image, IMAGE_MODE),
  }));
  list.innerHTML = normalized.map(productCardHTML).join("");

  const count = document.getElementById("results-count");
  if (count) count.textContent = String(products.length);

  const wishlist = savedWishlist();
  for (const product of products) {
    const card = document.getElementById(`product-${product.id}`);
    const button = card?.querySelector(".wishlist-btn, .wishlist-inline-btn");
    if (!button) continue;
    const active =
      Array.isArray(wishlist) &&
      wishlist.some(
        (item) =>
          Number(typeof item === "object" ? item.id : item) === product.id,
      );
    button.setAttribute("aria-pressed", String(active));
    button.classList.toggle("saved", active);
  }
}
