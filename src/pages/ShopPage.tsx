import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

import { ProductCard } from '../components/products/ProductCard';
import {
  getProducts,
  getCategories,
  accessorySubCategories,
} from '../services';
import type { Product, Category } from '../types';

interface ShopPageProps {
  onAddToCart?: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category') || 'all';
  const selectedSubCategory = searchParams.get('sub') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const filterType = searchParams.get('filter') || 'all';

  const [searchInputValue, setSearchInputValue] = useState(searchQuery);
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 20000,
  });
  const [inStockOnly, setInStockOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((error) => console.error('Failed to load products:', error));

    getCategories()
      .then(setCategories)
      .catch((error) => console.error('Failed to load categories:', error));
  }, []);

  useEffect(() => {
    setSearchInputValue(searchQuery);
  }, [searchQuery]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'all') {
      result = result.filter(
        (product) =>
          product.category === selectedCategory ||
          categories.some(
            (category) =>
              category.id === selectedCategory &&
              category.slug === product.category
          )
      );
    }

    if (selectedSubCategory !== 'all') {
      result = result.filter(
        (product) =>
          product.subCategory?.toLowerCase() ===
          selectedSubCategory.toLowerCase()
      );
    }

    if (filterType === 'trending') {
      result = result.filter((product) => product.isTrending);
    } else if (filterType === 'new') {
      result = result.filter((product) => product.isNew);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();

      result = result.filter(
        (product) =>
          product.name?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query) ||
          product.subCategory?.toLowerCase().includes(query)
      );
    }

    result = result.filter((product) => {
      const price = Number(product.price) || 0;
      return price >= priceRange.min && price <= priceRange.max;
    });

    if (inStockOnly) {
      result = result.filter((product) => product.inStock !== false);
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;

      case 'price-high':
        result.sort((a, b) => Number(b.price) - Number(a.price));
        break;

      case 'rating':
        result.sort(
          (a, b) => Number(b.rating || 0) - Number(a.rating || 0)
        );
        break;

      case 'newest':
      default:
        result.sort((a, b) =>
          (b.createdAt || '').localeCompare(a.createdAt || '')
        );
        break;
    }

    return result;
  }, [
    products,
    categories,
    selectedCategory,
    selectedSubCategory,
    filterType,
    searchQuery,
    priceRange,
    inStockOnly,
    sortBy,
  ]);

  const displayedProducts = filteredAndSortedProducts.slice(
    0,
    visibleCount
  );

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newParams = new URLSearchParams(searchParams);

    if (searchInputValue.trim()) {
      newParams.set('search', searchInputValue.trim());
    } else {
      newParams.delete('search');
    }

    setSearchParams(newParams);
    setVisibleCount(8);
  };

  const handleCategoryChange = (categoryId: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (categoryId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', categoryId);
    }

    newParams.delete('sub');
    newParams.delete('filter');

    setSearchParams(newParams);
    setVisibleCount(8);
  };

  const handleSubCategoryChange = (subName: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (subName === 'all') {
      newParams.delete('sub');
    } else {
      newParams.set('sub', subName);
    }

    setSearchParams(newParams);
    setVisibleCount(8);
  };

  const handleResetFilters = () => {
    setSearchParams({});
    setSearchInputValue('');
    setSortBy('newest');
    setPriceRange({ min: 0, max: 20000 });
    setInStockOnly(false);
    setVisibleCount(8);
  };

  const activeCategory = categories.find(
    (category) =>
      category.id === selectedCategory ||
      category.slug === selectedCategory
  );

  const activeSubCategories =
    activeCategory?.subCategories ||
    (selectedCategory === 'jewellery-accessories'
      ? accessorySubCategories
      : []);

  return (
    <main className="min-h-screen bg-[#F7F4EE] py-10 sm:py-14 lg:py-16">
      <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 xl:px-12 2xl:px-16">

        {/* Page heading */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-7 mb-10 lg:mb-14">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#927B60] font-medium mb-3">
              The Velqira Collection
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#38352F]">
              Explore the store
            </h1>

            <p className="text-sm sm:text-base text-[#777064] mt-4 max-w-2xl leading-relaxed">
              Discover thoughtfully selected dresses, jewellery,
              home decor, crafts and everyday treasures.
            </p>
          </div>

          <form
            onSubmit={handleSearchSubmit}
            className="relative w-full lg:w-[380px] xl:w-[440px]"
          >
            <input
              type="text"
              value={searchInputValue}
              onChange={(event) =>
                setSearchInputValue(event.target.value)
              }
              placeholder="Search the collection..."
              className="w-full bg-transparent text-[#38352F] placeholder-[#999184] text-sm pl-11 pr-4 py-4 border-b border-[#BDB3A4] focus:outline-none focus:border-[#927B60] transition-colors"
            />

            <Search className="w-4 h-4 text-[#927B60] absolute left-1 top-4" />

            <button
              type="submit"
              className="absolute right-2 top-3 text-[10px] uppercase tracking-[0.15em] text-[#927B60] font-semibold"
            >
              Search
            </button>
          </form>
        </div>

        {/* Main categories */}
        <div className="border-y border-[#D8D0C3] mb-8">
          <div className="flex items-center gap-7 overflow-x-auto py-4 scrollbar-none">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`shrink-0 text-xs uppercase tracking-[0.14em] pb-1 border-b transition-colors ${
                selectedCategory === 'all'
                  ? 'text-[#38352F] border-[#927B60] font-semibold'
                  : 'text-[#898174] border-transparent hover:text-[#38352F]'
              }`}
            >
              All products
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.slug || category.id)}
                className={`shrink-0 text-xs uppercase tracking-[0.14em] pb-1 border-b transition-colors ${
                  selectedCategory === category.id ||
                  selectedCategory === category.slug
                    ? 'text-[#38352F] border-[#927B60] font-semibold'
                    : 'text-[#898174] border-transparent hover:text-[#38352F]'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Subcategories */}
        {activeSubCategories.length > 0 && (
          <div className="mb-9">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-[#927B60]" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#625B50]">
                Explore subcategories
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleSubCategoryChange('all')}
                className={`px-4 py-2 text-[11px] uppercase tracking-wider border transition-colors ${
                  selectedSubCategory === 'all'
                    ? 'bg-[#38352F] text-[#F7F4EE] border-[#38352F]'
                    : 'border-[#D0C7B9] text-[#625B50] hover:border-[#927B60]'
                }`}
              >
                All items
              </button>

              {activeSubCategories.map((subName) => (
                <button
                  key={subName}
                  onClick={() => handleSubCategoryChange(subName)}
                  className={`px-4 py-2 text-[11px] uppercase tracking-wider border transition-colors ${
                    selectedSubCategory.toLowerCase() ===
                    subName.toLowerCase()
                      ? 'bg-[#38352F] text-[#F7F4EE] border-[#38352F]'
                      : 'border-[#D0C7B9] text-[#625B50] hover:border-[#927B60]'
                  }`}
                >
                  {subName}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 items-center py-6 border-y border-[#D8D0C3] mb-8">

          <div>
            <div className="flex justify-between text-[10px] uppercase tracking-wider text-[#625B50] mb-3">
              <span className="flex items-center gap-2 font-semibold">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Maximum price
              </span>
              <span>₹{priceRange.max.toLocaleString('en-IN')}</span>
            </div>

            <input
              type="range"
              min="0"
              max="20000"
              step="500"
              value={priceRange.max}
              onChange={(event) =>
                setPriceRange({
                  ...priceRange,
                  max: Number(event.target.value),
                })
              }
              className="w-full accent-[#927B60] cursor-pointer"
            />
          </div>

          <label className="flex items-center gap-3 text-xs text-[#625B50] cursor-pointer">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(event) => setInStockOnly(event.target.checked)}
              className="w-4 h-4 accent-[#927B60]"
            />
            Only show available products
          </label>

          <div className="flex items-center gap-3">
            <label
              htmlFor="shop-sort"
              className="shrink-0 text-[10px] uppercase tracking-wider font-semibold text-[#625B50]"
            >
              Sort by
            </label>

            <select
              id="shop-sort"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="w-full bg-transparent text-xs text-[#38352F] border-b border-[#BDB3A4] py-2 focus:outline-none"
            >
              <option value="newest">Newest arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest rated</option>
            </select>
          </div>

          <div className="flex justify-start xl:justify-end">
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] font-semibold text-[#927B60] hover:text-[#38352F] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset filters
            </button>
          </div>
        </div>

        {/* Product count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-[10px] uppercase tracking-[0.17em] text-[#777064]">
            Showing{' '}
            <span className="text-[#38352F] font-semibold">
              {displayedProducts.length}
            </span>{' '}
            of{' '}
            <span className="text-[#38352F] font-semibold">
              {filteredAndSortedProducts.length}
            </span>{' '}
            products
          </p>
        </div>

        {/* Product grid */}
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-6 lg:gap-x-7 gap-y-12">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border-y border-[#D8D0C3]">
            <p className="font-serif text-2xl text-[#38352F]">
              Nothing found just yet.
            </p>

            <p className="text-sm text-[#777064] mt-2">
              Try changing your search or filters.
            </p>

            <button
              onClick={handleResetFilters}
              className="mt-6 text-xs uppercase tracking-[0.16em] border-b border-[#927B60] pb-1 text-[#927B60]"
            >
              Clear all filters
            </button>
          </div>
        )}

        {visibleCount < filteredAndSortedProducts.length && (
          <div className="mt-16 text-center">
            <button
              onClick={() => setVisibleCount((previous) => previous + 8)}
              className="px-10 py-4 border border-[#927B60] text-[#38352F] text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-[#38352F] hover:text-[#F7F4EE] transition-colors"
            >
              Load more products
              <span className="ml-2 text-[#927B60]">
                ({filteredAndSortedProducts.length - visibleCount})
              </span>
            </button>
          </div>
        )}

      </div>
    </main>
  );
};
