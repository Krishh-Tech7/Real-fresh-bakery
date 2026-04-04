// ═══════════════════════════════════════
// CrumbleCo — Checkout Page (Multi-step)
// ═══════════════════════════════════════

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Clock, CreditCard, CheckCircle2, ChevronRight,
  Home, Building2, Map, Plus, Calendar, Sun, Sunset, Moon
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore, mockUser } from '@/store/authStore';
import { formatCurrency } from '@/utils';
import { toast } from 'sonner';

type Step = 'address' | 'delivery' | 'payment' | 'confirm';
const steps: { key: Step; label: string; icon: React.ReactNode }[] = [
  { key: 'address', label: 'Address', icon: <MapPin size={18} /> },
  { key: 'delivery', label: 'Delivery', icon: <Clock size={18} /> },
  { key: 'payment', label: 'Payment', icon: <CreditCard size={18} /> },
  { key: 'confirm', label: 'Confirm', icon: <CheckCircle2 size={18} /> },
];

const timeSlots = [
  { id: 'morning', label: '9 AM – 12 PM', icon: <Sun size={18} />, name: 'Morning' },
  { id: 'afternoon', label: '12 PM – 5 PM', icon: <Sunset size={18} />, name: 'Afternoon' },
  { id: 'evening', label: '5 PM – 9 PM', icon: <Moon size={18} />, name: 'Evening' },
];

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('address');
  const [selectedAddress, setSelectedAddress] = useState(mockUser.addresses[0]?.id || '');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const { login, isAuthenticated } = useAuthStore();
  const { items, getSubtotal, getDiscount, getDeliveryFee, getTax, getTotal, clearCart } = useCartStore();

  // Auto-login for demo
  if (!isAuthenticated) login(mockUser);

  const stepIndex = steps.findIndex((s) => s.key === currentStep);

  const nextStep = () => {
    const nextIdx = stepIndex + 1;
    if (nextIdx < steps.length) setCurrentStep(steps[nextIdx].key);
  };
  const prevStep = () => {
    const prevIdx = stepIndex - 1;
    if (prevIdx >= 0) setCurrentStep(steps[prevIdx].key);
  };

  const handlePlaceOrder = () => {
    const id = 'CRB-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setOrderId(id);
    setOrderPlaced(true);
    clearCart();
    toast.success('Order placed successfully! 🎉');
  };

  // Generate next 7 days for date picker
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      value: d.toISOString().split('T')[0],
      label: d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }),
      dayName: d.toLocaleDateString('en-IN', { weekday: 'short' }),
      dayNum: d.getDate(),
    };
  });

  const selectedAddr = mockUser.addresses.find((a) => a.id === selectedAddress);

  if (orderPlaced) {
    return (
      <main className="pt-24 pb-16 min-h-screen bg-cream-50" id="main-content">
        <div className="container-app max-w-lg mx-auto text-center py-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} className="text-emerald-500" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h1 className="font-display text-3xl font-bold text-espresso-500 mb-2">Order Confirmed! 🎉</h1>
            <p className="text-espresso-300 mb-2">Thank you for your order.</p>
            <p className="text-sm bg-amber-50 text-amber-700 inline-block px-4 py-2 rounded-xl font-mono font-bold mb-6">
              Order ID: {orderId}
            </p>
            <p className="text-sm text-espresso-200 mb-8">
              Estimated delivery: {selectedDate ? new Date(selectedDate).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' }) : 'Tomorrow'}
              {selectedSlot && ` • ${timeSlots.find(s => s.id === selectedSlot)?.label}`}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => navigate('/account/orders')} variant="outline">
                Track Order
              </Button>
              <Button onClick={() => navigate('/products')} icon={<ChevronRight size={16} />} iconPosition="right">
                Continue Shopping
              </Button>
            </div>
            <p className="text-xs text-espresso-200 mt-6">📧 A confirmation email has been sent to your registered email address.</p>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-16 min-h-screen bg-cream-50" id="main-content">
      <div className="container-app max-w-4xl mx-auto">
        <h1 className="font-display text-3xl font-bold text-espresso-500 mb-8">Checkout</h1>

        {/* ─── Stepper ─── */}
        <div className="flex items-center justify-between mb-10 bg-white rounded-2xl p-4 shadow-card">
          {steps.map((step, i) => (
            <React.Fragment key={step.key}>
              <button
                onClick={() => i <= stepIndex && setCurrentStep(step.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  i <= stepIndex
                    ? i === stepIndex
                      ? 'bg-amber-400 text-espresso-500 font-bold'
                      : 'text-emerald-600 font-medium'
                    : 'text-espresso-200'
                }`}
                disabled={i > stepIndex}
              >
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm ${
                  i < stepIndex ? 'bg-emerald-100' : i === stepIndex ? 'bg-amber-500 text-white' : 'bg-cream-100'
                }`}>
                  {i < stepIndex ? <CheckCircle2 size={14} /> : i + 1}
                </span>
                <span className="hidden sm:inline text-sm">{step.label}</span>
              </button>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${i < stepIndex ? 'bg-emerald-400' : 'bg-cream-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ─── Step Content ─── */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-2xl p-6 shadow-card"
              >
                {/* Step 1: Address */}
                {currentStep === 'address' && (
                  <div className="space-y-6">
                    <h2 className="font-display text-xl font-bold text-espresso-500">Delivery Address</h2>
                    <div className="space-y-3">
                      {mockUser.addresses.map((addr) => (
                        <label
                          key={addr.id}
                          className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedAddress === addr.id
                              ? 'border-amber-400 bg-amber-50/50'
                              : 'border-cream-200 hover:border-cream-400'
                          }`}
                        >
                          <input
                            type="radio"
                            name="address"
                            value={addr.id}
                            checked={selectedAddress === addr.id}
                            onChange={() => setSelectedAddress(addr.id)}
                            className="mt-1 text-amber-400 focus:ring-amber-400"
                          />
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              {addr.addressType === 'home' ? <Home size={14} /> : <Building2 size={14} />}
                              <span className="font-semibold text-espresso-500 capitalize">{addr.addressType}</span>
                              {addr.isDefault && <span className="text-xs bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full">Default</span>}
                            </div>
                            <p className="text-sm text-espresso-300">{addr.name} • {addr.phone}</p>
                            <p className="text-sm text-espresso-200">{addr.addressLine1}, {addr.addressLine2}</p>
                            <p className="text-sm text-espresso-200">{addr.city}, {addr.state} - {addr.pincode}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                    <button className="flex items-center gap-2 text-sm text-amber-500 font-semibold hover:text-amber-600">
                      <Plus size={16} /> Add New Address
                    </button>
                    <div className="flex justify-end pt-4">
                      <Button onClick={nextStep} disabled={!selectedAddress} icon={<ChevronRight size={16} />} iconPosition="right">
                        Continue to Delivery
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Delivery */}
                {currentStep === 'delivery' && (
                  <div className="space-y-6">
                    <h2 className="font-display text-xl font-bold text-espresso-500">Choose Delivery Slot</h2>
                    {/* Date */}
                    <div>
                      <p className="text-sm font-semibold text-espresso-400 mb-3 flex items-center gap-2">
                        <Calendar size={16} /> Select Date
                      </p>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {availableDates.map((d) => (
                          <button
                            key={d.value}
                            onClick={() => setSelectedDate(d.value)}
                            className={`flex flex-col items-center px-4 py-3 rounded-xl border-2 min-w-[80px] transition-all ${
                              selectedDate === d.value ? 'border-amber-400 bg-amber-50' : 'border-cream-200 hover:border-cream-400'
                            }`}
                          >
                            <span className="text-xs text-espresso-200">{d.dayName}</span>
                            <span className="text-lg font-bold text-espresso-500">{d.dayNum}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Time Slot */}
                    <div>
                      <p className="text-sm font-semibold text-espresso-400 mb-3">Select Time</p>
                      <div className="grid grid-cols-3 gap-3">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.id}
                            onClick={() => setSelectedSlot(slot.id)}
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                              selectedSlot === slot.id ? 'border-amber-400 bg-amber-50' : 'border-cream-200 hover:border-cream-400'
                            }`}
                          >
                            <div className="text-amber-500">{slot.icon}</div>
                            <span className="text-sm font-medium text-espresso-500">{slot.name}</span>
                            <span className="text-xs text-espresso-200">{slot.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Special Instructions */}
                    <div>
                      <label className="text-sm font-semibold text-espresso-400 mb-2 block">Special Instructions</label>
                      <textarea
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        placeholder="Any special notes for delivery..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none resize-none text-sm"
                      />
                    </div>
                    <div className="flex justify-between pt-4">
                      <Button variant="ghost" onClick={prevStep}>← Back</Button>
                      <Button onClick={nextStep} disabled={!selectedDate || !selectedSlot} icon={<ChevronRight size={16} />} iconPosition="right">
                        Continue to Payment
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {currentStep === 'payment' && (
                  <div className="space-y-6">
                    <h2 className="font-display text-xl font-bold text-espresso-500">Payment Method</h2>
                    <div className="space-y-3">
                      {[
                        { id: 'upi', label: 'UPI (Google Pay, PhonePe)', desc: 'Pay directly from your bank', icon: '📱' },
                        { id: 'card', label: 'Credit/Debit Card', desc: 'Visa, Mastercard, RuPay', icon: '💳' },
                        { id: 'netbanking', label: 'Net Banking', desc: 'All major banks supported', icon: '🏦' },
                        { id: 'wallet', label: 'Wallet', desc: 'Paytm, Amazon Pay', icon: '👛' },
                        { id: 'cod', label: 'Cash on Delivery', desc: 'Available under ₹2,000', icon: '💵' },
                      ].map((method) => (
                        <div key={method.id} className="flex items-center gap-4 p-4 rounded-xl border border-cream-200 hover:border-amber-300 cursor-pointer transition-colors">
                          <span className="text-2xl">{method.icon}</span>
                          <div className="flex-1">
                            <p className="font-semibold text-espresso-500">{method.label}</p>
                            <p className="text-xs text-espresso-200">{method.desc}</p>
                          </div>
                          <ChevronRight size={16} className="text-espresso-200" />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between pt-4">
                      <Button variant="ghost" onClick={prevStep}>← Back</Button>
                      <Button onClick={nextStep} icon={<ChevronRight size={16} />} iconPosition="right">
                        Review Order
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 4: Confirm */}
                {currentStep === 'confirm' && (
                  <div className="space-y-6">
                    <h2 className="font-display text-xl font-bold text-espresso-500">Review Your Order</h2>
                    {/* Address Summary */}
                    <div className="p-4 bg-cream-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-espresso-400 flex items-center gap-2"><MapPin size={14} /> Delivery Address</span>
                        <button onClick={() => setCurrentStep('address')} className="text-xs text-amber-500 font-medium">Edit</button>
                      </div>
                      {selectedAddr && (
                        <p className="text-sm text-espresso-300">
                          {selectedAddr.name} • {selectedAddr.addressLine1}, {selectedAddr.city} - {selectedAddr.pincode}
                        </p>
                      )}
                    </div>
                    {/* Delivery Slot Summary */}
                    <div className="p-4 bg-cream-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-espresso-400 flex items-center gap-2"><Clock size={14} /> Delivery Slot</span>
                        <button onClick={() => setCurrentStep('delivery')} className="text-xs text-amber-500 font-medium">Edit</button>
                      </div>
                      <p className="text-sm text-espresso-300">
                        {selectedDate && new Date(selectedDate).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
                        {selectedSlot && ` • ${timeSlots.find(s => s.id === selectedSlot)?.label}`}
                      </p>
                    </div>
                    {/* Items */}
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-3 bg-cream-50 rounded-xl">
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-espresso-500 truncate">{item.name}</p>
                            <p className="text-xs text-espresso-200">{item.variantLabel} × {item.quantity}</p>
                          </div>
                          <span className="font-semibold text-sm">{formatCurrency(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between pt-4">
                      <Button variant="ghost" onClick={prevStep}>← Back</Button>
                      <Button onClick={handlePlaceOrder} size="lg" icon={<CheckCircle2 size={18} />}>
                        Place Order • {formatCurrency(getTotal())}
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ─── Mini Order Summary ─── */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl p-5 shadow-card sticky top-24 space-y-4">
              <h3 className="font-display font-bold text-espresso-500">Your Order</h3>
              {items.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-espresso-400 truncate">{item.name}</p>
                    <p className="text-xs text-espresso-200">×{item.quantity}</p>
                  </div>
                  <span className="text-xs font-semibold">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
              {items.length > 3 && <p className="text-xs text-espresso-200">+{items.length - 3} more items</p>}
              <hr className="border-cream-200" />
              <div className="flex justify-between font-bold text-espresso-500">
                <span>Total</span>
                <span>{formatCurrency(getTotal())}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
