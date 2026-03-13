export function navigationHTML(path) {
  return `
      <!--Mobile nav-->
      <nav
        id="drop-menu"
        class="hidden fixed inset-0 z-50 bg-black/20 backdrop-blur-sm md:hidden transition-all duration-300"
      >
        <div class="bg-white w-64 h-full shadow-2xl p-6 flex flex-col">
          <div class="flex justify-end mb-8">
            <button
              onclick="
                document.getElementById('drop-menu').classList.add('hidden')
              "
              class="text-gray-500 hover:text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <ul class="flex flex-col gap-6 font-sans text-xl font-medium">
            <li
              class="border-b border-gray-100 pb-2 hover:text-blue-600 transition-colors"
            >
              <a href="../../index.html">Home</a>
            </li>
            <li
              class="border-b border-gray-100 pb-2 hover:text-blue-600 transition-colors"
            >
              <a href=${path}>Products</a>
            </li>
            <li
              class="border-b border-gray-100 pb-2 hover:text-blue-600 transition-colors"
            >
              <a href="../../index.html#about">About Us</a>
            </li>
            <li
              class="border-b border-gray-100 pb-2 hover:text-blue-600 transition-colors"
            >
              <a href="../../index.html#contact">Contact</a>
            </li>
          </ul>

          <div class="mt-auto pt-10 text-sm text-gray-400">
            <p>© 2026 Vision Jewelry</p>
          </div>
        </div>
      </nav>

      <!--Desktop nav-->
      <nav class="md:mr-4 lg:mr-3">
        <ul
          class="hidden md:flex flex-row gap-4.5 lg:gap-5 md:text-lg lg:text-xl font font-serif"
        >
          <li class=""><a href="../../index.html">Home</a></li>
          <li class=""><a href=${path}>Products</a></li>
          <li class=""><a href="../../index.html#about">About Us</a></li>
          <li class=""><a href="../../index.html#contact">Contact</a></li>
        </ul>
      </nav>`;
}
