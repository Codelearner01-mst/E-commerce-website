import { saveCarts } from "./saveUtils.js";
import toastItem from "../components/toastItem.js";

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

export function ShowSucessMessage(message) {
  const toast = toastItem(message);

  if (toast.hideTimeout) {
    clearTimeout(ele.hideTimeout);
  }

  const closeBtn = toast.querySelector(".toast-close-btn");
  if (closeBtn) {
    closeBtn.onclick = () => {
      if (toast.hideTimeout) {
        clearTimeout(toast.hideTimeout);
        toast.hideTimeout = null;
      }
      toast.classList.remove("opacity-100", "translate-y-0");
      toast.classList.add(
        "opacity-0",
        "-translate-y-full",
        "pointer-events-none",
      );
    };
  }

  // To make it fade out immediately before fading in again, we disable transition
  // and force it to its hidden state.
  toast.classList.add("transition-none");
  toast.classList.remove("opacity-100", "translate-y-0");
  toast.classList.add(
    "opacity-0",
    "-translate-y-full",
    "-translate-y-4",
    "-translate-y-2",
    "pointer-events-none",
  );

  // Force a browser reflow to apply the hidden state instantly
  void toast.offsetWidth;

  // Re-enable transition for the fade-in effect
  toast.classList.remove("transition-none");

  // Show the toast smoothly by adding visible classes
  toast.classList.remove(
    "opacity-0",
    "pointer-events-none",
    "-translate-y-full",
    "-translate-y-4",
    "-translate-y-2",
  );
  toast.classList.add("opacity-100", "translate-y-0");

  // Hide the toast after 4 seconds to feel snappy but give enough time to read
  toast.hideTimeout = setTimeout(() => {
    toast.classList.remove("opacity-100", "translate-y-0");
    toast.classList.add(
      "opacity-0",
      "-translate-y-full",
      "pointer-events-none",
    );
  }, 4000);
}
