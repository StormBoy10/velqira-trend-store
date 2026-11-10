import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, Layers } from 'lucide-react';
import { fetchCategoriesFromAPI } from '../services/api';
import type { Category } from '../types';

export const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategoriesFromAPI().then((data) => setCategories(Array.isArray(data) ? data : []));
  }, []);

  const activeCategories = categories.filter((c) => c && c.isActive !== false);

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#C6A16B] bg-[#E8BFC3]/30 px-3.5 py-1.5 rounded-full mb-3 border border-[#C6A16B]/30">
            <Layers className="w-3.5 h-3.5 text-[#C6A16B]" />
            <span>Store Directory</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif text-[#332522]">
            Category Collections
          </h1>
          <p className="text-base text-[#332522]/80 mt-3 leading-relaxed">
            Explore our curated departments designed to bring warm minimalism and luxury functionality to your everyday routine.
          </p>
        </div>

        {/* Categories Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeCategories.map((category) => {
            const slug = category.slug || category.id;
            return (
              <div
                key={category.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#D9A6AB]/30 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-[#FFF9F5]">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#332522]/70 via-transparent to-transparent" />

                  {category.itemCount !== undefined && (
                    <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-[#332522] text-xs font-bold px-3 py-1 rounded-full shadow-xs border border-[#D9A6AB]/30">
                      {category.itemCount} Products
                    </span>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 text-[#FFF9F5]">
                    <h2 className="text-2xl font-bold font-serif">{category.name}</h2>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <p className="text-sm text-[#332522]/75 leading-relaxed mb-4">
                    {category.description || 'Curated high quality items for your daily lifestyle.'}
                  </p>

                  {/* Sub-Categories list if available */}
                  {category.subCategories && category.subCategories.length > 0 && (
                    <div className="mb-6 pt-4 border-t border-[#D9A6AB]/20">
                      <div className="flex items-center space-x-1 text-xs font-bold text-[#C6A16B] uppercase tracking-wider mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#C6A16B]" />
                        <span>Included Sub-Lines ({category.subCategories.length}):</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                        {category.subCategories.slice(0, 8).map((sub) => (
                          <Link
                            key={sub}
                            to={`/shop?category=${slug}&sub=${encodeURIComponent(sub)}`}
                            className="text-[11px] font-semibold bg-[#FFF9F5] text-[#332522]/80 px-2.5 py-1 rounded-md border border-[#D9A6AB]/30 hover:bg-[#E8BFC3] hover:text-[#332522] transition-colors"
                          >
                            {sub}
                          </Link>
                        ))}
                        {category.subCategories.length > 8 && (
                          <span className="text-[11px] text-[#C6A16B] font-bold self-center">
                            +{category.subCategories.length - 8} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <Link
                    to={`/shop?category=${slug}`}
                    className="w-full bg-[#E8BFC3] text-[#332522] py-3 rounded-xl font-bold text-sm hover:bg-[#D9A6AB] transition-colors flex items-center justify-center space-x-1 shadow-xs"
                  >
                    <span>Browse {category.name}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
