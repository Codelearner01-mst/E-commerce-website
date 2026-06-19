/**
 * components/render.js
 * Simple renderer: iterate `carts` and append `CartItem` elements.
 */
import { CartItem } from "./cartItem.js";
import { productHTML } from "./productItem.js";
import { cartsDisplayOnlyItem } from "./cartItem.js";
import { productCardHTML } from "../components/productCard.js";
import { productsData } from "../utils/productsStore.js";

const product = JSON.parse(sessionStorage.getItem("currentProduct"));

export function renderCarts(list, carts) {
  if (!list || !carts) {
    return;
  }

  for (const cart of carts) {
    const cartElement = CartItem(cart, "../images/");
    list.appendChild(cartElement);
  }
}

export function renderProduct(containerEle, path) {
  if (typeof product !== "object" || product === null) {
    return;
  }
  const newSrc = product.image.replace("./src/images/", "");
  product.image = path + newSrc;
  containerEle.appendChild(productHTML(product));
}

export function renderSimilarProducts(container, path) {
  const currentProduct = JSON.parse(sessionStorage.getItem("currentProduct"));
  if (typeof currentProduct !== "object" || currentProduct === null) {
    return;
  }

  // Filter similar products by category, excluding the active product itself
  const similarProducts = productsData.filter(
    (p) => p.category === currentProduct.category && p.id !== currentProduct.id,
  );

  // Fallback to other items if no similar items exist in the same category
  let productsToRender = similarProducts;
  if (productsToRender.length === 0) {
    productsToRender = productsData.filter((p) => p.id !== currentProduct.id);
  }

  // Limit to 4 items max
  productsToRender = productsToRender.slice(0, 4);

  if (productsToRender.length === 0) {
    container.innerHTML = "";
    return;
  }

  let html = `
    <div class="max-w-7xl mx-auto mt-16 pt-12 border-t border-gray-100/80">
      <span class="gold-rule"></span>
      <h2 class="text-2xl md:text-3xl font-serif font-medium text-gray-900 tracking-wide text-center mb-2">
        Similar Creations
      </h2>
      <p class="text-gray-400 text-xs font-light text-center max-w-xl mx-auto mb-10 tracking-wide">
        Exquisite handcrafted pieces you may also appreciate
      </p>
      
      <!-- Horizontal scroll container on mobile, 4-column grid on desktop -->
      <div id="similar-products-list" class="flex overflow-x-auto gap-5 pb-5 md:pb-0 md:grid md:grid-cols-4 scroll-smooth snap-x snap-mandatory no-scrollbar px-4 md:px-0">
  `;

  for (const p of productsToRender) {
    const tempProduct = { ...p };

    // Safe image path resolution
    if (
      !tempProduct.image.startsWith(path) &&
      !tempProduct.image.startsWith("./src/images/") &&
      !tempProduct.image.startsWith("../images/")
    ) {
      tempProduct.image = path + tempProduct.image;
    }

    html += `
      <div class="similar-product-card group cursor-pointer bg-white rounded-lg overflow-hidden border border-gray-100/60 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 flex-shrink-0 w-[190px] md:w-auto snap-start flex flex-col justify-between" id="product-${tempProduct.id}">
        <div class="overflow-hidden aspect-square bg-gray-50/50 relative">
          <img
            src="${tempProduct.image}"
            alt="${tempProduct.name}"
            class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div class="pt-3.5 pb-4 px-3.5 flex flex-col gap-1">
          <span class="text-[9px] uppercase tracking-[0.2em] text-amber-700/70 font-sans font-medium">Vision Jewelry</span>
          <h3 class="text-[13.5px] font-serif font-medium text-gray-900 tracking-wide leading-snug line-clamp-1 group-hover:text-amber-800 transition-colors duration-300">
            ${tempProduct.name}
          </h3>
          <p class="font-sans font-semibold text-sm text-gray-900 tracking-wide mt-0.5">
            $${tempProduct.price}
          </p>
        </div>
      </div>
    `;
  }

  html += `
      </div>
    </div>
  `;

  container.innerHTML = html;
}

export function renderCartsDisplayOnly(carts, list) {
  for (let i = 0; i < carts.length; i++) {
    const cart = carts[i];
    const number = i < 9 ? `0${i + 1}` : i + 1;
    const cartElement = cartsDisplayOnlyItem(cart, number);
    list.appendChild(cartElement);
  }
}

export function renderProducts(products, path, list, number = 4) {
  if (!products || !list || !Array.isArray(products)) {
    return;
  }
  for (let i = 0; i < number; i++) {
    const product = products[i];
    product.image = path + product.image;
    const productCard = productCardHTML(product);
    list.innerHTML += productCard;
  }
}
