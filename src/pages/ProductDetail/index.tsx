// ═══════════════════════════════════════
// CrumbleCo — Product Detail Page
// ═══════════════════════════════════════

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart, ShoppingBag, Zap, ChevronRight, Shield, Leaf, Award, RotateCcw,
  Star, ThumbsUp, Minus, Plus
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { StarRating } from '@/components/ui/StarRating';
import { Badge } from '@/components/ui/Badge';
import { ProductCard } from '@/components/shared/ProductCard';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { mockProducts, mockReviews } from '@/data/mockData';
import { formatCurrency, generateId } from '@/utils';
import { toast } from 'sonner';

const trustBadges = [
  { icon: <Leaf size={20} />, label: 'Fresh Daily' },
  { icon: <Award size={20} />, label: 'Handmade' },
  { icon: <Shield size={20} />, label: 'Hygienic' },
  { icon: <RotateCcw size={20} />, label: 'Easy Returns' },
];

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = mockProducts.find((p) => p.slug === slug);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'allergens' | 'reviews'>('description');
  const [selectedImage, setSelectedImage] = useState(0);
  const [customMessage, setCustomMessage] = useState('');

  const addItem = useCartStore((s) => s.addItem);
  const { isInWishlist, toggleItem } = useWishlistStore();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <span className="text-6xl mb-4 block">🍰</span>
          <h1 className="font-display text-3xl font-bold text-espresso-500 mb-2">Product Not Found</h1>
          <p className="text-espresso-200 mb-6">This item may have been removed or doesn't exist.</p>
          <Link to="/products" className="text-amber-500 font-semibold hover:underline">
            ← Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  const variant = product.variants[selectedVariant];
  const isWishlisted = isInWishlist(product.id);
  const relatedProducts = mockProducts.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);
  const reviews = mockReviews.filter((r) => r.productId === product.id);

  const handleAddToCart = () => {
    if (!variant) return;
    addItem({
      id: generateId(),
      productId: product.id,
      name: product.name,
      image: product.images[0]?.url || '',
      variantId: variant.id,
      variantLabel: variant.label,
      price: variant.price,
      originalPrice: variant.originalPrice,
      quantity,
      customMessage: customMessage || undefined,
      maxQuantity: product.stockCount,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlistToggle = () => {
    toggleItem({
      id: generateId(),
      productId: product.id,
      name: product.name,
      image: product.images[0]?.url || '',
      price: variant?.price || 0,
      inStock: product.stockCount > 0,
      addedAt: new Date().toISOString(),
    });
  };

  // Rating distribution (mock)
  const ratingDist = [
    { stars: 5, count: Math.floor(product.reviewCount * 0.6) },
    { stars: 4, count: Math.floor(product.reviewCount * 0.25) },
    { stars: 3, count: Math.floor(product.reviewCount * 0.1) },
    { stars: 2, count: Math.floor(product.reviewCount * 0.03) },
    { stars: 1, count: Math.floor(product.reviewCount * 0.02) },
  ];

  return (
    <main className="pt-24 pb-16 bg-cream-50 min-h-screen" id="main-content">
      <div className="container-app">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-espresso-200 mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/products" className="hover:text-amber-500 transition-colors">Menu</Link>
          <ChevronRight size={14} />
          <Link to={`/products?category=${product.categoryId}`} className="hover:text-amber-500 transition-colors">
            {product.categoryName}
          </Link>
          <ChevronRight size={14} />
          <span className="text-espresso-400 font-medium">{product.name}</span>
        </nav>

        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* ─── Image Gallery ─── */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-white shadow-card group">
                <img
                  src={product.images[selectedImage]?.url}
                  alt={product.images[selectedImage]?.alt || product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  width={600} height={600}
                />
                {product.badge && (
                  <div className="absolute top-4 left-4">
                    <Badge type={product.badge} salePercentage={product.salePercentage} />
                  </div>
                )}
              </div>
              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={img.id}
                      onClick={() => setSelectedImage(i)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        i === selectedImage ? 'border-amber-400 shadow-warm' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                      aria-label={`View image ${i + 1}`}
                    >
                      <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* ─── Product Info ─── */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            {/* Name & Rating */}
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-espresso-500 mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <StarRating rating={product.rating} size={18} showValue reviewCount={product.reviewCount} />
                {product.dietaryTags.length > 0 && (
                  <div className="flex gap-1">
                    {product.dietaryTags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs font-medium rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-espresso-500">{formatCurrency(variant?.price || 0)}</span>
              {variant?.originalPrice && (
                <>
                  <span className="text-xl text-espresso-200 line-through">{formatCurrency(variant.originalPrice)}</span>
                  <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-bold rounded-lg">
                    Save {formatCurrency(variant.originalPrice - variant.price)}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-espresso-300 leading-relaxed">{product.shortDescription}</p>

            {/* Variants */}
            <div>
              <p className="text-sm font-semibold text-espresso-400 mb-3">
                {product.variants[0]?.weight ? 'Weight' : 'Size'}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(i)}
                    disabled={!v.inStock}
                    className={`
                      px-5 py-2.5 rounded-xl font-medium text-sm border-2 transition-all
                      ${i === selectedVariant
                        ? 'bg-amber-400 border-amber-400 text-espresso-500'
                        : v.inStock
                          ? 'border-cream-300 text-espresso-300 hover:border-amber-300'
                          : 'border-cream-200 text-espresso-200 opacity-50 cursor-not-allowed line-through'}
                    `}
                  >
                    {v.label} — {formatCurrency(v.price)}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Message (for cakes) */}
            {product.isCustomizable && (
              <div>
                <label className="text-sm font-semibold text-espresso-400 mb-2 block">
                  🎂 Custom Message on Cake
                </label>
                <input
                  type="text"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="e.g. Happy Birthday, Priya!"
                  maxLength={50}
                  className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none"
                />
                <p className="text-xs text-espresso-200 mt-1">{customMessage.length}/50 characters</p>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 flex-wrap">
              {/* Quantity */}
              <div className="flex items-center border border-cream-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-cream-100 transition-colors"
                  aria-label="Decrease"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 h-12 flex items-center justify-center font-bold text-lg tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-cream-100 text-amber-600 transition-colors"
                  aria-label="Increase"
                >
                  <Plus size={18} />
                </button>
              </div>

              <Button onClick={handleAddToCart} size="lg" icon={<ShoppingBag size={18} />} className="flex-1">
                Add to Cart
              </Button>

              <Button onClick={handleAddToCart} variant="secondary" size="lg" icon={<Zap size={18} />}>
                Buy Now
              </Button>
            </div>

            {/* Wishlist */}
            <button
              onClick={handleWishlistToggle}
              className="flex items-center gap-2 text-sm text-espresso-300 hover:text-rose-500 transition-colors"
            >
              <Heart size={18} className={isWishlisted ? 'fill-rose-400 text-rose-400' : ''} />
              {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>

            {/* Stock Indicator */}
            {product.stockCount <= 5 && (
              <p className="text-sm text-red-500 font-semibold animate-pulse">
                🔥 Only {product.stockCount} left in stock! Order soon.
              </p>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-4 gap-3 pt-4 border-t border-cream-200">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="text-center p-3">
                  <div className="text-amber-500 flex justify-center mb-1">{badge.icon}</div>
                  <span className="text-xs text-espresso-300">{badge.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ─── Tabs Section ─── */}
        <div className="mb-16">
          <div className="flex gap-1 border-b border-cream-200 mb-6 overflow-x-auto">
            {(['description', 'ingredients', 'allergens', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-6 py-3 font-medium text-sm capitalize whitespace-nowrap border-b-2 transition-all
                  ${activeTab === tab
                    ? 'border-amber-400 text-amber-600'
                    : 'border-transparent text-espresso-200 hover:text-espresso-400'}
                `}
              >
                {tab} {tab === 'reviews' && `(${product.reviewCount})`}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-card">
            {activeTab === 'description' && (
              <div className="prose max-w-none text-espresso-300 leading-relaxed">
                <p>{product.description}</p>
              </div>
            )}
            {activeTab === 'ingredients' && (
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing) => (
                  <span key={ing} className="px-4 py-2 bg-cream-50 rounded-full text-sm text-espresso-400">
                    {ing}
                  </span>
                ))}
              </div>
            )}
            {activeTab === 'allergens' && (
              <div>
                <p className="text-sm text-red-500 font-semibold mb-3">⚠️ This product contains:</p>
                <div className="flex flex-wrap gap-2">
                  {product.allergens.map((a) => (
                    <span key={a} className="px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-medium">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* Rating Summary */}
                <div className="flex flex-col sm:flex-row gap-8 items-start">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-espresso-500 font-display">{product.rating}</p>
                    <StarRating rating={product.rating} size={18} />
                    <p className="text-sm text-espresso-200 mt-1">{product.reviewCount} reviews</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {ratingDist.map((d) => (
                      <div key={d.stars} className="flex items-center gap-3">
                        <span className="text-sm text-espresso-300 w-8">{d.stars}★</span>
                        <div className="flex-1 h-2 bg-cream-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full"
                            style={{ width: `${(d.count / product.reviewCount) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-espresso-200 w-10">{d.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-6 border-t border-cream-200 pt-6">
                  {reviews.length > 0 ? reviews.map((review) => (
                    <div key={review.id} className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center font-bold text-amber-600">
                          {review.userName.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-espresso-500">{review.userName}</p>
                            {review.isVerified && (
                              <span className="text-xs text-emerald-600 flex items-center gap-1">
                                <Award size={10} /> Verified
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <StarRating rating={review.rating} size={12} />
                            <span className="text-xs text-espresso-200">{review.createdAt}</span>
                          </div>
                        </div>
                      </div>
                      <h4 className="font-semibold text-espresso-400">{review.title}</h4>
                      <p className="text-sm text-espresso-300 leading-relaxed">{review.comment}</p>
                      <button className="flex items-center gap-1 text-xs text-espresso-200 hover:text-amber-500 transition-colors">
                        <ThumbsUp size={12} /> Helpful ({review.helpful})
                      </button>
                    </div>
                  )) : (
                    <p className="text-center text-espresso-200 py-8">No reviews yet. Be the first to review!</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ─── Related Products ─── */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-bold text-espresso-500 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ProductDetailPage;
