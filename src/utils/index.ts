import { clsx, type ClassValue } from 'clsx';

/** Merge class names conditionally (Tailwind-friendly) */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/** Format currency in INR */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Generate a URL-friendly slug */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Truncate text with ellipsis */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
}

/** Calculate discount percentage */
export function calcDiscount(original: number, sale: number): number {
  return Math.round(((original - sale) / original) * 100);
}

/** Debounce function */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/** Generate random ID */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

/** Pluralize a word */
export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural ?? singular + 's');
}
