E-commerce-website

Overview

This small e-commerce frontend demonstrates a minimal cart flow using vanilla
JavaScript and Tailwind CSS. The project was reorganized into a simple
component structure:

- src/pages/ - top-level pages and page-specific logic
- src/components/ - UI components (CartItem, render)
- src/utils/ - small utilities for localStorage and shared helpers
- src/styles/ - Tailwind input/output CSS

Data model

Cart item example:

{
id: 1,
name: "Product Name",
price: 9.99,
image: "../images/product.jpg",
quantity: 2
}

How to run

- Install dependencies: `npm install`
- Start Tailwind in watch mode: `npm run dev`
- Open the page in the browser: `src/pages/index.html`

Notes

- Cart state persists in `localStorage` via `saveCarts` / `loadCarts`.
- Components mutate the `carts` array in-place and call `saveCarts` afterwards.
- When matching products/carts, the code compares `id` (primitive) rather than
  object identity to avoid duplicate entries after reload.
