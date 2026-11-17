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
      className="group relative block w-full aspect-[4/3] overflow-hidden bg-[#E8E1D5] rounded-2xl border-2 border-[#C6A16B]/40 hover:border-[#C6A16B] shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl"
    >
      {/* Category Image with Smooth Zoom FX (Fixed scale-105) */}
      <img
        src={
          category.image ||
          'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&auto=format&fit=crop&q=85'
        }
        alt={category.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Light Sweep Shine Effect on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

      {/* Gradient Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#27241F]/85 via-[#27241F]/20 to-transparent transition-opacity duration-500 group-hover:from-[#27241F]/95" />

      {/* Product Count Pill Badge */}
      <span className="absolute top-4 left-4 bg-[#F7F4EE]/95 text-[#38352F] px-3.5 py-1.5 text-[9px] uppercase tracking-[0.18em] font-bold rounded-full border border-[#C6A16B]/40 backdrop-blur-xs">
        {count} {count === 1 ? 'item' : 'items'}
      </span>

      {/* Arrow Button in Corner (Turns & fills with Rose #E8BFC3 on hover) */}
      <div className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full border-2 border-white/70 text-white bg-black/20 group-hover:bg-[#E8BFC3] group-hover:text-[#332522] group-hover:border-[#E8BFC3] transition-all duration-400 shadow-md">
        <ArrowUpRight className="w-4 h-4 transition-transform duration-400 group-hover:rotate-45" />
      </div>

      {/* Content Section at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-[#F7F4EE]">
        <p className="text-[9px] uppercase tracking-[0.22em] text-[#C6A16B] font-bold mb-1.5">
          Curated Department
        </p>

        <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-tight">
          {category.name}
        </h3>

        {category.description && (
          <p className="text-xs text-white/80 mt-1.5 max-w-md leading-relaxed line-clamp-2 font-light">
            {category.description}
          </p>
        )}

        {/* Short Gold Line Growing Under Description on Hover */}
        <div className="mt-3.5 h-[2px] w-12 bg-[#C6A16B] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
      </div>
    </Link>
  );
};
