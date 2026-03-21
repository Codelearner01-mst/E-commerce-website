export function quantityControlItem() {
  return `<div class="flex items-center bg-white border border-yellow-700 rounded-sm w-max h-9 overflow-hidden shadow-sm">
            <button class="decrease-btn w-9 h-full flex items-center justify-center text-yellow-800 bg-transparent hover:bg-yellow-800 hover:text-white transition-colors duration-300 text-xl font-light focus:outline-none cursor-pointer">&#8722;</button>
            <span class="quantity-display flex-1 px-4 font-serif text-gray-900 text-base min-w-[3rem] text-center select-none border-x border-yellow-700/30 h-full flex items-center justify-center">1</span>
            <button class="increase-btn w-9 h-full flex items-center justify-center text-yellow-800 bg-transparent hover:bg-yellow-800 hover:text-white transition-colors duration-300 text-xl font-light focus:outline-none cursor-pointer">&#43;</button>
         </div>`;
}
