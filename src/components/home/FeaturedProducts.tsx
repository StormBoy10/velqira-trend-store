import React from 'react';
import type { Product } from '../../types';
import { ProductCard } from '../products/ProductCard';

interface FeaturedProductsProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products, onAddToCart }) => {
  return (
    <section className="py-16 bg-[#FFF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C6A16B]">Selection</span>
          <h2 className="text-3xl font-bold text-[#332522] font-serif mt-1">Featured Products</h2>
          <p className="text-[#332522]/70 mt-2">Handpicked customer favorites crafted with perfection</p>
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
