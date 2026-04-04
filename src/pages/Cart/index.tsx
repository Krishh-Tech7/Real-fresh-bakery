// ═══════════════════════════════════════
// CrumbleCo — Cart Page
// ═══════════════════════════════════════

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, ArrowRight, Tag, X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { QuantityPicker } from '@/components/ui/QuantityPicker';
import { ProductCard } from '@/components/shared/ProductCard';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/utils';
import { mockProducts } from '@/data/mockData';
import { ROUTES, FREE_DELIVERY_THRESHOLD } from '@/constants';
import { toast } from 'sonner';

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, applyCoupon, removeCoupon, coupon,
    getSubtotal, getDiscount, getDeliveryFee, getTax, getTotal } = useCartStore();
  const [couponCode, setCouponCode] = useState('');
  const [removedItem, setRemovedItem] = useState<string | null>(null);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const deliveryFee = getDeliveryFee();
  const tax = getTax();
  const total = getTotal();

  // Mock upsell products
  const upsellProducts = mockProducts.filter((p) => !items.some((i) => i.productId === p.id)).slice(0, 4);

  const handleRemove = (id: string, name: string) => {
    setRemovedItem(id);
    toast('Item removed from cart', {
      description: name,
      action: {
        label: 'Undo',
        onClick: () => {
          setRemovedItem(null);
          // In a real app we'd restore the item
        },
      },
      duration: 5000,
    });
    setTimeout(() => {
      if (removedItem === id || true) removeItem(id);
      setRemovedItem(null);
    }, 300);
  };

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'FRESH20') {
      applyCoupon({
        code: 'FRESH20',
        discountType: 'percentage',
        discountValue: 20,
        minOrderValue: 500,
        maxDiscount: 200,
        isValid: true,
      });
      toast.success('Coupon applied! 20% off');
      setCouponCode('');
    } else if (code === 'FLAT100') {
      applyCoupon({
        code: 'FLAT100',
        discountType: 'flat',
        discountValue: 100,
        minOrderValue: 499,
        isValid: true,
      });
      toast.success('Coupon applied! ₹100 off');
      setCouponCode('');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  if (items.length === 0) {
    return (
      <main className="pt-24 pb-16 min-h-screen bg-cream-50" id="main-content">
        <div className="container-app">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 max-w-md mx-auto"
          >
            <div className="text-7xl mb-6">🛒</div>
            <h1 className="font-display text-3xl font-bold text-espresso-500 mb-3">Your Cart is Empty</h1>
            <p className="text-espresso-200 mb-8">
              Looks like you haven't added any delicious treats yet. Let's fix that!
            </p>
            <Link to={ROUTES.PRODUCTS}>
              <Button size="lg" icon={<ShoppingBag size={18} />}>
                Start Shopping
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-16 min-h-screen bg-cream-50" id="main-content">
      <div className="container-app">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-espresso-500">Shopping Cart</h1>
            <p className="text-espresso-200">{items.length} item{items.length > 1 ? 's' : ''} in your cart</p>
          </div>
          <Link to={ROUTES.PRODUCTS} className="flex items-center gap-2 text-sm text-amber-500 hover:text-amber-600 font-medium">
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ─── Cart Items ─── */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-white rounded-2xl p-4 sm:p-6 shadow-card"
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <Link to={`/products/${item.productId}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover shrink-0"
                        width={112} height={112}
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link to={`/products/${item.productId}`}>
                            <h3 className="font-display font-bold text-espresso-500 hover:text-amber-600 transition-colors">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-espresso-200">{item.variantLabel}</p>
                          {item.customMessage && (
                            <p className="text-xs text-amber-500 mt-1">🎂 "{item.customMessage}"</p>
                          )}
                        </div>
                        <button
                          onClick={() => handleRemove(item.id, item.name)}
                          className="p-2 hover:bg-red-50 text-espresso-200 hover:text-red-500 rounded-lg transition-colors shrink-0"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
                        <QuantityPicker
                          value={item.quantity}
                          max={item.maxQuantity}
                          onChange={(val) => updateQuantity(item.id, val)}
                          size="sm"
                        />
                        <div className="text-right">
                          <p className="font-bold text-espresso-500 text-lg">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                          {item.originalPrice && (
                            <p className="text-sm text-espresso-200 line-through">
                              {formatCurrency(item.originalPrice * item.quantity)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* ─── Order Summary ─── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-card sticky top-24 space-y-6">
              <h2 className="font-display text-xl font-bold text-espresso-500">Order Summary</h2>

              {/* Coupon */}
              {coupon ? (
                <div className="flex items-center justify-between bg-emerald-50 px-4 py-3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Tag size={16} className="text-emerald-600" />
                    <span className="text-sm font-semibold text-emerald-700">{coupon.code}</span>
                  </div>
                  <button onClick={removeCoupon} className="text-espresso-200 hover:text-red-500">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon code"
                    className="flex-1 px-4 py-2.5 border border-cream-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2.5 bg-espresso-500 text-cream-50 text-sm font-semibold rounded-xl hover:bg-espresso-400 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              )}
              <p className="text-xs text-espresso-200">Try: FRESH20 or FLAT100</p>

              {/* Totals */}
              <div className="space-y-3 border-t border-cream-200 pt-4">
                <div className="flex justify-between text-sm text-espresso-300">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-emerald-600">
                    <span>Discount</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-espresso-300">
                  <span>Delivery</span>
                  <span>{deliveryFee === 0 ? <span className="text-emerald-600 font-medium">Free</span> : formatCurrency(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-sm text-espresso-300">
                  <span>Tax (5%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>

                {/* Free delivery progress */}
                {subtotal < FREE_DELIVERY_THRESHOLD && (
                  <div className="bg-amber-50 rounded-xl p-3">
                    <p className="text-xs text-amber-700 font-medium mb-2">
                      Add {formatCurrency(FREE_DELIVERY_THRESHOLD - subtotal)} more for free delivery!
                    </p>
                    <div className="w-full h-1.5 bg-amber-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all"
                        style={{ width: `${Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-between text-lg font-bold text-espresso-500 pt-3 border-t border-cream-200">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <Link to={ROUTES.CHECKOUT} className="block">
                <Button size="lg" fullWidth icon={<ArrowRight size={18} />} iconPosition="right">
                  Proceed to Checkout
                </Button>
              </Link>

              <p className="text-xs text-center text-espresso-200">
                🔒 SSL Secured • PCI-DSS Compliant
              </p>
            </div>
          </div>
        </div>

        {/* ─── Upsell Section ─── */}
        {upsellProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold text-espresso-500 mb-6">Add These to Your Order</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {upsellProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default CartPage;
