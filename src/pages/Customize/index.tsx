// ═══════════════════════════════════════
// CrumbleCo — Cake Customizer Page
// ═══════════════════════════════════════

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Sparkles, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency, generateId } from '@/utils';
import { toast } from 'sonner';

const bases = [
  { id: 'vanilla', label: 'Vanilla Sponge', price: 0, emoji: '🍰' },
  { id: 'chocolate', label: 'Chocolate', price: 100, emoji: '🍫' },
  { id: 'red-velvet', label: 'Red Velvet', price: 150, emoji: '❤️' },
  { id: 'carrot', label: 'Carrot', price: 100, emoji: '🥕' },
];

const flavors = [
  { id: 'strawberry', label: 'Strawberry', price: 0, color: 'bg-pink-200' },
  { id: 'mango', label: 'Mango', price: 50, color: 'bg-amber-200' },
  { id: 'butterscotch', label: 'Butterscotch', price: 50, color: 'bg-yellow-200' },
  { id: 'coffee', label: 'Coffee', price: 75, color: 'bg-amber-800' },
  { id: 'blueberry', label: 'Blueberry', price: 100, color: 'bg-indigo-300' },
];

const frostings = [
  { id: 'buttercream', label: 'Buttercream', price: 0 },
  { id: 'cream-cheese', label: 'Cream Cheese', price: 100 },
  { id: 'fondant', label: 'Fondant', price: 200 },
  { id: 'ganache', label: 'Chocolate Ganache', price: 150 },
  { id: 'whipped', label: 'Whipped Cream', price: 50 },
];

const addOns = [
  { id: 'candles', label: '🕯️ Candles', price: 49 },
  { id: 'sprinkles', label: '✨ Sprinkles', price: 79 },
  { id: 'fruit-topping', label: '🍓 Fresh Fruit Topping', price: 149 },
  { id: 'chocolate-shavings', label: '🍫 Chocolate Shavings', price: 99 },
  { id: 'edible-flowers', label: '🌸 Edible Flowers', price: 199 },
  { id: 'gold-leaf', label: '✦ Gold Leaf', price: 299 },
  { id: 'macarons', label: '🧁 Mini Macarons', price: 249 },
];

const tierPricing: Record<number, number> = { 1: 799, 2: 1499, 3: 2499 };

