// ═══════════════════════════════════════
// CrumbleCo — Navbar Component
// ═══════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore, mockUser } from '@/store/authStore';
import { ROUTES, BRAND } from '@/constants';
import { SearchOverlay } from './SearchOverlay';

const navLinks = [
  { label: 'Home', path: ROUTES.HOME },
  { label: 'Menu', path: ROUTES.PRODUCTS },
  { label: 'Customize', path: ROUTES.CUSTOMIZE },
  { label: 'About', path: '#about' },
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, isSearchOpen, toggleSearch } = useUIStore();
  const itemCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.getCount());
  const { isAuthenticated, login } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { closeMobileMenu(); }, [location.pathname, closeMobileMenu]);

  const handleAuthClick = () => {
    if (!isAuthenticated) {
      login(mockUser);
    }
  };

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-40 transition-all duration-300
          ${scrolled
            ? 'bg-white/90 backdrop-blur-lg shadow-card py-2'
            : 'bg-transparent py-4'}
        `}
      >
        <div className="container-app flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" aria-label="CrumbleCo Home">
            <span className="text-3xl" role="img" aria-label="croissant">🥐</span>
            <span className="font-display text-2xl font-bold text-espresso-500 group-hover:text-amber-500 transition-colors">
              {BRAND.name}
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  relative font-body font-medium text-sm tracking-wide uppercase
                  transition-colors hover:text-amber-500
                  ${location.pathname === link.path ? 'text-amber-500' : 'text-espresso-400'}
                `}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-400 rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={toggleSearch}
              className="p-2.5 hover:bg-cream-200 rounded-xl transition-colors"
              aria-label="Search products"
              id="search-toggle"
            >
              <Search size={20} className="text-espresso-400" />
            </button>

            {/* Wishlist */}
            <Link
              to={ROUTES.ACCOUNT_WISHLIST}
              className="relative p-2.5 hover:bg-cream-200 rounded-xl transition-colors hidden sm:flex"
              aria-label={`Wishlist (${wishlistCount} items)`}
              id="wishlist-link"
            >
              <Heart size={20} className="text-espresso-400" />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-rose-300 text-white text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to={ROUTES.CART}
              className="relative p-2.5 hover:bg-cream-200 rounded-xl transition-colors"
              aria-label={`Cart (${itemCount} items)`}
              id="cart-link"
            >
              <ShoppingBag size={20} className="text-espresso-400" />
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-amber-400 text-espresso-500 text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </Link>

            {/* User */}
            <button
              onClick={handleAuthClick}
              className="p-2.5 hover:bg-cream-200 rounded-xl transition-colors hidden sm:flex"
              aria-label={isAuthenticated ? 'Account' : 'Sign in'}
              id="user-auth"
            >
              {isAuthenticated ? (
                <Link to={ROUTES.ACCOUNT}>
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center overflow-hidden">
                    <img src={mockUser.avatar} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                </Link>
              ) : (
                <User size={20} className="text-espresso-400" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="p-2.5 hover:bg-cream-200 rounded-xl transition-colors lg:hidden"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-espresso-500/30 backdrop-blur-sm z-40 lg:hidden"
              onClick={closeMobileMenu}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white z-50 shadow-xl lg:hidden flex flex-col"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-cream-200">
                <span className="font-display text-xl font-bold text-espresso-500">{BRAND.name}</span>
                <button onClick={closeMobileMenu} className="p-2 hover:bg-cream-100 rounded-lg" aria-label="Close menu">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 px-6 py-6 space-y-2 overflow-y-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`
                      flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-colors
                      ${location.pathname === link.path
                        ? 'bg-amber-50 text-amber-600'
                        : 'text-espresso-400 hover:bg-cream-100'}
                    `}
                  >
                    {link.label}
                    <ChevronRight size={16} className="text-espresso-200" />
                  </Link>
                ))}
                <hr className="my-4 border-cream-200" />
                <Link to={ROUTES.ACCOUNT_WISHLIST} className="flex items-center gap-3 px-4 py-3 rounded-xl text-espresso-400 hover:bg-cream-100">
                  <Heart size={18} /> Wishlist
                  {wishlistCount > 0 && <span className="ml-auto bg-rose-100 text-rose-600 text-xs font-bold px-2 py-0.5 rounded-full">{wishlistCount}</span>}
                </Link>
                <Link to={ROUTES.ACCOUNT} className="flex items-center gap-3 px-4 py-3 rounded-xl text-espresso-400 hover:bg-cream-100">
                  <User size={18} /> My Account
                </Link>
              </div>
              <div className="px-6 py-4 border-t border-cream-200">
                {!isAuthenticated ? (
                  <button
                    onClick={handleAuthClick}
                    className="w-full py-3 bg-amber-400 text-espresso-500 font-bold rounded-xl hover:bg-amber-500 transition-colors"
                  >
                    Sign In
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <img src={mockUser.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-espresso-500">{mockUser.name}</p>
                      <p className="text-xs text-espresso-200">{mockUser.email}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => useUIStore.getState().closeSearch()} />
    </>
  );
};
