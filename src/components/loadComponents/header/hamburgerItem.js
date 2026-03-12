export function hamburgerHTML() {
  return `<button
    id="hamburger-btn"
        class="absolute right-4 sm:right-6 flex flex-col gap-1.5 p-2 md:hidden hover:opacity-70 transition-opacity"
      >
        <span class="block w-6 h-0.5 bg-black"></span>
        <span class="block w-6 h-0.5 bg-black"></span>
        <span class="block w-6 h-0.5 bg-black"></span>
      </button>
`;
}
