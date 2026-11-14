import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Category } from '../../types';

interface CategoryCardProps {
  category: Category;
  productCount?: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  productCount,
}) => {
  const categorySlug = category.slug || category.id;
  const count = productCount !== undefined ? productCount : (category.itemCount ?? 0);

  return (
    <Link
      to={`/shop?category=${encodeURIComponent(categorySlug)}`}
      className="group relative block w-full aspect-[4/3] overflow-hidden bg-[#E8E1D5]"
    >
      <img
        src={
          category.image ||
          'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&auto=format&fit=crop&q=85'
        }
        alt={category.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#27241F]/80 via-[#27241F]/15 to-transparent transition-opacity duration-500 group-hover:from-[#27241F]/90" />

      <span className="absolute top-4 left-4 bg-[#F7F4EE]/95 text-[#38352F] px-3 py-1.5 text-[9px] uppercase tracking-[0.16em] font-semibold">
        {count} {count === 1 ? 'product' : 'products'}
      </span>

      <div className="absolute top-4 right-4 flex items-center justify-center w-9 h-9 rounded-full border border-white/60 text-white group-hover:bg-[#F7F4EE] group-hover:text-[#38352F] transition-all duration-300">
        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-[#F7F4EE]">
        <p className="text-[9px] uppercase tracking-[0.22em] text-white/75 mb-2">
          Explore collection
        </p>

        <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-tight">
          {category.name}
        </h3>

        {category.description && (
          <p className="text-xs text-white/80 mt-2 max-w-md leading-relaxed line-clamp-2">
            {category.description}
          </p>
        )}
      </div>
    </Link>
  );
};
