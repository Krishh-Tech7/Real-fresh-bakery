// ═══════════════════════════════════════
// CrumbleCo — Product Listing Page
// ═══════════════════════════════════════

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SlidersHorizontal, Grid3X3, List, ChevronDown, X, Star, Filter
} from 'lucide-react';
import { ProductCard } from '@/components/shared/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { mockProducts, mockCategories } from '@/data/mockData';
import { CATEGORIES } from '@/constants';
import type { SortOption, DietaryTag } from '@/types';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Highest Rated' },
];

const dietaryOptions: { value: DietaryTag; label: string }[] = [
  { value: 'eggless', label: 'Eggless' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'gluten-free', label: 'Gluten-Free' },
  { value: 'sugar-free', label: 'Sugar-Free' },
  { value: 'nut-free', label: 'Nut-Free' },
];

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter state from URL
  const activeCategory = searchParams.get('category') || 'all';
  const activeSort = (searchParams.get('sort') as SortOption) || 'popular';
  const activeDietary = searchParams.getAll('dietary') as DietaryTag[];
  const activeRating = Number(searchParams.get('rating')) || 0;
  const searchQuery = searchParams.get('search') || '';
  const priceMin = Number(searchParams.get('priceMin')) || 0;
  const priceMax = Number(searchParams.get('priceMax')) || 5000;

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const toggleDietary = (tag: DietaryTag) => {
    const newParams = new URLSearchParams(searchParams);
    const existing = newParams.getAll('dietary');
    newParams.delete('dietary');
    if (existing.includes(tag)) {
      existing.filter((t) => t !== tag).forEach((t) => newParams.append('dietary', t));
    } else {
      [...existing, tag].forEach((t) => newParams.append('dietary', t));
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => setSearchParams({});

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];

    // Search
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.categoryId === activeCategory || p.categoryName.toLowerCase().replace(/\s+/g, '-') === activeCategory);
    }

    // Dietary
    if (activeDietary.length > 0) {
      result = result.filter((p) => activeDietary.some((tag) => p.dietaryTags.includes(tag)));
    }

    // Rating
    if (activeRating > 0) {
      result = result.filter((p) => p.rating >= activeRating);
    }

    // Price range
    result = result.filter((p) => {
      const price = p.variants[0]?.price ?? 0;
      return price >= priceMin && price <= priceMax;
    });

    // Sort
    switch (activeSort) {
      case 'price-low':
        result.sort((a, b) => (a.variants[0]?.price ?? 0) - (b.variants[0]?.price ?? 0));
        break;
      case 'price-high':
        result.sort((a, b) => (b.variants[0]?.price ?? 0) - (a.variants[0]?.price ?? 0));
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default: // popular - by review count
        result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [activeCategory, activeSort, activeDietary, activeRating, searchQuery, priceMin, priceMax]);

  const hasActiveFilters = activeCategory !== 'all' || activeDietary.length > 0 || activeRating > 0 || searchQuery;

  return (
    <main className="pt-24 pb-16 min-h-screen bg-cream-50" id="main-content">
      <div className="container-app">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-espresso-500 mb-2">Our Menu</h1>
          <p className="text-espresso-300">Discover our freshly baked collection</p>
        </div>

        <div className="flex gap-8">
          {/* ─── Sidebar (Desktop) ─── */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div className="bg-white rounded-2xl p-5 shadow-card">
                <h3 className="font-display font-bold text-espresso-500 mb-4">Categories</h3>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => updateFilter('category', cat.id === 'all' ? '' : cat.slug)}
                      className={`
                        w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left
                        ${(activeCategory === cat.slug || (cat.id === 'all' && activeCategory === 'all'))
                          ? 'bg-amber-50 text-amber-600'
                          : 'text-espresso-300 hover:bg-cream-50'}
                      `}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dietary Filters */}
              <div className="bg-white rounded-2xl p-5 shadow-card">
                <h3 className="font-display font-bold text-espresso-500 mb-4">Dietary</h3>
                <div className="space-y-2">
                  {dietaryOptions.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={activeDietary.includes(opt.value)}
                        onChange={() => toggleDietary(opt.value)}
                        className="w-4 h-4 rounded border-cream-300 text-amber-400 focus:ring-amber-400"
                      />
                      <span className="text-sm text-espresso-300 group-hover:text-espresso-500 transition-colors">
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="bg-white rounded-2xl p-5 shadow-card">
                <h3 className="font-display font-bold text-espresso-500 mb-4">Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2].map((r) => (
                    <button
                      key={r}
                      onClick={() => updateFilter('rating', activeRating === r ? '' : String(r))}
                      className={`
                        w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors
                        ${activeRating === r ? 'bg-amber-50 text-amber-600' : 'text-espresso-300 hover:bg-cream-50'}
                      `}
                    >
                      <Star size={14} className="fill-amber-400 text-amber-400" />
                      {r}+ and above
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full py-3 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </aside>

          {/* ─── Main Content ─── */}
          <div className="flex-1 min-w-0">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-card text-sm font-medium"
                >
                  <Filter size={16} />
                  Filters
                  {hasActiveFilters && <span className="w-2 h-2 bg-amber-400 rounded-full" />}
                </button>
                <p className="text-sm text-espresso-200">
                  <span className="font-semibold text-espresso-400">{filteredProducts.length}</span> products found
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={activeSort}
                    onChange={(e) => updateFilter('sort', e.target.value)}
                    className="appearance-none bg-white border border-cream-300 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-espresso-400 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                    aria-label="Sort products"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-espresso-200 pointer-events-none" />
                </div>

                {/* View Mode */}
                <div className="hidden sm:flex items-center bg-white rounded-xl border border-cream-300 p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-amber-100 text-amber-600' : 'text-espresso-200'}`}
                    aria-label="Grid view"
                  >
                    <Grid3X3 size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-amber-100 text-amber-600' : 'text-espresso-200'}`}
                    aria-label="List view"
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filter Tags */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {activeCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-600 rounded-full text-xs font-medium">
                    {activeCategory}
                    <button onClick={() => updateFilter('category', '')} aria-label="Remove category filter"><X size={12} /></button>
                  </span>
                )}
                {activeDietary.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium">
                    {tag}
                    <button onClick={() => toggleDietary(tag)} aria-label={`Remove ${tag} filter`}><X size={12} /></button>
                  </span>
                ))}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                    Search: {searchQuery}
                    <button onClick={() => updateFilter('search', '')} aria-label="Clear search"><X size={12} /></button>
                  </span>
                )}
              </div>
            )}

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-display text-2xl font-bold text-espresso-400 mb-2">No products found</h3>
                <p className="text-espresso-200 mb-6">Try adjusting your filters or browse our full menu.</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-amber-400 text-espresso-500 font-bold rounded-xl hover:bg-amber-500 transition-colors"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40 lg:hidden"
              onClick={() => setShowFilters(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[80vh] overflow-auto p-6 lg:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl font-bold">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="p-2"><X size={20} /></button>
              </div>
              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm text-espresso-400 mb-3">Category</h4>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { updateFilter('category', cat.id === 'all' ? '' : cat.slug); }}
                      className={`px-4 py-2 rounded-full text-sm border ${
                        (activeCategory === cat.slug || (cat.id === 'all' && activeCategory === 'all'))
                          ? 'bg-amber-400 border-amber-400 text-espresso-500' : 'border-cream-300 text-espresso-300'
                      }`}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>
              </div>
              {/* Dietary */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm text-espresso-400 mb-3">Dietary</h4>
                {dietaryOptions.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-3 py-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeDietary.includes(opt.value)}
                      onChange={() => toggleDietary(opt.value)}
                      className="w-4 h-4 rounded text-amber-400 focus:ring-amber-400"
                    />
                    <span className="text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>
              <button
                onClick={() => setShowFilters(false)}
                className="w-full py-3 bg-amber-400 text-espresso-500 font-bold rounded-xl"
              >
                Show {filteredProducts.length} Results
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
};

export default ProductsPage;
