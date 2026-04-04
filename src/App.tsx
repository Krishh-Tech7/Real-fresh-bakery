// ═══════════════════════════════════════
// CrumbleCo — App Root with Routing
// ═══════════════════════════════════════

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'sonner';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ROUTES } from '@/constants';

// Lazy-loaded pages for code splitting
const HomePage = lazy(() => import('@/pages/Home'));
const ProductsPage = lazy(() => import('@/pages/Products'));
const ProductDetailPage = lazy(() => import('@/pages/ProductDetail'));
const CartPage = lazy(() => import('@/pages/Cart'));
const CheckoutPage = lazy(() => import('@/pages/Checkout'));
const AccountPage = lazy(() => import('@/pages/Account'));
const CustomizePage = lazy(() => import('@/pages/Customize'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

/** Page loading fallback */
const PageLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-cream-50">
    <div className="text-center space-y-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="text-5xl inline-block"
      >
        🥐
      </motion.div>
      <p className="text-espresso-200 font-body text-sm">Loading fresh goodness...</p>
    </div>
  </div>
);

/** Scroll to top on route change */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

/** Page transition wrapper */
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

/** App layout with navbar and footer */
const AppLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path={ROUTES.HOME} element={<PageTransition><HomePage /></PageTransition>} />
              <Route path={ROUTES.PRODUCTS} element={<PageTransition><ProductsPage /></PageTransition>} />
              <Route path={ROUTES.PRODUCT_DETAIL} element={<PageTransition><ProductDetailPage /></PageTransition>} />
              <Route path={ROUTES.CART} element={<PageTransition><CartPage /></PageTransition>} />
              <Route path={ROUTES.CHECKOUT} element={<PageTransition><CheckoutPage /></PageTransition>} />
              <Route path={ROUTES.ACCOUNT} element={<PageTransition><AccountPage /></PageTransition>} />
              <Route path={ROUTES.ACCOUNT_ORDERS} element={<PageTransition><AccountPage /></PageTransition>} />
              <Route path={ROUTES.ACCOUNT_ADDRESSES} element={<PageTransition><AccountPage /></PageTransition>} />
              <Route path={ROUTES.ACCOUNT_WISHLIST} element={<PageTransition><AccountPage /></PageTransition>} />
              <Route path={ROUTES.ACCOUNT_REVIEWS} element={<PageTransition><AccountPage /></PageTransition>} />
              <Route path={ROUTES.ACCOUNT_WALLET} element={<PageTransition><AccountPage /></PageTransition>} />
              <Route path={ROUTES.ACCOUNT_SETTINGS} element={<PageTransition><AccountPage /></PageTransition>} />
              <Route path={ROUTES.CUSTOMIZE} element={<PageTransition><CustomizePage /></PageTransition>} />
              <Route path={ROUTES.NOT_FOUND} element={<PageTransition><NotFoundPage /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppLayout />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#FFFDF9',
            border: '1px solid #FAE9CC',
            color: '#2C1A0E',
            fontFamily: '"DM Sans", sans-serif',
          },
        }}
        richColors
      />
    </BrowserRouter>
  );
};

export default App;
