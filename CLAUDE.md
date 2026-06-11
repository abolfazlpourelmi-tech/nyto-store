# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server at http://localhost:3000
npm run build     # production build (also type-checks)
npm run lint      # ESLint via next lint
```

There are no tests. TypeScript errors surface through `npm run build`.

## Tech Stack

- **Next.js 14 App Router** — pages in `app/`, server components by default
- **TypeScript** — strict mode; Persian object keys must be quoted (`"پردازنده": "value"`)
- **Tailwind CSS** — `darkMode: "media"`, custom tokens via `hsl(var(--token))`
- **shadcn/ui style** — hand-written primitives in `components/ui/` (not CLI-generated)
- **Zustand + persist** — cart in `store/cart.ts`, localStorage key `"nyto-cart"`

## Font

`@fontsource/vazirmatn` installed as npm package. Weights 400/500/700/800 imported in `app/layout.tsx`:
```ts
import "@fontsource/vazirmatn/400.css";
// ...800.css
```
`tailwind.config.ts` sets `fontFamily.sans` and `fontFamily.persian` to `"Vazirmatn"`. Applied globally via `font-persian` on `<body>` and `font-family` on form elements in `globals.css`.

## Design System

- **Primary color**: `#FF6B00` (orange) — CSS var `--primary: 25 100% 50%`
- **Theme**: auto dark/light via `prefers-color-scheme` in `globals.css`, no JS class toggling
- **`--surface`** token sits between `--background` and `--card` (used for image placeholder backgrounds)
- All shadows defined in `tailwind.config.ts` as `shadow-card`, `shadow-card-lg`, `shadow-primary`

## RTL Layout

`<html lang="fa" dir="rtl">` in `app/layout.tsx`. Tailwind flex utilities can be overridden by RTL cascade, so **critical horizontal layout containers use inline `style` props** with explicit `flexDirection: "row"` and `flexWrap: "nowrap"` rather than Tailwind classes. Countdown timers and digit sequences need `dir="ltr"` on their container.

## Page Layout (`app/layout.tsx`)

```
AnnouncementBar  ← dismissable promo bar
Header
<main pb-20 md:pb-0>   ← pb-20 clears fixed bottom nav on mobile
  {children}
Footer          ← hidden md:block (desktop only)
BottomNav       ← md:hidden (mobile only)
Toaster
```

## Key Components

### `components/layout/AnnouncementBar.tsx`
Configurable top promo bar. Config lives in **`lib/announcement-config.ts`** — edit that file to change text, colors, link, or switch between `type: "text"` and `type: "image"`. Dismissable via X button (React state only, no localStorage).

### `components/layout/Header.tsx`
Desktop: AnnouncementBar → main row (logo | search 440px max | bell + login) → nav row (دسته‌بندی mega-menu + links).
- Notification bell opens a 310px dropdown with mock notifications
- `"دسته‌بندی کالاها"` triggers a full-width mega-menu on hover; uses `useRef` timer (180ms grace period) so mouse can travel from button to panel without it closing
- Login is a minimal outlined pill: `hidden md:flex`

### `components/home/FeaturedProducts.tsx`
Orange header with live countdown timer. Timer `dir="ltr"` to render digits L→R.

### `components/home/ProductRow.tsx`
Horizontal scroll section. Props: `title`, `products`, `viewAllHref`, `accentColor` (hex for the accent bar), `badge: CardBadge`. Used for all 4 filtered rows on the home page.

### `components/product/ScrollCard.tsx`
**Fixed-dimension card used in horizontal scroll rows. All dimensions are explicit pixels (responsive via `md:` Tailwind classes) — do not change to flex/auto.**

```
                mobile      md+
Card:           162×320px   210×410px
Image:          148px       190px      (flexShrink 0)
Title:          38px        48px       (overflow hidden, line-clamp 2) — NOT flex:1
Price block:    32px        42px       — old-price ALWAYS rendered, visibility:hidden if absent
Spacer:         flex:1 — pushes button to bottom
Button:         flexShrink 0, soft outlined style
```

Width/height/font-size/padding that differ per breakpoint live in `className` (e.g. `w-[162px] md:w-[210px]`) since inline `style` would override Tailwind. `MiniCard` in `FeaturedProducts.tsx` mirrors these exact dimensions so rows align.

Old-price is always rendered (with `visibility: hidden` when `originalPrice` is absent) to keep price block height uniform across all cards.

### `components/home/AboutSection.tsx`
Two-column desktop layout: right = collapsible store description, left = trust badges (eNAMAD / ساماندهی / اتحادیه). The comment block inside this file marks the **exact location to paste the real eNAMAD embed script** — do not move or delete it.

## Home Page Section Order (`app/page.tsx`)

1. `HeroBanner` — hero image carousel
2. `CategorySlider` — horizontal category chips
3. `FeaturedProducts` — orange special-offers box with countdown
4. Promo banners strip (2 colored gradient boxes)
5. `ProductRow` — جدیدترین محصولات (green, `isNew` filter)
6. `ProductRow` — پرفروش‌ترین‌ها (red gradient, sort by `reviewCount`)
7. `ProductRow` — محبوب‌ترین‌ها (purple gradient, sort by `rating`)
8. `ProductRow` — ویژه شما (blue gradient, `isFeatured` filter)
9. All-products grid (2-col mobile / 4-col desktop, `ProductCard`)
10. Perks strip (4 boxes: ارسال سریع / ضمانت اصالت / مرجوعی / پشتیبانی)
11. `AboutSection` + trust badges

## Mock Data (`lib/mock-data.ts`)

14 products total. All images are Unsplash URLs with `?w=400&h=400&fit=crop`. **Only use photo IDs that are already in this file** — unverified IDs cause broken images. Products 9–14 reuse confirmed IDs from products 1–8 where needed. Use `ScrollCard`'s `onError → setImgFailed` fallback for any new IDs until verified.

## Images

`<Image unoptimized>` is required for Unsplash URLs so Next.js doesn't strip query params. `next.config.mjs` allow-lists `images.unsplash.com` and `picsum.photos`. `ScrollCard` has an `ImageOff` fallback via `useState(imgFailed)` + `onError`.

## Suspense Requirement

Any component calling `useSearchParams()` must be wrapped in `<Suspense>` or the build fails. See `app/products/page.tsx` and `components/home/CategorySlider.tsx`.

## Persian Utilities

- `persianNumber(n)` — converts digits to Persian numerals (use for counts, quantities)
- `formatPrice(n)` — `Intl.NumberFormat("fa-IR")` (use for all prices)
