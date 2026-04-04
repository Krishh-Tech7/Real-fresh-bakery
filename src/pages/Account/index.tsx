// ═══════════════════════════════════════
// CrumbleCo — Account Page
// ═══════════════════════════════════════

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User, Package, MapPin, Heart, Star, Wallet, Settings, LogOut,
  Edit3, ChevronRight, Clock, Truck, CheckCircle2, CookingPot, ShoppingBag,
  Plus, Trash2, Gift, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { StarRating } from '@/components/ui/StarRating';
import { useAuthStore, mockUser } from '@/store/authStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency, generateId } from '@/utils';
import { ROUTES } from '@/constants';
import { toast } from 'sonner';

type Tab = 'profile' | 'orders' | 'addresses' | 'wishlist' | 'reviews' | 'wallet' | 'settings';

const sidebarItems: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: 'profile', label: 'Profile', icon: <User size={18} /> },
  { key: 'orders', label: 'My Orders', icon: <Package size={18} /> },
  { key: 'addresses', label: 'Addresses', icon: <MapPin size={18} /> },
  { key: 'wishlist', label: 'Wishlist', icon: <Heart size={18} /> },
  { key: 'reviews', label: 'My Reviews', icon: <Star size={18} /> },
  { key: 'wallet', label: 'Wallet & Credits', icon: <Wallet size={18} /> },
  { key: 'settings', label: 'Settings', icon: <Settings size={18} /> },
];

