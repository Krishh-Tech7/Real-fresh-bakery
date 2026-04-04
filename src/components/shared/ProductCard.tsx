// ═══════════════════════════════════════
// CrumbleCo — Product Card Component
// ═══════════════════════════════════════

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Plus, Minus } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { StarRating } from '@/components/ui/StarRating';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { formatCurrency, generateId } from '@/utils';
import type { Product } from '@/types';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { isInWishlist, toggleItem } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  const variant = product.variants[selectedVariant];
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    addItem({
      id: generateId(),
      productId: product.id,
      name: product.name,
      image: primaryImage?.url || '',
      variantId: variant.id,
      variantLabel: variant.label,
      price: variant.price,
      originalPrice: variant.originalPrice,
      quantity,
      maxQuantity: product.stockCount,
    });
    toast.success(`${product.name} added to cart!`, {
      description: `${variant.label} × ${quantity}`,
    });
    setQuantity(1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem({
      id: generateId(),
      productId: product.id,
      name: product.name,
      image: primaryImage?.url || '',
      price: variant?.price || 0,
      inStock: product.stockCount > 0,
      addedAt: new Date().toISOString(),
    });
    toast(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist ❤️');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/products/${product.slug}`} className="block">
        <div className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group-hover:-translate-y-1">
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden bg-cream-100">
            {!imageLoaded && (
              <div className="absolute inset-0 shimmer" />
            )}
            <img
              src={primaryImage?.url}
              alt={primaryImage?.alt || product.name}
              loading="lazy"
              width={400}
              height={300}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Badge */}
            {product.badge && (
              <div className="absolute top-3 left-3">
                <Badge type={product.badge} salePercentage={product.salePercentage} />
              </div>
            )}

            {/* Wishlist Button */}
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={handleWishlistToggle}
              className="absolute top-3 right-3 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart
                size={18}
                className={`transition-colors ${isWishlisted ? 'fill-rose-400 text-rose-400' : 'text-espresso-300'}`}
              />
            </motion.button>

            {/* Stock Warning */}
            {product.stockCount <= 5 && product.stockCount > 0 && (
              <div className="absolute bottom-3 left-3 bg-red-500/90 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                Only {product.stockCount} left!
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Category & Rating */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-espresso-200 uppercase tracking-wider font-bold">
                {product.categoryName}
              </span>
              <StarRating rating={product.rating} size={14} showValue reviewCount={product.reviewCount} />
            </div>

            {/* Name & Description */}
            <h3 className="font-display font-bold text-lg text-espresso-500 leading-tight line-clamp-1 group-hover:text-amber-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-espresso-300 line-clamp-2 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Variant Pills */}
            <div className="flex flex-wrap gap-1.5">
              {product.variants.map((v, i) => (
                <button
                  key={v.id}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedVariant(i); }}
                  className={`
                    px-3 py-1 rounded-full text-xs font-medium border transition-all
                    ${i === selectedVariant
                      ? 'bg-amber-400 border-amber-400 text-espresso-500'
                      : 'border-cream-300 text-espresso-300 hover:border-amber-300'}
                    ${!v.inStock ? 'opacity-40 line-through cursor-not-allowed' : ''}
                  `}
                  disabled={!v.inStock}
                >
                  {v.label}
                </button>
              ))}
            </div>

            {/* Price & Add to Cart */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-espresso-500">
                  {formatCurrency(variant?.price || 0)}
                </span>
                {variant?.originalPrice && (
                  <span className="text-sm text-espresso-200 line-through">
                    {formatCurrency(variant.originalPrice)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2" onClick={(e) => e.preventDefault()}>
                {/* Quantity */}
                <div className="flex items-center gap-0.5 bg-cream-100 rounded-lg p-0.5">
                  <button
                    onClick={(e) => { e.stopPropagation(); setQuantity(Math.max(1, quantity - 1)); }}
                    className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white transition-colors"
                    aria-label="Decrease"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-6 text-center text-sm font-semibold">{quantity}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setQuantity(Math.min(product.stockCount, quantity + 1)); }}
                    className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white text-amber-600 transition-colors"
                    aria-label="Increase"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                {/* Add to Cart */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleAddToCart}
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-espresso-500 rounded-xl text-sm font-bold transition-colors"
                  aria-label={`Add ${product.name} to cart`}
                >
                  <ShoppingBag size={14} />
                  <span className="hidden sm:inline">Add</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
