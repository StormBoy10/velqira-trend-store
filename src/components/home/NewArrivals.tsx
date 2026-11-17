import React from 'react';
import { Sparkles } from 'lucide-react';
import type { Product } from '../../types';
import { ProductShowcase } from './ProductShowcase';

interface NewArrivalsProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({
  products,
  onAddToCart,
}) => {
  return (
    <ProductShowcase
      eyebrow="Just Arrived"
      title="New Arrivals"
      subtitle="Explore our latest finds, selected to bring a little something special to your everyday style."
      linkText="Explore New Releases"
      linkUrl="/shop?filter=new"
      icon={<Sparkles className="w-4 h-4 text-[#C6A16B]" />}
      tone="white"
      products={products}
      onAddToCart={onAddToCart}
      emptyMessage="Something beautiful is on its way."
    />
  );
};
