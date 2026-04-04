// ═══════════════════════════════════════
// CrumbleCo — Quantity Picker Component
// ═══════════════════════════════════════

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';

interface QuantityPickerProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  size?: 'sm' | 'md';
}

export const QuantityPicker: React.FC<QuantityPickerProps> = ({
  value,
  min = 1,
  max = 99,
  onChange,
  size = 'md',
}) => {
  const isSmall = size === 'sm';

  return (
    <div className={`inline-flex items-center gap-1 rounded-xl border border-cream-300 bg-white ${isSmall ? 'p-0.5' : 'p-1'}`}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={`
          flex items-center justify-center rounded-lg
          hover:bg-cream-200 transition-colors
          disabled:opacity-30 disabled:cursor-not-allowed
          ${isSmall ? 'w-7 h-7' : 'w-9 h-9'}
        `}
        aria-label="Decrease quantity"
      >
        <Minus size={isSmall ? 14 : 16} />
      </button>
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className={`font-semibold text-espresso-500 tabular-nums ${isSmall ? 'w-6 text-sm' : 'w-8 text-base'} text-center`}
        >
          {value}
        </motion.span>
      </AnimatePresence>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={`
          flex items-center justify-center rounded-lg
          hover:bg-amber-100 text-amber-600 transition-colors
          disabled:opacity-30 disabled:cursor-not-allowed
          ${isSmall ? 'w-7 h-7' : 'w-9 h-9'}
        `}
        aria-label="Increase quantity"
      >
        <Plus size={isSmall ? 14 : 16} />
      </button>
    </div>
  );
};
