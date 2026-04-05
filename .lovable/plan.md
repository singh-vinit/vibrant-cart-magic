

# SuperK — Revised Plan

## Overview
Build a vibrant, mobile-first multi-category ecommerce site with React + Vite + Tailwind + shadcn/ui. Voice search will call OpenAI Whisper directly from the browser.

## Theme
- Primary: `#F43397`, Secondary: `#7B2FF7`, Accent: `#FFD700`
- Background: white + `#FAF5FF` section breaks
- Font: Inter, gradient CTAs

## Pages

### Homepage (`/`)
- Sticky Navbar: "SuperK" gradient logo, search bar + mic button, cart icon with Badge
- Hero: 3-slide auto-carousel (4s interval, dot indicators)
- Category Row: horizontal scroll, circular icon cards
- Trending Now: horizontal scrollable ProductCards
- Top Deals: 4-col grid (2 mobile) with CountdownTimer badges
- Shop by Budget: tile cards (Under ₹99/199/499/999)
- Footer: 3-column links

### Product Listing (`/products`)
- Desktop: sidebar filters + 3-col grid; Mobile: Sheet filters + 2-col grid
- Filters: category, price slider, brand, rating, discount
- Sort bar, pagination, removable filter Badges

## Voice Search (Direct Browser Call)
- Click mic → `getUserMedia` → `MediaRecorder` captures audio
- Convert to Blob → FormData → POST directly to `https://api.openai.com/v1/audio/transcriptions` with the API key
- User provides their OpenAI key via a settings input stored in `localStorage`
- States: idle → listening (red pulse) → processing (spinner) → success/error
- Toast notifications for all error cases

**Security note**: API key will be visible in browser network requests. This is acceptable per user's choice for a static demo site.

## Data
- `lib/products.ts`: 24 hardcoded products across 6 categories with exact data from spec

## Components
`Navbar`, `VoiceSearchButton`, `HeroBanner`, `CategoryRow`, `ProductCard`, `ProductGrid`, `FilterSidebar`, `FilterSheet`, `SortBar`, `CountdownTimer`, `Footer`

## Polish
- Skeleton loaders (1.2s delay) on product grid
- Card hover: scale-105 + shadow-xl transition
- Floating "Back to Top" button (after 300px scroll)
- Smooth carousel transitions

## File Structure
```text
src/
  lib/products.ts
  pages/Index.tsx          (homepage)
  pages/Products.tsx       (listing page)
  components/
    Navbar.tsx
    VoiceSearchButton.tsx
    HeroBanner.tsx
    CategoryRow.tsx
    ProductCard.tsx
    ProductGrid.tsx
    FilterSidebar.tsx
    FilterSheet.tsx
    SortBar.tsx
    CountdownTimer.tsx
    Footer.tsx
```

## Technical Notes
- React Router for `/` and `/products` routes
- Cart state via React context (add to cart, count badge)
- Voice search calls Whisper API directly from browser with user-provided key
- All images use `<img>` tags with provided URLs
- Tailwind custom colors added to `tailwind.config.ts`

