function toastItem(message) {
  const div = document.createElement("div");
  div.className = `toast fixed top-0 left-0 z-[100] transition-all duration-300 ease-in-out bg-gray-900 border-b border-amber-700 w-full shadow-xl opacity-0 -translate-y-full pointer-events-none`;
  div.setAttribute("role", "alert");
  div.setAttribute("aria-live", "polite");
  div.innerHTML = ` <div class="flex items-center justify-between px-4 max-w-7xl mx-auto">
          <button
            class="toast-close-btn text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none p-1"
            aria-label="Close"
          >
            <i class="fa-solid fa-times text-lg"></i>
          </button>
          <p
            class="text-white font-medium text-center py-3.5 text-sm flex items-center justify-center gap-2 tracking-wide flex-1"
          >
            <i class="fa-solid fa-check-circle text-amber-400"></i>
            ${message}
          </p>
          <div class="w-8"></div>
        </div>`;
  return div;
}
export default toastItem;
