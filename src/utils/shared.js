export function cartsCounter(carts) {
  if (!carts) {
    return;
  }

  let cartsCount = 0;
  for (const c of carts) {
    cartsCount += c.quantity;
  }
  return cartsCount;
}

export function displayCartsCount(element, count) {
  if (!element) {
    return;
  }
  element.textContent = count;
}

export function toggleDropdownMenu(button, dropdown) {
  button.addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
  });
}

export function ShowSucessMessage(ele) {
  if (!ele) {
    return;
  }
  setTimeout(() => {
    ele.classList.remove("opacity-0", "pointer-events-none", "-translate-y-2");
    ele.classList.add("translate-y-0", "opacity-100");
  }, 10);

  setTimeout(() => {
    ele.classList.replace("opacity-100", "opacity-0");
    ele.classList.replace("translate-y-0", "-translate-y-2");
    ele.classList.add("pointer-events-none");
  }, 2000);
}