const CustomizePage: React.FC = () => {
  const [base, setBase] = useState('vanilla');
  const [flavor, setFlavor] = useState('strawberry');
  const [frosting, setFrosting] = useState('buttercream');
  const [tiers, setTiers] = useState(1);
  const [message, setMessage] = useState('');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const addItem = useCartStore((s) => s.addItem);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const totalPrice = useMemo(() => {
    const basePrice = tierPricing[tiers] || 799;
    const baseExtra = bases.find((b) => b.id === base)?.price || 0;
    const flavorExtra = flavors.find((f) => f.id === flavor)?.price || 0;
    const frostingExtra = frostings.find((f) => f.id === frosting)?.price || 0;
    const addOnsTotal = selectedAddOns.reduce((sum, id) => {
      const addon = addOns.find((a) => a.id === id);
      return sum + (addon?.price || 0);
    }, 0);
    return basePrice + baseExtra + flavorExtra + frostingExtra + addOnsTotal;
  }, [base, flavor, frosting, tiers, selectedAddOns]);

  const handleReset = () => {
    setBase('vanilla');
    setFlavor('strawberry');
    setFrosting('buttercream');
    setTiers(1);
    setMessage('');
    setSelectedAddOns([]);
  };

  const handleAddToCart = () => {
    addItem({
      id: generateId(),
      productId: 'custom-cake',
      name: `Custom ${bases.find(b => b.id === base)?.label} Cake`,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop',
      variantId: `custom-${tiers}tier`,
      variantLabel: `${tiers}-Tier • ${flavors.find(f => f.id === flavor)?.label} • ${frostings.find(f => f.id === frosting)?.label}`,
      price: totalPrice,
      quantity: 1,
      customMessage: message || undefined,
      maxQuantity: 5,
    });
    toast.success('Custom cake added to cart! 🎂');
  };

  return (
    <main className="pt-24 pb-16 min-h-screen bg-cream-50" id="main-content">
      <div className="container-app">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="font-accent text-amber-400 text-xl mb-2">Design Your Dream</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-espresso-500 mb-3">
            Cake Customizer
          </h1>
          <p className="text-espresso-300 max-w-md mx-auto">
            Build your perfect cake step by step. Choose your base, flavor, frosting, and add-ons.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ─── Options Panel ─── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tiers */}
            <section className="bg-white rounded-2xl p-6 shadow-card">
              <h2 className="font-display text-lg font-bold text-espresso-500 mb-4">🎂 Number of Tiers</h2>
              <div className="flex gap-3">
                {[1, 2, 3].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTiers(t)}
                    className={`flex-1 py-4 rounded-xl border-2 font-bold transition-all ${
                      tiers === t
                        ? 'border-amber-400 bg-amber-50 text-amber-600'
                        : 'border-cream-200 text-espresso-300 hover:border-cream-400'
                    }`}
                  >
                    <span className="text-2xl block mb-1">{t === 1 ? '🎂' : t === 2 ? '🎂🎂' : '🎂🎂🎂'}</span>
                    {t} Tier{t > 1 ? 's' : ''}
                    <span className="block text-xs mt-1 opacity-70">from {formatCurrency(tierPricing[t])}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Base */}
            <section className="bg-white rounded-2xl p-6 shadow-card">
              <h2 className="font-display text-lg font-bold text-espresso-500 mb-4">🍰 Cake Base</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {bases.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBase(b.id)}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      base === b.id
                        ? 'border-amber-400 bg-amber-50'
                        : 'border-cream-200 hover:border-cream-400'
                    }`}
                  >
                    <span className="text-2xl block mb-1">{b.emoji}</span>
                    <span className="text-sm font-medium text-espresso-500 block">{b.label}</span>
                    {b.price > 0 && <span className="text-xs text-amber-500">+{formatCurrency(b.price)}</span>}
                  </button>
                ))}
              </div>
            </section>

            {/* Flavor */}
            <section className="bg-white rounded-2xl p-6 shadow-card">
              <h2 className="font-display text-lg font-bold text-espresso-500 mb-4">🎨 Flavor</h2>
              <div className="flex flex-wrap gap-3">
                {flavors.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFlavor(f.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all ${
                      flavor === f.id
                        ? 'border-amber-400 bg-amber-50'
                        : 'border-cream-200 hover:border-cream-400'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full ${f.color}`} />
                    <span className="text-sm font-medium">{f.label}</span>
                    {f.price > 0 && <span className="text-xs text-amber-500">+{formatCurrency(f.price)}</span>}
                  </button>
                ))}
              </div>
            </section>

            {/* Frosting */}
            <section className="bg-white rounded-2xl p-6 shadow-card">
              <h2 className="font-display text-lg font-bold text-espresso-500 mb-4">🧁 Frosting</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {frostings.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFrosting(f.id)}
                    className={`p-3 rounded-xl border-2 text-sm font-medium text-center transition-all ${
                      frosting === f.id
                        ? 'border-amber-400 bg-amber-50 text-amber-600'
                        : 'border-cream-200 text-espresso-300 hover:border-cream-400'
                    }`}
                  >
                    {f.label}
                    {f.price > 0 && <span className="block text-xs text-amber-500 mt-0.5">+{formatCurrency(f.price)}</span>}
                  </button>
                ))}
              </div>
            </section>

            {/* Add-Ons */}
            <section className="bg-white rounded-2xl p-6 shadow-card">
              <h2 className="font-display text-lg font-bold text-espresso-500 mb-4">✨ Add-Ons</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {addOns.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => toggleAddOn(a.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm transition-all text-left ${
                      selectedAddOns.includes(a.id)
                        ? 'border-amber-400 bg-amber-50'
                        : 'border-cream-200 hover:border-cream-400'
                    }`}
                  >
                    <span>{a.label}</span>
                    <span className="ml-auto text-xs text-amber-500 font-medium">+{formatCurrency(a.price)}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Custom Message */}
            <section className="bg-white rounded-2xl p-6 shadow-card">
              <h2 className="font-display text-lg font-bold text-espresso-500 mb-4">💌 Message on Cake</h2>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g., Happy Birthday Sarah!"
                maxLength={50}
                className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none"
              />
              <p className="text-xs text-espresso-200 mt-1">{message.length}/50 characters</p>
            </section>
          </div>

          {/* ─── Preview & Summary Card ─── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-card overflow-hidden"
              >
                {/* Preview Image */}
                <div className="relative aspect-square bg-gradient-to-br from-amber-50 to-rose-50 flex items-center justify-center">
                  <motion.div
                    key={`${base}-${tiers}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                  >
                    <span className="text-8xl block">{tiers === 1 ? '🎂' : tiers === 2 ? '🎂' : '🎂'}</span>
                    <div className="flex justify-center gap-1 mt-2">
                      {selectedAddOns.includes('candles') && <span>🕯️</span>}
                      {selectedAddOns.includes('sprinkles') && <span>✨</span>}
                      {selectedAddOns.includes('fruit-topping') && <span>🍓</span>}
                      {selectedAddOns.includes('edible-flowers') && <span>🌸</span>}
                      {selectedAddOns.includes('gold-leaf') && <span>✦</span>}
                    </div>
                  </motion.div>
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-amber-400 text-espresso-500 text-xs font-bold rounded-full flex items-center gap-1">
                      <Sparkles size={12} /> Custom
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <div className="p-5 space-y-4">
                  <h3 className="font-display text-lg font-bold text-espresso-500">Your Custom Cake</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-espresso-200">Base</span>
                      <span className="text-espresso-400 font-medium">{bases.find(b => b.id === base)?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-espresso-200">Flavor</span>
                      <span className="text-espresso-400 font-medium">{flavors.find(f => f.id === flavor)?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-espresso-200">Frosting</span>
                      <span className="text-espresso-400 font-medium">{frostings.find(f => f.id === frosting)?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-espresso-200">Tiers</span>
                      <span className="text-espresso-400 font-medium">{tiers}</span>
                    </div>
                    {selectedAddOns.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-espresso-200">Add-ons</span>
                        <span className="text-espresso-400 font-medium">{selectedAddOns.length} selected</span>
                      </div>
                    )}
                    {message && (
                      <div className="flex justify-between">
                        <span className="text-espresso-200">Message</span>
                        <span className="text-espresso-400 font-medium truncate ml-4">"{message}"</span>
                      </div>
                    )}
                  </div>

                  <hr className="border-cream-200" />

                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-espresso-200">Total Price</span>
                    <motion.span
                      key={totalPrice}
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-2xl font-bold text-espresso-500"
                    >
                      {formatCurrency(totalPrice)}
                    </motion.span>
                  </div>

                  <Button onClick={handleAddToCart} fullWidth size="lg" icon={<ShoppingBag size={18} />}>
                    Add Custom Cake to Cart
                  </Button>

                  <button
                    onClick={handleReset}
                    className="w-full flex items-center justify-center gap-2 py-2 text-sm text-espresso-200 hover:text-espresso-400 transition-colors"
                  >
                    <RotateCcw size={14} /> Reset All Options
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CustomizePage;
