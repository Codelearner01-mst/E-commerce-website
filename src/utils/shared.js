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

export function ShowSucessMessage(ele, bool = true) {
  if (!ele) {
    return;
  }

  //User click on add-to-cart. success message pop up in 1second
  //pop up fade out smoothly in 20seconds
  //Restart pop up message when add-to-cart button is clicked and previous message not fade out

  let isButtonClickedBeforeFadeOut = bool;
  console.log("Initial clicked", isButtonClickedBeforeFadeOut);

  if (isButtonClickedBeforeFadeOut) {
    setTimeout(() => {
      ele.classList.add("opacity-0", "pointer-events-none", "-translate-y-2");
      ele.classList.remove("translate-y-0", "opacity-100");
    }, 300);

    setTimeout(() => {
      ele.classList.remove(
        "opacity-0",
        "pointer-events-none",
        "-translate-y-2",
      );
      ele.classList.add("translate-y-0", "opacity-100");
    }, 1000);
  }

  setTimeout(() => {
    ele.classList.replace("opacity-100", "opacity-0");
    ele.classList.replace("translate-y-0", "-translate-y-2");
    ele.classList.add("pointer-events-none");
  }, 3000);
  ele.addEventListener("transitionend", () => {
    if (ele.classList.contains("opacity-0")) {
      isButtonClickedBeforeFadeOut = false;
    }
  });
}
