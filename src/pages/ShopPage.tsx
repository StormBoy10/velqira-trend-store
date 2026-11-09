import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';
import { ProductCard } from '../components/products/ProductCard';
import { getProducts, getCategories, accessorySubCategories } from '../services';
import type { Product, Category } from '../types';

interface ShopPageProps {
  onAddToCart?: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters State
  const selectedCategory = searchParams.get('category') || 'all';
  const selectedSubCategory = searchParams.get('sub') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const filterType = searchParams.get('filter') || 'all';

  const [searchInputValue, setSearchInputValue] = useState(searchQuery);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 300 });
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(6);

  useEffect(() => {
    getProducts().then(setProducts);
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    setSearchInputValue(searchQuery);
  }, [searchQuery]);

  // Combined Filtering and Sorting logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // 1. Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 2. Sub-Category Filter
    if (selectedSubCategory !== 'all') {
      result = result.filter(
        (p) => p.subCategory && p.subCategory.toLowerCase() === selectedSubCategory.toLowerCase()
      );
    }

    // 3. Special Filter (trending / new)
    if (filterType === 'trending') {
      result = result.filter((p) => p.isTrending);
    } else if (filterType === 'new') {
      result = result.filter((p) => p.isNew);
    }

    // 4. Search Query Filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.subCategory && p.subCategory.toLowerCase().includes(q))
      );
    }

    // 5. Price Range Filter
    result = result.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);

    // 6. In Stock Filter
    if (inStockOnly) {
      result = result.filter((p) => p.inStock !== false);
    }

    // 7. Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        result.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
        break;
    }

    return result;
  }, [products, selectedCategory, selectedSubCategory, filterType, searchQuery, priceRange, inStockOnly, sortBy]);

  const displayedProducts = filteredAndSortedProducts.slice(0, visibleCount);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchInputValue.trim()) {
      newParams.set('search', searchInputValue.trim());
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  const handleCategoryChange = (catId: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('category', catId);
    newParams.delete('sub');
    newParams.delete('filter');
    setSearchParams(newParams);
    setVisibleCount(6);
  };

  const handleSubCategoryChange = (subName: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (subName === 'all') {
      newParams.delete('sub');
    } else {
      newParams.set('sub', subName);
    }
    setSearchParams(newParams);
    setVisibleCount(6);
  };

  const handleResetFilters = () => {
    setSearchParams({});
    setSearchInputValue('');
    setSortBy('newest');
    setPriceRange({ min: 0, max: 300 });
    setInStockOnly(false);
    setVisibleCount(6);
  };

  const activeCategoryObj = categories.find((c) => c.id === selectedCategory || c.slug === selectedCategory);
  const activeSubCategories = activeCategoryObj?.subCategories || (selectedCategory === 'jewellery-accessories' ? accessorySubCategories : []);

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header & Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#332522]">Explore Store</h1>
            <p className="text-sm text-[#332522]/70 mt-1">
              Browse our curated collection of dresses, jewellery, home decor, crafts, and Korean goodies.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
            <input
              type="text"
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
              placeholder="Search accessories, dresses, etc..."
              className="w-full bg-white text-[#332522] placeholder-[#332522]/40 text-sm pl-10 pr-4 py-2.5 rounded-xl border border-[#D9A6AB]/40 focus:outline-none focus:border-[#C6A16B] shadow-xs"
            />
            <Search className="w-4 h-4 text-[#C6A16B] absolute left-3.5 top-3" />
          </form>
        </div>

        {/* Main Categories Bar */}
        <div className="flex space-x-2 border-b border-[#D9A6AB]/30 mb-6 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-[#E8BFC3] text-[#332522]'
                : 'text-[#332522]/70 hover:text-[#C6A16B]'
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat.id || selectedCategory === cat.slug
                  ? 'bg-[#E8BFC3] text-[#332522]'
                  : 'text-[#332522]/70 hover:text-[#C6A16B]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sub-Category Filter Tags (For Jewellery & Accessories) */}
        {activeSubCategories && activeSubCategories.length > 0 && (
          <div className="bg-white p-4 rounded-2xl border border-[#D9A6AB]/30 shadow-xs mb-8">
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#C6A16B]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#332522]">
                Filter Jewellery & Accessories Items ({activeSubCategories.length}):
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleSubCategoryChange('all')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                  selectedSubCategory === 'all'
                    ? 'bg-[#332522] text-[#FFF9F5] border-[#332522]'
                    : 'bg-[#FFF9F5] text-[#332522] border-[#D9A6AB]/40 hover:border-[#C6A16B]'
                }`}
              >
                All Items
              </button>
              {activeSubCategories.map((subName) => (
                <button
                  key={subName}
                  onClick={() => handleSubCategoryChange(subName)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    selectedSubCategory.toLowerCase() === subName.toLowerCase()
                      ? 'bg-[#332522] text-[#FFF9F5] border-[#332522] font-bold'
                      : 'bg-[#FFF9F5] text-[#332522]/80 border-[#D9A6AB]/30 hover:border-[#C6A16B]'
                  }`}
                >
                  {subName}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Filter Controls Row & Sort */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#D9A6AB]/30 shadow-xs mb-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

          {/* Price Range Slider */}
          <div className="md:col-span-5 flex items-center space-x-4">
            <span className="text-xs font-bold text-[#332522] uppercase tracking-wider flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C6A16B]" /> Max Price: ${priceRange.max}
            </span>
            <input
              type="range"
              min="10"
              max="300"
              step="5"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
              className="flex-1 accent-[#C6A16B] cursor-pointer"
            />
          </div>

          {/* In-Stock Toggle */}
          <div className="md:col-span-3 flex items-center space-x-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-[#332522] cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#C6A16B] accent-[#C6A16B]"
              />
              <span>In-Stock Only</span>
            </label>
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-3 flex items-center space-x-2">
            <label className="text-xs font-bold text-[#332522] uppercase tracking-wider whitespace-nowrap">Sort By:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-[#FFF9F5] text-[#332522] text-sm px-3 py-2 rounded-xl border border-[#D9A6AB]/40 focus:outline-none focus:border-[#C6A16B] font-medium"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Reset Filters Button */}
          <div className="md:col-span-1 flex justify-end">
            <button
              onClick={handleResetFilters}
              className="p-2 text-[#332522]/60 hover:text-[#332522] hover:bg-[#FFF9F5] rounded-xl transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[#332522]/70">
            Showing <span className="text-[#C6A16B]">{displayedProducts.length}</span> of <span className="text-[#332522]">{filteredAndSortedProducts.length}</span> Products
          </p>
        </div>

        {/* Product Grid */}
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#D9A6AB]/30 text-[#332522]/70">
            <p className="text-lg font-bold font-serif">No products found matching your search criteria.</p>
            <button
              onClick={handleResetFilters}
              className="mt-4 bg-[#E8BFC3] text-[#332522] px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#D9A6AB] transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Pagination / Load More Button */}
        {visibleCount < filteredAndSortedProducts.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="bg-white text-[#332522] border border-[#D9A6AB]/50 px-8 py-3 rounded-xl font-bold hover:bg-[#E8BFC3] transition-colors shadow-xs"
            >
              Load More Products ({filteredAndSortedProducts.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
