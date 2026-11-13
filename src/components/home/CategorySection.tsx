import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Category } from '../../types';
import { CategoryCard } from './CategoryCard';

interface CategorySectionProps {
  categories: Category[];
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  categories,
}) => {
  const homeCategories = categories.filter(
    (category) =>
      category.showOnHome !== false && category.isActive !== false
  );

  return (
    <section className="boho-section bg-[#F7F4EE] border-b border-[#DED6C9]">
      <div className="boho-container">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-5">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#927B60]">
              Curated for your lifestyle
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#38352F] font-serif mt-3">
              Shop by category
            </h2>

            <p className="text-sm sm:text-base text-[#777064] mt-3 max-w-lg leading-relaxed">
              Thoughtfully selected pieces that bring natural beauty,
              timeless character and effortless elegance into your everyday.
            </p>
          </div>

          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-medium text-[#38352F] border-b border-[#A18B70] pb-2 hover:text-[#927B60] transition-colors"
          >
            Explore all collections
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        {homeCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {homeCategories.map((category) => (
              <div
                key={category.id}
                className="group transition-transform duration-500 hover:-translate-y-1"
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center border border-dashed border-[#CFC5B6]">
            <p className="font-serif text-xl text-[#777064]">
              Collections are coming soon.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
