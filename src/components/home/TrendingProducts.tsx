import React from 'react';
import { Flame, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { ProductCard } from '../products/ProductCard';

interface TrendingProductsProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

export const TrendingProducts: React.FC<TrendingProductsProps> = ({ products, onAddToCart }) => {
  return (
    <section className="py-20 bg-[#FFF9F5] border-b border-[#D9A6AB]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-[#C6A16B] mb-1">
              <Flame className="w-4 h-4 text-[#D9A6AB] fill-[#D9A6AB]" />
              <span>Most Popular Choice</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#332522] font-serif">Trending Now</h2>
            <p className="text-sm text-[#332522]/70 mt-1">Discover the most sought-after products this season</p>
          </div>
          <Link
            to="/shop?filter=trending"
            className="mt-4 sm:mt-0 text-sm font-bold text-[#332522] hover:text-[#C6A16B] transition-colors inline-flex items-center"
          >
            Shop All Trending <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
};
