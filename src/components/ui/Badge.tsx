// ═══════════════════════════════════════
// CrumbleCo — Badge Component
// ═══════════════════════════════════════

import React from 'react';
import type { BadgeType } from '@/types';

interface BadgeProps {
  type: BadgeType;
  salePercentage?: number;
  className?: string;
}

const badgeConfig: Record<BadgeType, { label: string; classes: string }> = {
  new: { label: 'New', classes: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  bestseller: { label: 'Bestseller', classes: 'bg-amber-100 text-amber-700 border-amber-200' },
  limited: { label: 'Limited', classes: 'bg-purple-100 text-purple-700 border-purple-200' },
  sale: { label: 'Sale', classes: 'bg-red-100 text-red-700 border-red-200' },
};

export const Badge: React.FC<BadgeProps> = ({ type, salePercentage, className = '' }) => {
  const config = badgeConfig[type];
  const label = type === 'sale' && salePercentage ? `-${salePercentage}%` : config.label;

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold font-body
        border uppercase tracking-wide
        ${config.classes}
        ${className}
      `}
    >
      {label}
    </span>
  );
};
