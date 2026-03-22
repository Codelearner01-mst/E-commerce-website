import { titleHTML } from "./titleItem.js";
import { linksHTML } from "./LinksItem.js";
import { followUsHTML } from "./followUsItem.js";
import { supportHTML } from "./supportItem.js";
import { authorityHTML } from "./authorityItem.js";
export function footerHTML() {
  return `<div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          ${titleHTML()}
          ${linksHTML()}
          ${supportHTML()}
          ${followUsHTML()}
        </div>
       ${authorityHTML()}
      </div>`;
}
