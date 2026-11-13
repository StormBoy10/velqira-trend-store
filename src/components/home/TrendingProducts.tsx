import React from 'react';
import { Flame, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { ProductCard } from '../products/ProductCard';

interface TrendingProductsProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

export const TrendingProducts: React.FC<TrendingProductsProps> = ({
  products,
  onAddToCart,
}) => {
  return (
    <section className="boho-section bg-[#F7F4EE] border-b border-[#DED6C9]">
      <div className="boho-container">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-5">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-medium text-[#927B60] mb-3">
              <Flame className="w-4 h-4" />
              <span>Customer favourites</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-serif text-[#38352F]">
              Trending now
            </h2>

            <p className="text-sm sm:text-base text-[#777064] mt-3">
              Discover the pieces everyone is loving this season.
            </p>
          </div>

          <Link
            to="/shop?filter=trending"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-medium text-[#38352F] border-b border-[#A18B70] pb-2 hover:text-[#927B60] transition-colors"
          >
            Shop trending
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-7 lg:gap-x-10 gap-y-12">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center font-serif text-xl text-[#777064]">
            New favourites will be arriving soon.
          </p>
        )}

      </div>
    </section>
  );
};
