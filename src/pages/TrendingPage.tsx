import React, { useEffect, useState, useMemo } from 'react';
import { ArrowLeft, Sparkles, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/products/ProductCard';
import { getProducts, getCategories } from '../services';
import type { Product, Category } from '../types';

interface TrendingPageProps {
  onAddToCart?: (product: Product) => void;
}

export const TrendingPage: React.FC<TrendingPageProps> = ({ onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProducts(), getCategories()])
      .then(([productsData, categoriesData]) => {
        setProducts(Array.isArray(productsData) ? productsData : []);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      })
      .catch((error) => console.error('Failed to load trending data:', error))
      .finally(() => setLoading(false));
  }, []);

  const trendingProducts = useMemo(() => {
    const valid = products.filter((p) => p && typeof p === 'object' && p.isTrending);
    if (selectedCategory === 'all') return valid;
    return valid.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <main className="min-h-screen bg-[#F7F4EE] py-10 sm:py-14 lg:py-16">
      <div className="boho-container">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E4DED3]">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#927B60] hover:text-[#38352F] transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Collections</span>
          </Link>

          <span className="text-[10px] uppercase tracking-[0.2em] text-[#927B60] font-medium">
            Velqira Curations · 2026
          </span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-[#927B60] font-medium mb-3">
              <Flame className="w-4 h-4 text-[#A18B70]" />
              <span>Most Desired Creations</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#38352F] leading-tight">
              The Trending Edit.
            </h1>

            <p className="text-sm sm:text-base text-[#777064] mt-4 max-w-xl leading-relaxed">
              An evolving curation of this season's most sought-after silhouettes, artisanal accents, and daily treasures.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#777064]">
            <Sparkles className="w-4 h-4 text-[#A18B70]" />
            <span>Updated in real-time</span>
          </div>
        </div>

        {/* Category Filters Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-10 border-b border-[#E4DED3] no-scrollbar">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 text-[10px] uppercase tracking-[0.16em] font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#38352F] text-[#F7F4EE]'
                : 'bg-[#EEE9DF] text-[#777064] hover:text-[#38352F] hover:bg-[#E4DED3]'
            }`}
          >
            All Trending ({products.filter((p) => p.isTrending).length})
          </button>

          {categories.map((cat) => {
            const count = products.filter((p) => p.isTrending && p.category === cat.id).length;
            if (count === 0) return null;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-[10px] uppercase tracking-[0.16em] font-medium transition-all shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-[#38352F] text-[#F7F4EE]'
                    : 'bg-[#EEE9DF] text-[#777064] hover:text-[#38352F] hover:bg-[#E4DED3]'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="py-24 text-center">
            <p className="font-serif text-xl text-[#777064]">Gathering trending pieces...</p>
          </div>
        ) : trendingProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-7 lg:gap-x-10 gap-y-12">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#EEE9DF] border border-[#DED6C9] p-8 max-w-xl mx-auto">
            <h3 className="font-serif text-2xl text-[#38352F] mb-3">No trending pieces in this category yet</h3>
            <p className="text-xs text-[#777064] mb-6">Explore the full catalog to discover all our new arrivals.</p>
            <Link to="/shop" className="boho-button text-[10px] py-3.5 px-6">
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};
