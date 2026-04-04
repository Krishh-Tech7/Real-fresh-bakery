// ═══════════════════════════════════════
// CrumbleCo — TypeScript Type Definitions
// ═══════════════════════════════════════

/** Product variant option (e.g. size/weight) */
export interface ProductVariant {
  id: string;
  label: string;
  price: number;
  originalPrice?: number;
  weight?: string;
  inStock: boolean;
}

/** Product image */
export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

/** Badge types for product cards */
export type BadgeType = 'new' | 'bestseller' | 'limited' | 'sale';

/** Dietary information */
export type DietaryTag = 'eggless' | 'vegan' | 'gluten-free' | 'sugar-free' | 'nut-free';

/** Product category */
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description?: string;
  productCount: number;
  image?: string;
}

/** Full product definition */
export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  categoryId: string;
  categoryName: string;
  images: ProductImage[];
  variants: ProductVariant[];
  badge?: BadgeType;
  salePercentage?: number;
  rating: number;
  reviewCount: number;
  dietaryTags: DietaryTag[];
  ingredients: string[];
  allergens: string[];
  isCustomizable: boolean;
  occasion?: string[];
  stockCount: number;
  createdAt: string;
  featured: boolean;
}

/** Cart item extending a product selection */
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  variantId: string;
  variantLabel: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  customMessage?: string;
  maxQuantity: number;
}

/** Saved-for-later item */
export interface SavedItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  addedAt: string;
}

/** Coupon code */
export interface Coupon {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  isValid: boolean;
}

/** Delivery address */
export interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  addressType: 'home' | 'office' | 'other';
  isDefault: boolean;
}

/** Delivery time slot */
export interface DeliverySlot {
  id: string;
  date: string;
  timeSlot: 'morning' | 'afternoon' | 'evening';
  timeLabel: string;
  available: boolean;
}

/** Order status */
export type OrderStatus = 'placed' | 'confirmed' | 'baking' | 'out-for-delivery' | 'delivered' | 'cancelled';

/** Order item */
export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  variant: string;
  quantity: number;
  price: number;
  customMessage?: string;
}

/** Full order */
export interface Order {
  id: string;
  items: OrderItem[];
  address: Address;
  deliverySlot: DeliverySlot;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tax: number;
  total: number;
  coupon?: string;
  status: OrderStatus;
  paymentMethod: string;
  paymentId?: string;
  specialInstructions?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery: string;
}

/** User profile */
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  dateOfBirth?: string;
  addresses: Address[];
  loyaltyPoints: number;
  walletBalance: number;
  createdAt: string;
}

/** Review on a product */
export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  productId: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  isVerified: boolean;
  createdAt: string;
  helpful: number;
}

/** Testimonial for homepage */
export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  isVerified: boolean;
}

/** Payment method types */
export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'wallet' | 'cod' | 'emi';

/** Wishlist item */
export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  inStock: boolean;
  addedAt: string;
}

/** Sort options for product listing */
export type SortOption = 'popular' | 'price-low' | 'price-high' | 'newest' | 'rating';

/** Product filter state */
export interface ProductFilters {
  category?: string;
  priceRange: [number, number];
  dietary: DietaryTag[];
  rating?: number;
  occasion?: string;
  search?: string;
  sort: SortOption;
}

/** Notification preference */
export interface NotificationPrefs {
  orderUpdates: boolean;
  promotions: boolean;
  newsletter: boolean;
  sms: boolean;
}

/** Cake customization options */
export interface CakeCustomization {
  base: string;
  flavor: string;
  frosting: string;
  tiers: number;
  message: string;
  addOns: string[];
  totalPrice: number;
}

/** Wallet transaction */
export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
}

/** Search result */
export interface SearchResult {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  categoryName: string;
}
