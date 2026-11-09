import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { ProductCard } from '../products/ProductCard';

interface NewArrivalsProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({ products, onAddToCart }) => {
  return (
    <section className="py-20 bg-white border-b border-[#D9A6AB]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-[#C6A16B] mb-1">
              <Sparkles className="w-4 h-4 text-[#C6A16B]" />
              <span>Fresh Releases</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#332522] font-serif">New Arrivals</h2>
            <p className="text-sm text-[#332522]/70 mt-1">Newly crafted additions brought straight from our studio</p>
          </div>
          <Link
            to="/shop?filter=new"
            className="mt-4 sm:mt-0 text-sm font-bold text-[#332522] hover:text-[#C6A16B] transition-colors inline-flex items-center"
          >
            Explore New Releases <ArrowRight className="w-4 h-4 ml-1" />
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