// Mock orders
const mockOrders = [
  {
    id: 'CRB-X8K2M4',
    date: '2024-03-28',
    items: [
      { name: 'Belgian Chocolate Truffle Cake', variant: '1kg', quantity: 1, price: 1099, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&h=100&fit=crop' },
      { name: 'Classic Butter Croissant', variant: 'Box of 4', quantity: 1, price: 449, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=100&h=100&fit=crop' },
    ],
    total: 1623,
    status: 'delivered' as const,
    paymentMethod: 'UPI',
  },
  {
    id: 'CRB-P3N7Q1',
    date: '2024-04-01',
    items: [
      { name: 'Rustic Sourdough Loaf', variant: '1kg', quantity: 2, price: 449, image: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=100&h=100&fit=crop' },
    ],
    total: 941,
    status: 'out-for-delivery' as const,
    paymentMethod: 'Card',
  },
];

const statusConfig = {
  placed: { label: 'Placed', color: 'bg-blue-100 text-blue-700', icon: <Clock size={14} /> },
  confirmed: { label: 'Confirmed', color: 'bg-indigo-100 text-indigo-700', icon: <CheckCircle2 size={14} /> },
  baking: { label: 'Baking', color: 'bg-amber-100 text-amber-700', icon: <CookingPot size={14} /> },
  'out-for-delivery': { label: 'Out for Delivery', color: 'bg-orange-100 text-orange-700', icon: <Truck size={14} /> },
  delivered: { label: 'Delivered', color: 'bg-emerald-100 text-emerald-700', icon: <CheckCircle2 size={14} /> },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700', icon: <Clock size={14} /> },
};

const AccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const { login, logout, isAuthenticated } = useAuthStore();
  const wishlistItems = useWishlistStore((s) => s.items);
  const removeFromWishlist = useWishlistStore((s) => s.removeItem);
  const addToCart = useCartStore((s) => s.addItem);

  // Auto-login for demo
  if (!isAuthenticated) login(mockUser);

  const user = mockUser;

  const walletTransactions = [
    { id: '1', type: 'credit' as const, amount: 200, description: 'Referral bonus', date: '2024-03-15' },
    { id: '2', type: 'debit' as const, amount: 150, description: 'Used on order CRB-X8K2M4', date: '2024-03-28' },
    { id: '3', type: 'credit' as const, amount: 100, description: 'Welcome bonus', date: '2023-06-15' },
    { id: '4', type: 'credit' as const, amount: 200, description: 'Birthday reward', date: '2024-06-15' },
  ];

  return (
    <main className="pt-24 pb-16 min-h-screen bg-cream-50" id="main-content">
      <div className="container-app">
        <h1 className="font-display text-3xl font-bold text-espresso-500 mb-8">My Account</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* ─── Sidebar ─── */}
          <aside className="md:w-64 shrink-0">
            <div className="bg-white rounded-2xl shadow-card overflow-hidden sticky top-24">
              {/* User Card */}
              <div className="p-5 bg-gradient-to-br from-espresso-500 to-espresso-400 text-cream-50">
                <div className="flex items-center gap-3 mb-3">
                  <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-amber-400" />
                  <div>
                    <p className="font-bold">{user.name}</p>
                    <p className="text-xs text-cream-300">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Gift size={12} className="text-amber-400" />
                  <span className="text-amber-300 font-semibold">{user.loyaltyPoints} loyalty points</span>
                </div>
              </div>

              {/* Nav Items */}
              <nav className="p-2" aria-label="Account navigation">
                {sidebarItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveTab(item.key)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
                      activeTab === item.key
                        ? 'bg-amber-50 text-amber-600'
                        : 'text-espresso-300 hover:bg-cream-50'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
                <hr className="my-2 border-cream-200" />
                <button
                  onClick={() => { logout(); toast('Logged out successfully'); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors text-left"
                >
                  <LogOut size={18} /> Logout
                </button>
              </nav>
            </div>
          </aside>

          {/* ─── Content ─── */}
          <div className="flex-1 min-w-0">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-card"
            >
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-xl font-bold text-espresso-500">Personal Information</h2>
                    <Button variant="ghost" size="sm" icon={<Edit3 size={14} />}>Edit</Button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {[
                      { label: 'Full Name', value: user.name },
                      { label: 'Email', value: user.email },
                      { label: 'Phone', value: user.phone || 'Not set' },
                      { label: 'Date of Birth', value: user.dateOfBirth || 'Not set' },
                      { label: 'Member Since', value: new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) },
                      { label: 'Loyalty Points', value: `${user.loyaltyPoints} pts` },
                    ].map((field) => (
                      <div key={field.label}>
                        <p className="text-xs text-espresso-200 uppercase tracking-wider mb-1">{field.label}</p>
                        <p className="font-medium text-espresso-500">{field.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <h2 className="font-display text-xl font-bold text-espresso-500">My Orders</h2>
                  {mockOrders.map((order) => {
                    const sc = statusConfig[order.status];
                    return (
                      <div key={order.id} className="border border-cream-200 rounded-2xl overflow-hidden">
                        {/* Order Header */}
                        <div className="flex items-center justify-between px-5 py-3 bg-cream-50 border-b border-cream-200 flex-wrap gap-2">
                          <div className="flex items-center gap-4">
                            <span className="text-xs font-mono text-espresso-200">#{order.id}</span>
                            <span className="text-xs text-espresso-200">{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          </div>
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${sc.color}`}>
                            {sc.icon} {sc.label}
                          </span>
                        </div>
                        {/* Order Items */}
                        <div className="p-5 space-y-3">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                              <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover" />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-espresso-500 truncate">{item.name}</p>
                                <p className="text-xs text-espresso-200">{item.variant} × {item.quantity}</p>
                              </div>
                              <span className="font-semibold text-sm">{formatCurrency(item.price * item.quantity)}</span>
                            </div>
                          ))}
                        </div>
                        {/* Order Footer */}
                        <div className="flex items-center justify-between px-5 py-3 border-t border-cream-200">
                          <span className="font-bold text-espresso-500">Total: {formatCurrency(order.total)}</span>
                          <div className="flex gap-2">
                            <button className="text-xs font-semibold text-amber-500 hover:text-amber-600 px-3 py-1.5 hover:bg-amber-50 rounded-lg transition-colors">
                              Reorder
                            </button>
                            <button className="text-xs font-semibold text-espresso-300 hover:text-espresso-500 px-3 py-1.5 hover:bg-cream-100 rounded-lg transition-colors">
                              View Details
                            </button>
                          </div>
                        </div>

                        {/* Order Timeline for active orders */}
                        {order.status === 'out-for-delivery' && (
                          <div className="px-5 pb-4">
                            <div className="flex items-center gap-2 mt-2">
                              {['Placed', 'Confirmed', 'Baking', 'Out for Delivery', 'Delivered'].map((step, i) => (
                                <React.Fragment key={step}>
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                    i <= 3 ? 'bg-emerald-500 text-white' : 'bg-cream-200 text-espresso-200'
                                  }`}>
                                    {i <= 3 ? '✓' : i + 1}
                                  </div>
                                  {i < 4 && (
                                    <div className={`flex-1 h-1 rounded ${i < 3 ? 'bg-emerald-400' : 'bg-cream-200'}`} />
                                  )}
                                </React.Fragment>
                              ))}
                            </div>
                            <div className="flex justify-between mt-1">
                              {['Placed', 'Confirmed', 'Baking', 'Delivery', 'Done'].map((l) => (
                                <span key={l} className="text-[10px] text-espresso-200">{l}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-xl font-bold text-espresso-500">Saved Addresses</h2>
                    <Button size="sm" icon={<Plus size={14} />}>Add New</Button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {user.addresses.map((addr) => (
                      <div key={addr.id} className="border border-cream-200 rounded-2xl p-5 relative hover:border-amber-300 transition-colors">
                        {addr.isDefault && (
                          <span className="absolute top-3 right-3 text-xs bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full font-medium">Default</span>
                        )}
                        <p className="font-semibold text-espresso-500 capitalize mb-1">{addr.addressType}</p>
                        <p className="text-sm text-espresso-300">{addr.name}</p>
                        <p className="text-sm text-espresso-200">{addr.addressLine1}</p>
                        {addr.addressLine2 && <p className="text-sm text-espresso-200">{addr.addressLine2}</p>}
                        <p className="text-sm text-espresso-200">{addr.city}, {addr.state} - {addr.pincode}</p>
                        <p className="text-sm text-espresso-200 mt-1">{addr.phone}</p>
                        <div className="flex gap-3 mt-4">
                          <button className="text-xs font-medium text-amber-500 hover:underline">Edit</button>
                          <button className="text-xs font-medium text-red-400 hover:underline">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div className="space-y-6">
                  <h2 className="font-display text-xl font-bold text-espresso-500">My Wishlist ({wishlistItems.length})</h2>
                  {wishlistItems.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart size={48} className="mx-auto text-espresso-200 mb-4" />
                      <p className="text-espresso-200 mb-4">Your wishlist is empty</p>
                      <Link to={ROUTES.PRODUCTS}><Button size="sm">Browse Products</Button></Link>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {wishlistItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-4 border border-cream-200 rounded-2xl">
                          <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-espresso-500 truncate">{item.name}</p>
                            <p className="font-bold text-amber-500">{formatCurrency(item.price)}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => {
                                addToCart({
                                  id: generateId(), productId: item.productId, name: item.name,
                                  image: item.image, variantId: '1', variantLabel: 'Default',
                                  price: item.price, quantity: 1, maxQuantity: 10,
                                });
                                toast.success('Moved to cart!');
                              }}
                              className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-600 rounded-lg transition-colors"
                              aria-label="Move to cart"
                            >
                              <ShoppingBag size={14} />
                            </button>
                            <button
                              onClick={() => removeFromWishlist(item.productId)}
                              className="p-2 hover:bg-red-50 text-espresso-200 hover:text-red-500 rounded-lg transition-colors"
                              aria-label="Remove from wishlist"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <h2 className="font-display text-xl font-bold text-espresso-500">My Reviews</h2>
                  <div className="text-center py-12">
                    <Star size={48} className="mx-auto text-espresso-200 mb-4" />
                    <p className="text-espresso-200 mb-4">You haven't written any reviews yet</p>
                    <Link to={ROUTES.PRODUCTS}><Button size="sm" variant="outline">Browse products to review</Button></Link>
                  </div>
                </div>
              )}

              {/* Wallet Tab */}
              {activeTab === 'wallet' && (
                <div className="space-y-6">
                  <h2 className="font-display text-xl font-bold text-espresso-500">Wallet & Credits</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl p-6 text-espresso-500">
                      <p className="text-sm opacity-80">Wallet Balance</p>
                      <p className="text-3xl font-bold font-display mt-1">{formatCurrency(user.walletBalance)}</p>
                    </div>
                    <div className="bg-gradient-to-br from-espresso-500 to-espresso-400 rounded-2xl p-6 text-cream-50">
                      <p className="text-sm opacity-80">Loyalty Points</p>
                      <p className="text-3xl font-bold font-display mt-1">{user.loyaltyPoints} pts</p>
                      <p className="text-xs opacity-60 mt-1">= {formatCurrency(user.loyaltyPoints * 0.25)} value</p>
                    </div>
                  </div>
                  {/* Referral */}
                  <div className="bg-cream-50 rounded-2xl p-5 flex items-center gap-4">
                    <Gift size={24} className="text-amber-500 shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-espresso-500">Refer & Earn ₹200</p>
                      <p className="text-xs text-espresso-200">Share your link and earn ₹200 when your friend places their first order</p>
                    </div>
                    <Button size="sm" variant="outline">Share</Button>
                  </div>
                  {/* Transactions */}
                  <div>
                    <h3 className="font-semibold text-espresso-400 mb-3">Transaction History</h3>
                    <div className="space-y-2">
                      {walletTransactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between py-3 border-b border-cream-100 last:border-0">
                          <div>
                            <p className="text-sm text-espresso-400">{tx.description}</p>
                            <p className="text-xs text-espresso-200">{new Date(tx.date).toLocaleDateString('en-IN')}</p>
                          </div>
                          <span className={`font-bold text-sm ${tx.type === 'credit' ? 'text-emerald-600' : 'text-red-500'}`}>
                            {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h2 className="font-display text-xl font-bold text-espresso-500">Settings</h2>
                  {/* Notifications */}
                  <div>
                    <h3 className="font-semibold text-espresso-400 mb-4">Notification Preferences</h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Order Updates', desc: 'Status changes and delivery notifications', defaultOn: true },
                        { label: 'Promotions', desc: 'Special offers and seasonal discounts', defaultOn: true },
                        { label: 'Newsletter', desc: 'Weekly recipes and baking tips', defaultOn: false },
                        { label: 'SMS Notifications', desc: 'Order updates via SMS', defaultOn: true },
                      ].map((pref) => (
                        <label key={pref.label} className="flex items-center justify-between cursor-pointer">
                          <div>
                            <p className="text-sm font-medium text-espresso-500">{pref.label}</p>
                            <p className="text-xs text-espresso-200">{pref.desc}</p>
                          </div>
                          <input
                            type="checkbox"
                            defaultChecked={pref.defaultOn}
                            className="w-5 h-5 rounded text-amber-400 focus:ring-amber-400"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                  <hr className="border-cream-200" />
                  {/* Change Password */}
                  <div>
                    <h3 className="font-semibold text-espresso-400 mb-4">Security</h3>
                    <Button variant="outline" size="sm">Change Password</Button>
                  </div>
                  <hr className="border-cream-200" />
                  {/* Danger Zone */}
                  <div>
                    <h3 className="font-semibold text-red-500 mb-4">Danger Zone</h3>
                    <Button variant="danger" size="sm">Delete Account</Button>
                    <p className="text-xs text-espresso-200 mt-2">This action is irreversible.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AccountPage;
