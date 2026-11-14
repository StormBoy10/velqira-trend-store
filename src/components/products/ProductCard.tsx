import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag } from 'lucide-react';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  if (!product || typeof product !== 'object') return null;

  const isAvailable = product.inStock !== false;

  const productPrice =
    typeof product.price === 'number'
      ? product.price
      : parseFloat(String(product.price)) || 0;

  const originalPrice = Number(product.originalPrice);

  return (
    <article className="group relative flex h-full flex-col">

      {/* 1:1 Proportional Square Product Image */}
      <div className="relative aspect-square overflow-hidden bg-[#E8E1D5]">

        <Link
          to={`/product/${product.id}`}
          className="block h-full w-full"
          aria-label={`View ${product.name || 'product'}`}
        >
          <img
            src={
              product.image ||
              'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=85'
            }
            alt={product.name || 'Product'}
            loading="lazy"
            className={`h-full w-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
              !isAvailable ? 'opacity-60 grayscale' : ''
            }`}
          />
        </Link>

        {/* Product labels */}
        <div className="absolute top-3 left-3 flex flex-col items-start gap-2 pointer-events-none">

          {product.isNew && (
            <span className="bg-[#F7F4EE] text-[#38352F] text-[9px] px-3 py-1.5 uppercase tracking-[0.16em] font-medium">
              New arrival
            </span>
          )}

          {!isAvailable && (
            <span className="bg-[#38352F] text-[#F7F4EE] text-[9px] px-3 py-1.5 uppercase tracking-[0.16em] font-medium">
              Sold out
            </span>
          )}

        </div>

        {/* Add to cart overlay */}
        <button
          type="button"
          onClick={() => {
            if (isAvailable && onAddToCart) {
              onAddToCart(product);
            }
          }}
          disabled={!isAvailable || !onAddToCart}
          aria-label={
            !isAvailable
              ? 'Out of stock'
              : 'Add to cart'
          }
          title={
            !isAvailable
              ? 'Out of stock'
              : 'Add to cart'
          }
          className={`absolute bottom-3.5 right-3.5 flex h-10 w-10 items-center justify-center rounded-full shadow-sm transition-all duration-300 ${
            isAvailable && onAddToCart
              ? 'bg-[#F7F4EE] text-[#38352F] hover:bg-[#38352F] hover:text-[#F7F4EE] hover:scale-105'
              : 'bg-[#D6D0C5] text-[#8B857B] cursor-not-allowed'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>

      {/* Product information */}
      <div className="flex flex-1 flex-col pt-3.5">

        <div className="flex items-center gap-1.5 mb-1.5 text-[11px]">
          <Star className="w-3 h-3 fill-[#A18B70] text-[#A18B70]" />

          <span className="font-medium text-[#38352F]">
            {product.rating || 5.0}
          </span>

          <span className="text-[#999184]">
            ({product.reviewsCount || 0} reviews)
          </span>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-base sm:text-lg text-[#38352F] leading-snug transition-colors duration-300 group-hover:text-[#927B60] line-clamp-1">
            {product.name || 'Untitled Product'}
          </h3>
        </Link>

        <p className="mt-1 text-xs text-[#777064] leading-relaxed line-clamp-2">
          {product.description || ''}
        </p>

        <div className="mt-auto flex items-center gap-3 pt-3">
          <span className="text-base font-medium text-[#38352F]">
            ₹{productPrice.toFixed(2)}
          </span>

          {Number.isFinite(originalPrice) &&
            originalPrice > productPrice && (
              <span className="text-xs text-[#999184] line-through">
                ₹{originalPrice.toFixed(2)}
              </span>
            )}
        </div>

        <div className="mt-2.5 h-px w-full bg-[#D8D0C3] transition-colors duration-300 group-hover:bg-[#A18B70]" />

      </div>
    </article>
  );
};
