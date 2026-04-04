// ═══════════════════════════════════════
// CrumbleCo — UI Store (Zustand)
// ═══════════════════════════════════════

import { create } from 'zustand';

interface UIState {
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  isCartDrawerOpen: boolean;
  isDarkMode: boolean;
  
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleSearch: () => void;
  closeSearch: () => void;
  toggleCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleDarkMode: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isCartDrawerOpen: false,
  isDarkMode: false,

  toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleSearch: () => set((s) => ({ isSearchOpen: !s.isSearchOpen })),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleCartDrawer: () => set((s) => ({ isCartDrawerOpen: !s.isCartDrawerOpen })),
  closeCartDrawer: () => set({ isCartDrawerOpen: false }),
  toggleDarkMode: () => set((s) => {
    const newMode = !s.isDarkMode;
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { isDarkMode: newMode };
  }),
}));
