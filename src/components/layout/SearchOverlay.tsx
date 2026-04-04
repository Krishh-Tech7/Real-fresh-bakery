// ═══════════════════════════════════════
// CrumbleCo — Search Overlay
// ═══════════════════════════════════════

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockProducts } from '@/data/mockData';
import { formatCurrency } from '@/utils';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const trendingSearches = ['Chocolate Cake', 'Sourdough', 'Croissant', 'Gluten-Free', 'Birthday Cake'];

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const results = query.length >= 2
    ? mockProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-espresso-500/50 backdrop-blur-md"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="w-full max-w-2xl mx-auto mt-20 px-4"
          >
            {/* Search Input */}
            <div className="relative">
              <Search size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-espresso-200" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for breads, cakes, pastries..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-14 pr-14 py-5 text-lg bg-white rounded-2xl shadow-xl border-0 focus:outline-none focus:ring-2 focus:ring-amber-400 font-body text-espresso-500 placeholder:text-espresso-200"
                aria-label="Search products"
              />
              <button
                onClick={onClose}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-cream-100 rounded-lg transition-colors"
                aria-label="Close search"
              >
                <X size={20} className="text-espresso-300" />
              </button>
            </div>

            {/* Results / Suggestions */}
            <div className="mt-4 bg-white rounded-2xl shadow-xl overflow-hidden">
              {query.length < 2 ? (
                <div className="p-6 space-y-6">
                  {/* Trending */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-espresso-200 mb-3 flex items-center gap-2">
                      <TrendingUp size={14} /> Trending Searches
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {trendingSearches.map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-4 py-2 bg-cream-100 hover:bg-amber-50 text-espresso-400 rounded-full text-sm font-medium transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Recent */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-espresso-200 mb-3 flex items-center gap-2">
                      <Clock size={14} /> Popular Categories
                    </h3>
                    <div className="space-y-1">
                      {['Cakes', 'Artisan Breads', 'Pastries'].map((cat) => (
                        <Link
                          key={cat}
                          to={`/products?category=${cat.toLowerCase()}`}
                          onClick={onClose}
                          className="flex items-center justify-between px-3 py-2.5 hover:bg-cream-50 rounded-xl text-espresso-400 transition-colors"
                        >
                          <span>{cat}</span>
                          <ArrowRight size={14} className="text-espresso-200" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : results.length > 0 ? (
                <div className="divide-y divide-cream-100">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      to={`/products/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-4 p-4 hover:bg-cream-50 transition-colors"
                    >
                      <img
                        src={product.images[0]?.url}
                        alt={product.name}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-espresso-500 truncate">{product.name}</p>
                        <p className="text-sm text-espresso-200">{product.categoryName}</p>
                      </div>
                      <span className="font-bold text-amber-500">
                        {formatCurrency(product.variants[0]?.price ?? 0)}
                      </span>
                    </Link>
                  ))}
                  <Link
                    to={`/products?search=${query}`}
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 p-4 text-amber-500 font-semibold hover:bg-amber-50 transition-colors"
                  >
                    View all results for "{query}" <ArrowRight size={16} />
                  </Link>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-espresso-200 text-lg">No products found for "{query}"</p>
                  <p className="text-sm text-espresso-200 mt-1">Try searching for cakes, breads, or cookies</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
