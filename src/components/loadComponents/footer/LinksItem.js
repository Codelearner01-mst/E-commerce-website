export function linksHTML(shopPath, aboutPath, contactPath) {
  return `<div>
            <h4 class="text-xs tracking-[0.15em] uppercase mb-4">Quick Links</h4>
            <div class="flex flex-col gap-3 text-sm">
               <a href="${shopPath}" class="hover:text-white transition-colors"
                 >Shop
                 </a>
               <a href="${aboutPath}" class="hover:text-white">About</a>
               <a href="${contactPath}" class="hover:text-white transition-colors"
               >Contact</a>
             </div>
          </div>`;
}
