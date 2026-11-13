import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { fetchCategoriesFromAPI } from '../services/api';
import type { Category } from '../types';

export const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategoriesFromAPI()
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch((error) =>
        console.error('Failed to load categories:', error)
      );
  }, []);

  const activeCategories = categories.filter(
    (category) => category && category.isActive !== false
  );

  return (
    <main className="min-h-screen bg-[#F7F4EE] py-12 sm:py-16 lg:py-20">
      <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 xl:px-12 2xl:px-16">

        {/* Editorial heading */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12 lg:mb-16">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#927B60] font-medium mb-4">
              Find your favourites
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-normal text-[#38352F] leading-tight">
              Explore our
              <br className="hidden sm:block" />
              collections.
            </h1>
          </div>

          <div className="max-w-md lg:pb-2">
            <p className="text-sm sm:text-base text-[#777064] leading-relaxed">
              A considered collection of beautiful things, from
              everyday essentials to distinctive pieces that make
              your personal style feel like your own.
            </p>

            <div className="mt-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#927B60]">
              <Sparkles className="w-4 h-4" />
              <span>Curated by Velqira</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center border-y border-[#D8D0C3] py-4 mb-8">
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#777064]">
            Our departments
          </span>

          <span className="text-[10px] uppercase tracking-[0.18em] text-[#927B60]">
            {activeCategories.length} collections
          </span>
        </div>

        {/* Category grid */}
        {activeCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-7">

            {activeCategories.map((category, index) => {
              const slug = category.slug || category.id;

              return (
                <article
                  key={category.id}
                  className="group min-w-0"
                >
                  <Link
                    to={`/shop?category=${encodeURIComponent(slug)}`}
                    className="block"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#E8E1D5]">
                      <img
                        src={
                          category.image ||
                          'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&auto=format&fit=crop&q=85'
                        }
                        alt={category.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#27241F]/75 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                      {category.itemCount !== undefined && (
                        <span className="absolute top-4 left-4 bg-[#F7F4EE]/95 text-[#38352F] px-3 py-2 text-[9px] uppercase tracking-[0.15em]">
                          {category.itemCount} products
                        </span>
                      )}

                      <span className="absolute top-4 right-4 text-white/90 text-xs font-serif">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 text-[#F7F4EE]">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-white/75 mb-2">
                          Discover the collection
                        </p>

                        <div className="flex items-end justify-between gap-3">
                          <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight">
                            {category.name}
                          </h2>

                          <span className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full border border-white/60 group-hover:bg-[#F7F4EE] group-hover:text-[#38352F] transition-all duration-300">
                            <ArrowUpRight className="w-5 h-5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="pt-4 pb-2">
                    <p className="text-sm text-[#777064] leading-relaxed line-clamp-2">
                      {category.description ||
                        'Explore thoughtfully selected pieces from this collection.'}
                    </p>

                    {category.subCategories &&
                      category.subCategories.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
                          {category.subCategories
                            .slice(0, 5)
                            .map((subCategory) => (
                              <Link
                                key={subCategory}
                                to={`/shop?category=${encodeURIComponent(
                                  slug
                                )}&sub=${encodeURIComponent(subCategory)}`}
                                className="text-[10px] text-[#927B60] border-b border-[#CFC5B6] pb-1 hover:text-[#38352F] hover:border-[#38352F] transition-colors"
                              >
                                {subCategory}
                              </Link>
                            ))}

                          {category.subCategories.length > 5 && (
                            <Link
                              to={`/shop?category=${encodeURIComponent(slug)}`}
                              className="text-[10px] text-[#38352F] font-semibold"
                            >
                              +{category.subCategories.length - 5} more
                            </Link>
                          )}
                        </div>
                      )}
                  </div>
                </article>
              );
            })}

          </div>
        ) : (
          <div className="py-24 text-center border-y border-[#D8D0C3]">
            <h2 className="font-serif text-2xl text-[#38352F]">
              Collections coming soon
            </h2>
            <p className="text-sm text-[#777064] mt-2">
              Our collections will appear here once available.
            </p>
          </div>
        )}

      </div>
    </main>
  );
};
