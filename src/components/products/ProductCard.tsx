import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag } from 'lucide-react';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const isAvailable = product.inStock !== false;

  return (
    <div className="group relative bg-white border border-[#D9A6AB]/30 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col h-full">
      <div className="aspect-square bg-[#FFF9F5] overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ${
            !isAvailable ? 'opacity-60 grayscale' : ''
          }`}
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-[#E8BFC3] text-[#332522] text-[10px] px-2 py-0.5 font-bold uppercase rounded-md shadow-xs">
              New
            </span>
          )}
          {!isAvailable ? (
            <span className="bg-[#332522] text-[#FFF9F5] text-[10px] px-2 py-0.5 font-bold uppercase rounded-md shadow-xs">
              Out of Stock
            </span>
          ) : (
            <span className="bg-[#C6A16B]/20 text-[#332522] border border-[#C6A16B]/40 text-[10px] px-2 py-0.5 font-semibold uppercase rounded-md backdrop-blur-xs">
              In Stock
            </span>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center space-x-1 text-[#C6A16B] text-xs mb-1">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="font-medium text-[#332522]">{product.rating}</span>
            <span className="text-[#332522]/50">({product.reviewsCount})</span>
          </div>

          <Link to={`/product/${product.id}`}>
            <h3 className="text-base font-semibold font-serif text-[#332522] hover:text-[#C6A16B] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-[#332522]/70 mt-1 line-clamp-2">{product.description}</p>
        </div>

        <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#D9A6AB]/15">
          <div className="flex items-baseline space-x-2">
            <span className="text-lg font-bold text-[#332522]">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-[#332522]/40 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => isAvailable && onAddToCart && onAddToCart(product)}
            disabled={!isAvailable}
            className={`p-2.5 rounded-full transition-colors ${
              isAvailable
                ? 'bg-[#E8BFC3] text-[#332522] hover:bg-[#D9A6AB] cursor-pointer'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            title={isAvailable ? 'Add to cart' : 'Out of stock'}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
