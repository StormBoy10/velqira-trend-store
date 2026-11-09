import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Category } from '../../types';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const categorySlug = category.slug || category.id;

  return (
    <Link
      to={`/shop?category=${categorySlug}`}
      className="group relative h-80 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all border border-[#D9A6AB]/30 bg-white flex flex-col justify-end"
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#332522]/90 via-[#332522]/35 to-transparent" />

      {/* Item Count Pill */}
      {category.itemCount !== undefined && (
        <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-[#332522] text-xs font-bold px-3 py-1 rounded-full shadow-xs border border-[#D9A6AB]/30">
          {category.itemCount} Products
        </span>
      )}

      {/* Category Info */}
      <div className="relative p-6 text-[#FFF9F5] z-10">
        <h3 className="text-2xl font-bold font-serif group-hover:text-[#E8BFC3] transition-colors flex items-center justify-between">
          <span>{category.name}</span>
          <ArrowUpRight className="w-5 h-5 text-[#C6A16B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </h3>
        {category.description && (
          <p className="text-xs text-[#FFF9F5]/80 mt-2 line-clamp-2 leading-relaxed">
            {category.description}
          </p>
        )}
        <span className="mt-3 inline-flex items-center text-xs font-bold text-[#E8BFC3] uppercase tracking-wider group-hover:underline">
          Explore Line &rarr;
        </span>
      </div>
    </Link>
  );
};
