import React from 'react';
import { Flame } from 'lucide-react';
import type { Product } from '../../types';
import { ProductShowcase } from './ProductShowcase';

interface TrendingProductsProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

export const TrendingProducts: React.FC<TrendingProductsProps> = ({
  products,
  onAddToCart,
}) => {
  return (
    <ProductShowcase
      eyebrow="Customer Favourites"
      title="Trending Now"
      subtitle="Discover the handpicked pieces everyone is loving this season."
      linkText="Shop All Trending"
      linkUrl="/trending"
      icon={<Flame className="w-4 h-4 text-[#E8BFC3]" />}
      tone="cream"
      products={products}
      onAddToCart={onAddToCart}
      emptyMessage="New trending favourites will be arriving soon."
    />
  );
};
