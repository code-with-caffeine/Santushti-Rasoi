# Mithai Luxe — Luxury Indian Sweets Website

A beautiful, production-ready Next.js website for a luxury Indian sweets and dry sweets business based in Patna, Bihar.

## Features

- **Hero Section** — Full-screen landing with decorative mandala SVG and key stats
- **Collections Grid** — 4 product categories with hover animations
- **Featured Products** — Bento-style product grid with add-to-cart functionality
- **Heritage Section** — Brand story with dark background and feature highlights
- **Dry Sweets Explorer** — Interactive selector showing product details dynamically
- **Luxury Gifting** — Gift box tiers with pricing (Classic / Royal / Heritage Trunk)
- **Testimonials** — Customer reviews with star ratings
- **Order Form** — Full enquiry form with occasion selector
- **Footer** — Complete footer with navigation, social links, FSSAI licensing

## Design System

- **Fonts:** Cormorant Garamond (display) + Jost (body)
- **Palette:** Deep brown, cream, gold, ruby accents
- **Aesthetic:** Luxury editorial — refined, warm, artisanal
- **Animations:** Scroll-triggered fade-ins, marquee ticker, hover effects

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## To Convert to Full Next.js

The `index.html` is a complete, standalone preview. To convert to a full Next.js app:

1. Move HTML structure into `app/page.tsx`
2. Extract CSS into `app/globals.css` and Tailwind config
3. Break into components:
   - `components/Nav.tsx`
   - `components/Hero.tsx`
   - `components/Categories.tsx`
   - `components/Products.tsx`
   - `components/Heritage.tsx`
   - `components/DrySweetsExplorer.tsx`
   - `components/Gifting.tsx`
   - `components/Testimonials.tsx`
   - `components/OrderForm.tsx`
   - `components/Footer.tsx`
4. Add `next/font` for Cormorant Garamond and Jost
5. Move product data into `lib/products.ts`
6. Add a shopping cart with React Context or Zustand

## Business Info

- **Location:** Boring Road, Patna - 800001, Bihar
- **Phone:** +91 98350 12345
- **Email:** orders@mithailuxe.in
- **FSSAI:** 10019022007790

## Pages to Add

- `/collections/[category]` — Category listing pages
- `/products/[slug]` — Individual product pages
- `/gifting` — Corporate & wedding gifting page
- `/about` — Full heritage story
- `/cart` — Shopping cart
- `/checkout` — Order placement

---

Made with ❤️ for Mithai Luxe, Patna