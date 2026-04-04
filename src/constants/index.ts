// ═══════════════════════════════════════
// CrumbleCo — Route Constants
// ═══════════════════════════════════════

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:slug',
  CART: '/cart',
  CHECKOUT: '/checkout',
  PAYMENT: '/payment',
  ACCOUNT: '/account',
  ACCOUNT_ORDERS: '/account/orders',
  ACCOUNT_ADDRESSES: '/account/addresses',
  ACCOUNT_WISHLIST: '/account/wishlist',
  ACCOUNT_REVIEWS: '/account/reviews',
  ACCOUNT_WALLET: '/account/wallet',
  ACCOUNT_SETTINGS: '/account/settings',
  CUSTOMIZE: '/customize',
  NOT_FOUND: '*',
} as const;

export const CATEGORIES = [
  { id: 'all', name: 'All', slug: 'all', icon: '🍽️' },
  { id: 'breads', name: 'Breads', slug: 'breads', icon: '🍞' },
  { id: 'cakes', name: 'Cakes', slug: 'cakes', icon: '🎂' },
  { id: 'pastries', name: 'Pastries', slug: 'pastries', icon: '🥐' },
  { id: 'cookies', name: 'Cookies', slug: 'cookies', icon: '🍪' },
  { id: 'seasonal', name: 'Seasonal', slug: 'seasonal', icon: '🌸' },
  { id: 'gluten-free', name: 'Gluten-Free', slug: 'gluten-free', icon: '🌿' },
] as const;

export const OCCASIONS = [
  'Birthday',
  'Wedding',
  'Anniversary',
  'Festival',
  'Corporate',
  'Baby Shower',
] as const;

export const FREE_DELIVERY_THRESHOLD = 499;
export const COD_MAX_AMOUNT = 2000;
export const EMI_MIN_AMOUNT = 3000;
export const TAX_RATE = 0.05;

export const BRAND = {
  name: 'CrumbleCo',
  tagline: 'Baked Fresh. Delivered with Love.',
  description: 'Artisan bakery crafting premium breads, cakes, pastries & cookies since 2012.',
  phone: '+91 98765 43210',
  email: 'hello@crumbleco.in',
  whatsapp: '919876543210',
  instagram: 'https://instagram.com/crumbleco',
  facebook: 'https://facebook.com/crumbleco',
} as const;

export const MARQUEE_TEXT = 'Free delivery above ₹499 • Fresh Baked Daily • 100% Natural Ingredients • Customise Your Cake • Order Before 2 PM for Same Day Delivery • ';
