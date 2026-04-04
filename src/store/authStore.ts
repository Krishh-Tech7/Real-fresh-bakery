// ═══════════════════════════════════════
// CrumbleCo — Auth Store (Zustand)
// ═══════════════════════════════════════

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  login: (user: User) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
}

// Mock user for demo purposes
export const mockUser: User = {
  id: 'u1',
  email: 'priya@example.com',
  name: 'Priya Sharma',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  dateOfBirth: '1995-06-15',
  addresses: [
    {
      id: 'a1',
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      addressLine1: '42, Rose Garden Apartments',
      addressLine2: 'MG Road, Koramangala',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560034',
      addressType: 'home',
      isDefault: true,
    },
    {
      id: 'a2',
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      addressLine1: '5th Floor, TechPark Tower',
      addressLine2: 'Outer Ring Road, Marathahalli',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560037',
      addressType: 'office',
      isDefault: false,
    },
  ],
  loyaltyPoints: 1250,
  walletBalance: 350,
  createdAt: '2023-06-15',
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: (user) => set({ user, isAuthenticated: true }),

      logout: () => set({ user: null, isAuthenticated: false }),

      updateProfile: (data) => set((state) => ({
        user: state.user ? { ...state.user, ...data } : null,
      })),

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    { name: 'crumbleco-auth' }
  )
);
