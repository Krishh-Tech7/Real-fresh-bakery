// ═══════════════════════════════════════
// CrumbleCo — Cart Store (Zustand)
// ═══════════════════════════════════════

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Coupon } from '@/types';

interface CartState {
  items: CartItem[];
  coupon: Coupon | null;
  
  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
  
  // Computed
  getItemCount: () => number;
  getSubtotal: () => number;
  getDiscount: () => number;
  getDeliveryFee: () => number;
  getTax: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,

      addItem: (item) => set((state) => {
        const existing = state.items.find(
          (i) => i.productId === item.productId && i.variantId === item.variantId
        );
        if (existing) {
          return {
            items: state.items.map((i) =>
              i.id === existing.id
                ? { ...i, quantity: Math.min(i.quantity + item.quantity, i.maxQuantity) }
                : i
            ),
          };
        }
        return { items: [...state.items, item] };
      }),

      removeItem: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id),
      })),

      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantity: Math.max(1, Math.min(quantity, i.maxQuantity)) } : i
        ),
      })),

      clearCart: () => set({ items: [], coupon: null }),

      applyCoupon: (coupon) => set({ coupon }),

      removeCoupon: () => set({ coupon: null }),

      getItemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      getSubtotal: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      getDiscount: () => {
        const { coupon } = get();
        const subtotal = get().getSubtotal();
        if (!coupon || subtotal < coupon.minOrderValue) return 0;
        if (coupon.discountType === 'percentage') {
          const discount = (subtotal * coupon.discountValue) / 100;
          return coupon.maxDiscount ? Math.min(discount, coupon.maxDiscount) : discount;
        }
        return coupon.discountValue;
      },

      getDeliveryFee: () => {
        const subtotal = get().getSubtotal();
        return subtotal >= 499 ? 0 : 49;
      },

      getTax: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        return Math.round((subtotal - discount) * 0.05);
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        const delivery = get().getDeliveryFee();
        const tax = get().getTax();
        return subtotal - discount + delivery + tax;
      },
    }),
    { name: 'crumbleco-cart' }
  )
);
