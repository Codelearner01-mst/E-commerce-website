export function navigationHTML(productsPath = "", aboutPath = "", contactPath = "", wishlistPath = "") {
  // Check if we are currently at the root folder or subpages
  const isRoot = !window.location.pathname.includes("/src/pages/") && !window.location.pathname.includes("/pages/");
  
  // Resolve paths with safe fallbacks based on current page location depth
  const resolvedProductsPath = productsPath || (isRoot ? "./src/pages/shop.html" : "./shop.html");
  const resolvedAboutPath = aboutPath || (isRoot ? "./src/pages/about.html" : "./about.html");
  const resolvedContactPath = contactPath || (isRoot ? "./src/pages/contact.html" : "./contact.html");
  const resolvedWishlistPath = wishlistPath || (isRoot ? "./src/pages/wishlist.html" : "./wishlist.html");
  const homeHref = isRoot ? "./index.html" : "../../index.html";

  return `
    <!-- Mobile Drawer -->
    <nav
      id="drop-menu"
      class="hidden fixed inset-0 z-50 md:hidden"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onclick="document.getElementById('drop-menu').classList.add('hidden')"
      ></div>

      <!-- Panel -->
      <div class="absolute right-0 top-0 h-full w-72 bg-white shadow-2xl flex flex-col">

        <!-- Panel header -->
        <div class="flex justify-between items-center px-8 py-7 border-b border-gray-100">
          <span class="font-serif tracking-[0.2em] uppercase text-gray-900 text-lg">Menu</span>
          <button
            onclick="document.getElementById('drop-menu').classList.add('hidden')"
            class="text-gray-400 hover:text-gray-900 transition-colors"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Links -->
        <ul class="flex flex-col px-8 py-8 gap-0 font-serif text-lg text-gray-900">
          <li class="border-b border-gray-100 py-4">
            <a href="${homeHref}"
               class="flex justify-between items-center hover:text-amber-800 transition-colors duration-200 tracking-wide">
              Home
              <span class="text-gray-300 text-sm">→</span>
            </a>
          </li>
          <li class="border-b border-gray-100 py-4">
            <a href="${resolvedProductsPath}"
               class="flex justify-between items-center hover:text-amber-800 transition-colors duration-200 tracking-wide">
              Products
              <span class="text-gray-300 text-sm">→</span>
            </a>
          </li>
          <li class="border-b border-gray-100 py-4">
            <a href="${resolvedWishlistPath}"
               class="flex justify-between items-center hover:text-amber-800 transition-colors duration-200 tracking-wide">
              Wishlist
              <span class="text-gray-300 text-sm">→</span>
            </a>
          </li>
          <li class="border-b border-gray-100 py-4">
            <a href="${resolvedAboutPath}"
               class="flex justify-between items-center hover:text-amber-800 transition-colors duration-200 tracking-wide">
              About Us
              <span class="text-gray-300 text-sm">→</span>
            </a>
          </li>
          <li class="py-4">
            <a href="${resolvedContactPath}"
               class="flex justify-between items-center hover:text-amber-800 transition-colors duration-200 tracking-wide">
              Contact
              <span class="text-gray-300 text-sm">→</span>
            </a>
          </li>
        </ul>

        <div class="mt-auto px-8 pb-8 text-xs text-gray-300 tracking-[0.15em] uppercase">
          © 2026 Vision Jewelry
        </div>
      </div>
    </nav>

    <!-- Desktop Nav -->
    <nav class="md:mr-2 lg:mr-4">
      <ul class="hidden md:flex flex-row gap-7 lg:gap-9 items-center">
        <li><a href="${homeHref}" class="nav-link">Home</a></li>
        <li><a href="${resolvedProductsPath}" class="nav-link">Products</a></li>
        <li><a href="${resolvedWishlistPath}" class="nav-link">Wishlist</a></li>
        <li><a href="${resolvedAboutPath}" class="nav-link">About</a></li>
        <li><a href="${resolvedContactPath}" class="nav-link">Contact</a></li>
      </ul>
    </nav>`;
}
