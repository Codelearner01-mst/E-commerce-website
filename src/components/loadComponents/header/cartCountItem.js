export function cartCountHTML() {
  return ` <div
        id="cart-btn"
        role="button"
        class="relative sm:right-7 md:right-0 inline-block mr-8"
      >
        <i class="fa fa-shopping-cart"></i>
        <span
          id="cart-count"
          class="absolute flex items-center justify-center -top-2 -right-3 text-black text-[12px] font-bold min-w-5 min-h-5"
          >0</span
        >
      </div>`;
}
