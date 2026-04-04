// ═══════════════════════════════════════
// CrumbleCo — Wishlist Store (Zustand)
// ═══════════════════════════════════════

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WishlistItem } from '@/types';

interface WishlistState {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleItem: (item: WishlistItem) => void;
  getCount: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => set((state) => {
        if (state.items.some((i) => i.productId === item.productId)) return state;
        return { items: [...state.items, item] };
      }),

      removeItem: (productId) => set((state) => ({
        items: state.items.filter((i) => i.productId !== productId),
      })),

      isInWishlist: (productId) => get().items.some((i) => i.productId === productId),

      toggleItem: (item) => {
        if (get().isInWishlist(item.productId)) {
          get().removeItem(item.productId);
        } else {
          get().addItem(item);
        }
      },

      getCount: () => get().items.length,
    }),
    { name: 'crumbleco-wishlist' }
  )
);
