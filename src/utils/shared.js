import { saveCarts } from "./saveUtils.js";
import { increaseQuantity } from "./quantityUpdater.js";
import { decreaseQuantity } from "./quantityUpdater.js";
import { quantityControlItem } from "../components/quantityControlItem.js";

export function cartsCounter(carts) {
  if (!carts || !Array.isArray(carts)) {
    return 0;
  }

  let cartsCount = 0;
  for (const c of carts) {
    cartsCount += c.quantity;
  }
  return cartsCount;
}

export function displayCartsCount(ele, carts) {
  if (!ele || ele === null) {
    return;
  }
  const count = cartsCounter(carts);
  ele.textContent = count;
}

export function toggleDropdownMenu(dropdown) {
  if (dropdown === null) {
    return;
  }
  dropdown.classList.toggle("hidden");
}

//Set the quantity UI and control for product
export function setProductQuantityControl(ele, cart, carts, msgEle, countEle) {
  if (!Array.isArray(carts)) {
    return;
  }
  ele.innerHTML = quantityControlItem(cart);
  const quantityDisplay = ele.querySelector(".quantity-display");
  ele.querySelector(".increase-btn").addEventListener("click", () => {
    increaseQuantity(cart, quantityDisplay);
    saveCarts(carts);
    ShowSucessMessage(msgEle, true);
    displayCartsCount(countEle, carts);
  });
  ele.querySelector(".decrease-btn").addEventListener("click", () => {
    decreaseQuantity(cart, quantityDisplay);
    saveCarts(carts);
    ShowSucessMessage(msgEle, true);
    displayCartsCount(countEle, carts);
  });
}

export function ShowSucessMessage(ele, bool = true) {
  if (!ele || ele === null) {
    return;
  }

  if (ele.hideTimeout) {
    clearTimeout(ele.hideTimeout);
  }

  // To make it fade out immediately before fading in again, we disable transition
  // and force it to its hidden state.
  ele.classList.add("transition-none");
  ele.classList.remove("opacity-100", "translate-y-0");
  ele.classList.add(
    "opacity-0",
    "-translate-y-full",
    "-translate-y-4",
    "-translate-y-2",
    "pointer-events-none",
  );

  // Force a browser reflow to apply the hidden state instantly
  void ele.offsetWidth;

  // Re-enable transition for the fade-in effect
  ele.classList.remove("transition-none");

  // Show the toast smoothly by adding visible classes
  ele.classList.remove(
    "opacity-0",
    "pointer-events-none",
    "-translate-y-full",
    "-translate-y-4",
    "-translate-y-2",
  );
  ele.classList.add("opacity-100", "translate-y-0");

  // Hide the toast after 4 seconds to feel snappy but give enough time to read
  ele.hideTimeout = setTimeout(() => {
    ele.classList.remove("opacity-100", "translate-y-0");
    ele.classList.add("opacity-0", "-translate-y-full", "pointer-events-none");
  }, 4000);
}
