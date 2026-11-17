import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart } from 'lucide-react';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  const [isSaved, setIsSaved] = useState(false);

  if (!product || typeof product !== 'object') return null;

  const isAvailable = product.inStock !== false;

  const productPrice =
    typeof product.price === 'number'
      ? product.price
      : parseFloat(String(product.price)) || 0;

  const originalPrice = Number(product.originalPrice);
  const hasDiscount = Number.isFinite(originalPrice) && originalPrice > productPrice;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - productPrice) / originalPrice) * 100)
    : 0;

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved((prev) => !prev);
  };

  return (
    <article className="group relative flex h-full flex-col rounded-[24px] border border-[#C6A16B]/35 bg-[#FFF9F5] p-2 sm:p-3 shadow-xs hover:border-[#C6A16B] hover:-translate-y-2 hover:shadow-xl transition-all duration-500 ease-out select-none">

      {/* 4:5 Portrait Photo Area with 18px Corners */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[18px] ring-1 ring-[#D9A6AB]/30 bg-[#FFF9F5]">

        <Link
          to={`/product/${product.id}`}
          className="block h-full w-full"
          aria-label={`View details for ${product.name || 'product'}`}
        >
          <img
            src={
              product.image ||
              'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=85'
            }
            alt={product.name || 'Product photo'}
            loading="lazy"
            className={`h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 ${
              !isAvailable ? 'opacity-60 grayscale' : ''
            }`}
          />
        </Link>

        {/* Top-Left Badges: New (Rose), Discount (Gold), Sold Out (Ink) */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col items-start gap-1.5 pointer-events-none">
          {product.isNew && (
            <span className="bg-[#E8BFC3] text-[#332522] text-[9px] uppercase tracking-[0.18em] font-bold px-3 py-1 rounded-full shadow-xs">
              New
            </span>
          )}

          {hasDiscount && (
            <span className="bg-[#C6A16B] text-[#FFF9F5] text-[9px] uppercase tracking-[0.18em] font-bold px-3 py-1 rounded-full shadow-xs">
              -{discountPercent}%
            </span>
          )}

          {!isAvailable && (
            <span className="bg-[#332522] text-[#FFF9F5] text-[9px] uppercase tracking-[0.18em] font-bold px-3 py-1 rounded-full shadow-xs">
              Sold out
            </span>
          )}
        </div>

        {/* Top-Right Heart Wishlist Button (44px touch target) */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-2.5 right-2.5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#D9A6AB]/40 shadow-sm transition-all duration-300 active:scale-90 cursor-pointer ${
            isSaved
              ? 'bg-[#E8BFC3] text-white border-[#E8BFC3]'
              : 'bg-[#FFF9F5]/90 text-[#332522] hover:bg-white hover:text-[#E8BFC3]'
          }`}
        >
          <Heart size={18} className={isSaved ? 'fill-current' : ''} />
        </button>

        {/* Desktop Add to Bag Slide-Up Button */}
        <div className="absolute bottom-3 left-3 right-3 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (isAvailable && onAddToCart) onAddToCart(product);
            }}
            disabled={!isAvailable || !onAddToCart}
            className={`w-full py-2.5 rounded-xl text-xs uppercase font-bold tracking-widest transition-all duration-300 pointer-events-auto flex items-center justify-center gap-2 shadow-md ${
              isAvailable && onAddToCart
                ? 'bg-[#E8BFC3] text-[#332522] hover:bg-[#D9A6AB] cursor-pointer'
                : 'bg-[#D6D0C5] text-[#8B857B] cursor-not-allowed'
            }`}
          >
            <ShoppingBag size={14} />
            <span>{isAvailable ? 'Add To Bag' : 'Sold Out'}</span>
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="flex flex-1 flex-col pt-3 px-1">

        {/* Star Rating */}
        <div className="flex items-center gap-1.5 text-xs text-[#C6A16B] mb-1">
          <div className="flex items-center gap-0.5">
            <Star size={12} className="fill-current" />
            <span className="font-bold text-[#332522] ml-1">{product.rating || 5.0}</span>
          </div>
          <span className="text-[#332522]/40 text-[11px]">({product.reviewsCount || 0})</span>
        </div>

        {/* Product Title */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-base sm:text-xl font-semibold text-[#332522] leading-snug transition-colors duration-300 group-hover:text-[#C6A16B] line-clamp-1">
            {product.name || 'Untitled Product'}
          </h3>
        </Link>

        {/* Product Description */}
        {product.description && (
          <p className="mt-1 text-xs text-[#332522]/70 leading-relaxed line-clamp-2 font-light hidden sm:block">
            {product.description}
          </p>
        )}

        {/* Thin Rose Divider */}
        <div className="mt-3 mb-2 h-px w-full bg-[#D9A6AB]/30" />

        {/* Price & Mobile Cart Button Row */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-xl font-bold text-[#332522]">
              ₹{productPrice.toFixed(2)}
            </span>

            {hasDiscount && (
              <span className="text-xs text-[#332522]/50 line-through font-mono">
                ₹{originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Mobile Round 40px Rose Cart Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (isAvailable && onAddToCart) onAddToCart(product);
            }}
            disabled={!isAvailable || !onAddToCart}
            aria-label="Add to bag"
            className={`flex sm:hidden h-10 w-10 items-center justify-center rounded-full shadow-xs transition-all active:scale-90 ${
              isAvailable && onAddToCart
                ? 'bg-[#E8BFC3] text-[#332522] active:bg-[#D9A6AB]'
                : 'bg-[#D6D0C5] text-[#8B857B] cursor-not-allowed'
            }`}
          >
            <ShoppingBag size={16} />
          </button>
        </div>

      </div>
    </article>
  );
};
