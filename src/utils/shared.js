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

export function decreaseQuantityControl(cart, ele) {
  if (cart.quantity > 1) {
    cart.quantity -= 1;
    ele.textContent = cart.quantity;
  }
}

export function increaseQuantityControl(cart, ele) {
  cart.quantity += 1;
  ele.textContent = cart.quantity;
}

/* -Get all products in the html
   -Get the id of each product in the html
   -Check if poduct is in carts by comparing ids
   -If product in carts, change the 'add to cart' button to quantity control button
*/
export function setQuantityControlUi(products, carts) {
  if (!products || products === null || !Array.isArray(carts)) {
    return;
  }
  products.querySelectorAll(".product-card").forEach((card) => {
    const cardId = parseInt(card.id.split("-")[1], 10);

    if (carts.some((cart) => cart.id === cardId)) {
      card.querySelector(".quantity-control").innerHTML =
        ` <div class="flex gap-6">
          <button class="text-gray-400 decrease-btn">&#10094;</button>
          <span class="quantity-display">1</span>
        <button class="text-gray-400 increase-btn">&#10095;</button>
      </div>`;
    }
  });
}

export function ShowSucessMessage(ele, bool = true) {
  if (!ele || ele === null) {
    return;
  }
  //User click on add-to-cart. success message pop up in 1second
  //pop up fade out smoothly in 20seconds
  //Restart pop up message when add-to-cart button is clicked and previous message not fade out

  let isButtonClickedBeforeFadeOut = bool;

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
