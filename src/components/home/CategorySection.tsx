import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Category } from '../../types';
import { CategoryCard } from './CategoryCard';

interface CategorySectionProps {
  categories: Category[];
}

export const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  // Display categories configured for homepage
  const homeCategories = categories.filter((c) => c.showOnHome !== false && c.isActive !== false);

  return (
    <section className="py-20 bg-[#FFF9F5] border-b border-[#D9A6AB]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C6A16B]">Curated Collections</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#332522] font-serif mt-1">Shop By Category</h2>
            <p className="text-sm text-[#332522]/70 mt-1 max-w-md">
              Discover our signature lines crafted to bring elegance and functionality into your world.
            </p>
          </div>
          <Link
            to="/shop"
            className="mt-4 sm:mt-0 text-sm font-bold text-[#332522] hover:text-[#C6A16B] transition-colors flex items-center gap-1 group"
          >
            Explore All Categories
            <ArrowUpRight className="w-4 h-4 text-[#C6A16B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Dynamic Category Grid rendering reusable CategoryCard components */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {homeCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};
