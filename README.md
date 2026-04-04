# CrumbleCo Bakery 🥐

> Artisan bakery e-commerce — built with React 18, TypeScript, Vite & Razorpay.

## Tech Stack
- React 18 + TypeScript (strict)
- Vite 5 | Tailwind CSS v3 | Framer Motion
- Zustand | React Query | React Hook Form + Zod
- Razorpay (payments) | Firebase Auth

## Branches
| Branch     | Purpose                        |
|------------|-------------------------------|
| main       | Stable, production-ready code  |
| frontend   | Active frontend development    |

## Getting Started
```bash
git clone https://github.com/Krishh-T/crumbleco-bakery.git
cd crumbleco-bakery
git checkout frontend
npm install
cp .env.example .env.local
npm run dev
```

## Environment Variables
See `.env.example` for required keys (Razorpay, Firebase, API base URL).

## Features
- 🏠 Beautiful Homepage with hero, featured products, testimonials
- 🛍️ Product listing with filters, sort, and search
- 🎂 Product detail with variants, reviews, and related products
- 🛒 Full shopping cart with coupons and upsell
- ✅ Multi-step checkout (Address → Delivery → Payment → Confirm)
- 👤 User account with orders, wishlist, wallet
- 🎨 Interactive cake customizer
- 💬 WhatsApp chat integration
- 📱 Fully responsive (320px → 1440px+)
