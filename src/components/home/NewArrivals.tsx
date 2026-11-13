import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { ProductCard } from '../products/ProductCard';

interface NewArrivalsProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({
  products,
  onAddToCart,
}) => {
  return (
    <section className="py-20 sm:py-24 bg-[#EEE9DF] border-b border-[#DED6C9]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-5">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-medium text-[#927B60] mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Just arrived</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-serif text-[#38352F]">
              New arrivals
            </h2>

            <p className="text-sm sm:text-base text-[#777064] mt-3 max-w-lg">
              Explore our latest finds, selected to bring a little
              something special to your everyday style.
            </p>
          </div>

          <Link
            to="/shop?filter=new"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-medium text-[#38352F] border-b border-[#A18B70] pb-2 hover:text-[#927B60] transition-colors"
          >
            Discover new pieces
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
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
            Something beautiful is on its way.
          </p>
        )}

      </div>
    </section>
  );
};
