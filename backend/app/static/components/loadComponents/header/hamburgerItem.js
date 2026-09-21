export function hamburgerHTML() {
  return `
    <button
      id="hamburger-btn"
      aria-label="Open menu"
      class="absolute right-4 sm:right-6 flex flex-col justify-center gap-[5px]
             p-2 md:hidden hover:opacity-60 transition-opacity duration-200"
    >
      <span class="block w-5 h-px bg-gray-900 transition-all duration-300"></span>
      <span class="block w-7 h-px bg-gray-900 transition-all duration-300"></span>
      <span class="block w-5 h-px bg-gray-900 transition-all duration-300"></span>
    </button>`;
}
