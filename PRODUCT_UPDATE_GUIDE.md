# Product update guide

Stillform is a front-end demonstration store. The catalogue is data-driven: product names, prices, imagery, tags, specifications, collections, finder matching and featured selections come from `src/data/`.

## Replace or change the catalogue

Give your coding assistant a scoped request such as:

> Replace the products in `src/data/products.json` with 10 gaming accessories for a black and neon collection. Update product names, short and full descriptions, prices in USD, categories, collection names, image paths, alt text, variants where relevant, specifications, tags, featured and availability flags, and related product IDs. Update `src/data/collections.json` to match. Keep product IDs unique and stable. Preserve the existing React components, routes, cart, finder, builder, and visual design. Do not add real reviews or unsupported product claims. Keep this as a demonstration store without payment or supplier integrations.

Ask the assistant to modify JSON first. Components should only need changes when adding a genuinely new product field or interaction.

## Product data shape

Each entry in `products.json` has an `id`, `name`, `subtitle`, `price` (number, USD), `category`, `collection`, `image`, `alt`, `tone`, `tags`, `featured`, `available`, `specs`, `details`, and `related` IDs. Product images are configured centrally on each object through its `image` path/URL; use local assets under `public/images/` for a fully self-hosted catalogue and update the path to `/images/filename.webp`. Keep useful alt text. Specifications should only list facts that have been established; the product page renders only provided specifications.

The product grid and detail page, related products, home featured selection, collection references, setup finder, 3D scene links and builder read the shared catalogue. Avoid copying product names, prices or product-specific facts into components. If removing products, repair collection `productIds` and each product's `related` references.

## Collections and niche changes

`collections.json` defines collection IDs, titles, descriptions and product IDs. IDs are used in collection routes (`/collection/:id`), so keep them URL-safe. For a new niche, replace products and collections together, then review the need-based links and inspiration imagery in `src/App.jsx` so the story and visual material match. `store.config.json` contains the brand name, tagline, demo notice, currency, accent and hero image. The design system lives in `src/style.css`; catalogue refreshes should not require changing it unless the requested visual identity also changes.

## Images

Put owned or licensed local product imagery in `public/images/`, preferably optimized WebP/AVIF at a size appropriate to its use. Point the product `image` field at `/images/...`; update `alt` at the same time. Replace the `heroImage` in `store.config.json` when changing the hero visual. Do not use supplier images unless permitted for the intended use. Remote image URLs in the starter catalogue are illustrative placeholders and require connectivity.

## Guardrails

- Keep `id` values unique and stable; related product values must refer to existing IDs.
- Prices are numeric USD values, without `$` symbols in JSON.
- Finder recommendations use `tags` plus selected purpose, budget and aesthetic. Keep tags aligned with the finder's current choices (`work`, `study`, `gaming`; `minimal`, `modern`, `dark`; and needs such as `clean desk` or `productivity`). Update the predefined matching logic if the choices change.
- Only mark items `featured` when they should appear in the home edit. The current interface shows up to three.
- Do not add fabricated reviews, testimonials, supplier claims, shipping promises, or live checkout behavior.
- Validate JSON and run `npm run build` after edits. No API key or embedded AI service is needed for catalogue updates.

## Prototype boundaries

The cart is stored in browser LocalStorage. Checkout is a demonstration message and no payment details are requested. Products and prices are illustrative. Keep those boundaries clear until real business operations are intentionally added.
