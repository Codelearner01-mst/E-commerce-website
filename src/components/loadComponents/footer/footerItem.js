import { titleHTML } from "./titleItem.js";
import { linksHTML } from "./LinksItem.js";
import { followUsHTML } from "./followUsItem.js";
import { supportHTML } from "./supportItem.js";

export function footerHTML() {
  return `<div
             class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10" >
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          ${titleHTML()}
          ${linksHTML()}
          ${supportHTML()}
          ${followUsHTML()}
        </div>
      <p class="text-xs tracking-[0.1em] text-gray-600 md:self-end">
          © 2026 Vision Jewelry. All rights reserved.
        </p>
      </div>`;
}
