import React, { useEffect, useState } from 'react';
import { Flame, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/products/ProductCard';
import { fetchProductsFromAPI } from '../services/api';
import type { Product } from '../types';

interface TrendingPageProps {
  onAddToCart?: (product: Product) => void;
}

export const TrendingPage: React.FC<TrendingPageProps> = ({ onAddToCart }) => {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProductsFromAPI().then((all) => {
      const valid = (all || []).filter((p) => p && typeof p === 'object' && p.isTrending);
      setTrendingProducts(valid);
    });
  }, []);

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link to="/shop" className="inline-flex items-center text-sm font-semibold text-[#332522]/70 hover:text-[#C6A16B] mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Shop
        </Link>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#C6A16B] bg-[#E8BFC3]/30 px-3.5 py-1.5 rounded-full mb-3 border border-[#C6A16B]/30">
            <Flame className="w-3.5 h-3.5 text-[#D9A6AB] fill-[#D9A6AB]" />
            <span>Customer Favorites 2025</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif text-[#332522]">
            Trending Collection
          </h1>
          <p className="text-base text-[#332522]/80 mt-3 leading-relaxed">
            Discover the most popular, highly-rated, and sought-after essentials across our store.
          </p>
        </div>

        {/* Product Grid */}
        {trendingProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#D9A6AB]/30 text-[#332522]/70">
            <p className="text-lg font-bold font-serif">No trending items available at the moment.</p>
            <Link
              to="/shop"
              className="mt-4 inline-block bg-[#E8BFC3] text-[#332522] px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#D9A6AB] transition-colors"
            >
              Explore All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
