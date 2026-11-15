import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  LayoutGrid,
  Grid,
  Check,
  Package,
  TrendingUp,
  Clock,
  Filter
} from 'lucide-react';

import { ProductCard } from '../components/products/ProductCard';
import { ProductQuickViewModal } from '../components/products/ProductQuickViewModal';
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
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  // Quick View Modal State
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Density Choice (Desktop: 3 cols vs 4 cols)
  const [gridDensity, setGridDensity] = useState<'large' | 'compact'>(() => {
    return (localStorage.getItem('velqira_grid_density') as 'large' | 'compact') || 'large';
  });

  // Mobile Filter Drawer Toggle
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Read URL Params
  const selectedCategory = searchParams.get('category') || 'all';
  const selectedSubCategory = searchParams.get('sub') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const filterType = searchParams.get('filter') || 'all'; // trending | new | all
  const minPriceParam = searchParams.get('min');
  const maxPriceParam = searchParams.get('max');
  const inStockParam = searchParams.get('stock');
  const minRatingParam = searchParams.get('rating');
  const sortByParam = searchParams.get('sort') || 'newest';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);

  // Local Search Input for 300ms Debounce
  const [searchInputValue, setSearchInputValue] = useState(searchQuery);

  // Load Catalog Data
  const reloadData = () => {
    setIsLoading(true);
    Promise.all([getProducts(), getCategories()])
      .then(([fetchedProducts, fetchedCategories]) => {
        setProducts(Array.isArray(fetchedProducts) ? fetchedProducts : []);
        setCategories(Array.isArray(fetchedCategories) ? fetchedCategories : []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  useEffect(() => {
    reloadData();
    window.addEventListener('velqira_data_updated', reloadData);
    window.addEventListener('storage', reloadData);
    return () => {
      window.removeEventListener('velqira_data_updated', reloadData);
      window.removeEventListener('storage', reloadData);
    };
  }, []);

  // Compute Catalog Price Bounds Dynamically
  const catalogPriceBounds = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 5000 };
    const prices = products.map((p) => Number(p.price) || 0).filter((p) => p > 0);
    const min = prices.length ? Math.floor(Math.min(...prices)) : 0;
    const max = prices.length ? Math.ceil(Math.max(...prices)) : 5000;
    return { min, max: Math.max(max, 1000) };
  }, [products]);

  const minPrice = minPriceParam !== null ? Number(minPriceParam) : catalogPriceBounds.min;
  const maxPrice = maxPriceParam !== null ? Number(maxPriceParam) : catalogPriceBounds.max;
  const inStockOnly = inStockParam === '1';
  const minRating = minRatingParam !== null ? Number(minRatingParam) : 0;

  // Debounced Search Sync to URL (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInputValue !== searchQuery) {
        updateURLParam('search', searchInputValue.trim() || null);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInputValue, searchQuery]);

  useEffect(() => {
    setSearchInputValue(searchQuery);
  }, [searchQuery]);

  // Helper to Update Query Params & Reset Page to 1
  const updateURLParam = (key: string, value: string | number | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === null || value === '' || value === 'all' || value === 0) {
      newParams.delete(key);
    } else {
      newParams.set(key, String(value));
    }
    if (key !== 'page') {
      newParams.delete('page');
    }
    setSearchParams(newParams);
  };

  const handleDensityChange = (density: 'large' | 'compact') => {
    setGridDensity(density);
    localStorage.setItem('velqira_grid_density', density);
  };

  const handleClearAllFilters = () => {
    setSearchParams({});
    setSearchInputValue('');
  };

  // Compute Category Counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    products.forEach((p) => {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1;
      }
    });
    return counts;
  }, [products]);

  // Compute Sub-Category List & Counts for Selected Category
  const activeSubCategories = useMemo(() => {
    let rawSubs: string[] = [];

    if (selectedCategory === 'all') {
      const setOfSubs = new Set<string>();
      products.forEach((p) => {
        if (p.subCategory) setOfSubs.add(p.subCategory);
      });
      rawSubs = Array.from(setOfSubs);
    } else {
      const activeCat = categories.find((c) => c.id === selectedCategory || c.slug === selectedCategory);
      if (activeCat?.subCategories && activeCat.subCategories.length > 0) {
        rawSubs = activeCat.subCategories;
      } else if (selectedCategory === 'jewellery-accessories') {
        rawSubs = accessorySubCategories;
      } else {
        const setOfSubs = new Set<string>();
        products.forEach((p) => {
          if (p.category === selectedCategory && p.subCategory) {
            setOfSubs.add(p.subCategory);
          }
        });
        rawSubs = Array.from(setOfSubs);
      }
    }

    return rawSubs.map((sub) => {
      const count = products.filter((p) => {
        const matchesCat =
          selectedCategory === 'all' ||
          p.category === selectedCategory ||
          categories.some((c) => c.id === selectedCategory && c.slug === p.category);
        return matchesCat && p.subCategory?.toLowerCase() === sub.toLowerCase();
      }).length;
      return { name: sub, count };
    });
  }, [products, categories, selectedCategory]);

  // Count Badges Matches
  const badgeCounts = useMemo(() => {
    const categoryFiltered = products.filter((p) => {
      if (selectedCategory === 'all') return true;
      return (
        p.category === selectedCategory ||
        categories.some((c) => c.id === selectedCategory && c.slug === p.category)
      );
    });

    return {
      inStock: categoryFiltered.filter((p) => p.inStock !== false).length,
      newArrivals: categoryFiltered.filter((p) => p.isNew).length,
      trending: categoryFiltered.filter((p) => p.isTrending).length,
    };
  }, [products, categories, selectedCategory]);

  // Filter & Sort Logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(
        (product) =>
          product.category === selectedCategory ||
          categories.some(
            (cat) => cat.id === selectedCategory && cat.slug === product.category
          )
      );
    }

    // Subcategory filter
    if (selectedSubCategory !== 'all') {
      result = result.filter(
        (product) => product.subCategory?.toLowerCase() === selectedSubCategory.toLowerCase()
      );
    }

    // Filter type (Trending / New)
    if (filterType === 'trending') {
      result = result.filter((product) => product.isTrending);
    } else if (filterType === 'new') {
      result = result.filter((product) => product.isNew);
    }

    // Search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query) ||
          product.subCategory?.toLowerCase().includes(query)
      );
    }

    // Price Range Filter
    result = result.filter((product) => {
      const price = Number(product.price) || 0;
      return price >= minPrice && price <= maxPrice;
    });

    // In Stock Filter
    if (inStockOnly) {
      result = result.filter((product) => product.inStock !== false);
    }

    // Minimum Star Rating Filter
    if (minRating > 0) {
      result = result.filter((product) => (product.rating || 5.0) >= minRating);
    }

    // Sorting
    switch (sortByParam) {
      case 'price-low':
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price-high':
        result.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case 'rating':
        result.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
        break;
      case 'newest':
      default:
        result.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
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
    minPrice,
    maxPrice,
    inStockOnly,
    minRating,
    sortByParam,
  ]);

  // Numbered Pagination Calculations (12 items per page desktop / 8 mobile)
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage) || 1;
  const currentPage = Math.min(Math.max(1, pageParam), totalPages);

  const displayedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedProducts.slice(start, start + itemsPerPage);
  }, [filteredAndSortedProducts, currentPage, itemsPerPage]);

  // Active Filter Badges List
  const activeFilters = useMemo(() => {
    const list: { id: string; label: string; clear: () => void }[] = [];

    if (selectedCategory !== 'all') {
      const catObj = categories.find((c) => c.id === selectedCategory || c.slug === selectedCategory);
      list.push({
        id: 'category',
        label: `Category: ${catObj?.name || selectedCategory}`,
        clear: () => updateURLParam('category', null),
      });
    }

    if (selectedSubCategory !== 'all') {
      list.push({
        id: 'sub',
        label: `Item: ${selectedSubCategory}`,
        clear: () => updateURLParam('sub', null),
      });
    }

    if (filterType === 'trending') {
      list.push({
        id: 'trending',
        label: 'Trending Items',
        clear: () => updateURLParam('filter', null),
      });
    } else if (filterType === 'new') {
      list.push({
        id: 'new',
        label: 'New Arrivals',
        clear: () => updateURLParam('filter', null),
      });
    }

    if (searchQuery) {
      list.push({
        id: 'search',
        label: `Search: "${searchQuery}"`,
        clear: () => setSearchInputValue(''),
      });
    }

    if (minPrice > catalogPriceBounds.min || maxPrice < catalogPriceBounds.max) {
      list.push({
        id: 'price',
        label: `Price: ₹${minPrice} - ₹${maxPrice}`,
        clear: () => {
          updateURLParam('min', null);
          updateURLParam('max', null);
        },
      });
    }

    if (inStockOnly) {
      list.push({
        id: 'stock',
        label: 'In Stock Only',
        clear: () => updateURLParam('stock', null),
      });
    }

    if (minRating > 0) {
      list.push({
        id: 'rating',
        label: `${minRating}★ & Up`,
        clear: () => updateURLParam('rating', null),
      });
    }

    return list;
  }, [
    selectedCategory,
    categories,
    selectedSubCategory,
    filterType,
    searchQuery,
    minPrice,
    maxPrice,
    catalogPriceBounds,
    inStockOnly,
    minRating,
  ]);

  const activeCategoryObj = categories.find(
    (c) => c.id === selectedCategory || c.slug === selectedCategory
  );

  return (
    <main className="min-h-screen bg-[#FFF9F5] py-8 sm:py-12 lg:py-16 text-[#332522]">
      {/* Quick View Modal Popup */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={onAddToCart}
      />

      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 xl:px-12">

        {/* BREADCRUMB & PAGE HEADER */}
        <div className="mb-8">
          <nav className="text-xs uppercase tracking-widest text-[#A18B70] font-semibold mb-3 flex items-center gap-2">
            <Link to="/" className="hover:text-[#332522] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-[#332522] transition-colors">Shop</Link>
            {activeCategoryObj && (
              <>
                <span>/</span>
                <span className="text-[#332522] font-bold">{activeCategoryObj.name}</span>
              </>
            )}
          </nav>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#E8BFC3]/40 pb-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C6A16B] font-bold">
                THE VELQIRA COLLECTION — 2026
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#332522] font-bold mt-1">
                {activeCategoryObj ? activeCategoryObj.name : 'Explore The Atelier'}
              </h1>
              <p className="text-sm text-[#332522]/70 mt-2 max-w-2xl leading-relaxed">
                {activeCategoryObj?.description ||
                  'Discover handpicked boutique dresses, fine gold jewellery, artisan home decor, and Korean stationery.'}
              </p>
            </div>

            {/* Desktop View Density Switch */}
            <div className="hidden lg:flex items-center space-x-2 bg-white p-1 rounded-xl border border-[#E8BFC3]/40 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-[#332522]/60 px-2">Grid View:</span>
              <button
                type="button"
                onClick={() => handleDensityChange('large')}
                className={`p-2 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold ${
                  gridDensity === 'large'
                    ? 'bg-[#E8BFC3] text-[#332522]'
                    : 'text-[#332522]/60 hover:bg-[#FFF9F5]'
                }`}
                title="Large 3-Column View"
              >
                <Grid size={16} /> 3 Cols
              </button>

              <button
                type="button"
                onClick={() => handleDensityChange('compact')}
                className={`p-2 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold ${
                  gridDensity === 'compact'
                    ? 'bg-[#E8BFC3] text-[#332522]'
                    : 'text-[#332522]/60 hover:bg-[#FFF9F5]'
                }`}
                title="Compact 4-Column View"
              >
                <LayoutGrid size={16} /> 4 Cols
              </button>
            </div>
          </div>
        </div>

        {/* CATEGORY TABS WITH DYNAMIC COUNTS */}
        <div className="mb-8 overflow-x-auto scrollbar-none pb-2">
          <div className="flex items-center gap-3 min-w-max">
            <button
              onClick={() => updateURLParam('category', 'all')}
              className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold transition-all border ${
                selectedCategory === 'all'
                  ? 'bg-[#332522] text-[#FFF9F5] border-[#332522] shadow-md'
                  : 'bg-white text-[#332522] border-[#E8BFC3]/40 hover:border-[#C6A16B]'
              }`}
            >
              All Products ({categoryCounts.all || 0})
            </button>

            {categories.map((category) => {
              const catId = category.slug || category.id;
              const isSelected = selectedCategory === category.id || selectedCategory === category.slug;
              const count = categoryCounts[catId] || categoryCounts[category.id] || 0;

              return (
                <button
                  key={category.id}
                  onClick={() => updateURLParam('category', catId)}
                  className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold transition-all border ${
                    isSelected
                      ? 'bg-[#332522] text-[#FFF9F5] border-[#332522] shadow-md'
                      : 'bg-white text-[#332522] border-[#E8BFC3]/40 hover:border-[#C6A16B]'
                  }`}
                >
                  {category.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* DYNAMIC SUBCATEGORY CHIPS FOR ALL CATEGORIES */}
        {activeSubCategories.length > 0 && (
          <div className="mb-8 bg-white p-4 sm:p-6 rounded-2xl border border-[#E8BFC3]/30 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={14} className="text-[#C6A16B]" />
              <span className="text-xs uppercase font-bold tracking-wider text-[#C6A16B]">
                Sub-Category Item Types
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => updateURLParam('sub', null)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  selectedSubCategory === 'all'
                    ? 'bg-[#E8BFC3] text-[#332522] border-[#E8BFC3] font-bold'
                    : 'bg-[#FFF9F5] text-[#332522]/80 border-[#E8BFC3]/40 hover:border-[#C6A16B]'
                }`}
              >
                All Items
              </button>

              {activeSubCategories.map((sub) => (
                <button
                  key={sub.name}
                  onClick={() => updateURLParam('sub', sub.name)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                    selectedSubCategory.toLowerCase() === sub.name.toLowerCase()
                      ? 'bg-[#E8BFC3] text-[#332522] border-[#E8BFC3] font-bold'
                      : 'bg-[#FFF9F5] text-[#332522]/80 border-[#E8BFC3]/40 hover:border-[#C6A16B]'
                  }`}
                >
                  {sub.name} ({sub.count})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* MOBILE STICKY TOOLBAR (< 1024px) */}
        <div className="lg:hidden sticky top-16 z-30 mb-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#E8BFC3]/40 shadow-sm flex items-center justify-between gap-3">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 bg-[#332522] text-[#FFF9F5] px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider"
          >
            <Filter size={14} />
            <span>Filters</span>
            {activeFilters.length > 0 && (
              <span className="w-5 h-5 bg-[#C6A16B] text-[#332522] rounded-full text-[10px] flex items-center justify-center font-bold">
                {activeFilters.length}
              </span>
            )}
          </button>

          <span className="text-xs font-bold text-[#332522]/70" aria-live="polite">
            {filteredAndSortedProducts.length} Items
          </span>

          <select
            value={sortByParam}
            onChange={(e) => updateURLParam('sort', e.target.value)}
            className="bg-[#FFF9F5] text-xs text-[#332522] font-bold px-3 py-2 rounded-xl border border-[#E8BFC3]/40 focus:outline-none"
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* MAIN LAYOUT: DESKTOP STICKY SIDEBAR + PRODUCT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* DESKTOP SIDEBAR FILTERS (>= 1024px) */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-3xl border border-[#E8BFC3]/40 shadow-xs sticky top-24 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-[#E8BFC3]/30">
              <h2 className="font-serif font-bold text-lg text-[#332522] flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-[#C6A16B]" /> Filters
              </h2>
              {activeFilters.length > 0 && (
                <button
                  onClick={handleClearAllFilters}
                  className="text-xs text-[#C6A16B] hover:text-[#332522] font-bold uppercase tracking-wider flex items-center gap-1"
                >
                  <RotateCcw size={12} /> Clear All
                </button>
              )}
            </div>

            {/* Search Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#332522] mb-1.5">
                Search Catalog
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchInputValue}
                  onChange={(e) => setSearchInputValue(e.target.value)}
                  placeholder="Search dresses, jewellery..."
                  className="w-full bg-[#FFF9F5] text-xs text-[#332522] pl-9 pr-8 py-3 rounded-xl border border-[#E8BFC3]/40 focus:outline-none focus:border-[#C6A16B] font-semibold"
                />
                <Search size={14} className="text-[#C6A16B] absolute left-3 top-3.5" />
                {searchInputValue && (
                  <button
                    onClick={() => setSearchInputValue('')}
                    className="absolute right-2.5 top-3 text-[#332522]/40 hover:text-[#332522]"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Price Range Slider & Presets */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="uppercase tracking-wider text-[#332522]">Price Range</span>
                <span className="text-[#C6A16B] font-mono">₹{minPrice} - ₹{maxPrice}</span>
              </div>

              {/* Price Quick Presets */}
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    updateURLParam('min', null);
                    updateURLParam('max', 1000);
                  }}
                  className={`py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                    maxPrice === 1000 && minPrice === catalogPriceBounds.min
                      ? 'bg-[#E8BFC3] text-[#332522] border-[#E8BFC3]'
                      : 'bg-[#FFF9F5] text-[#332522]/80 border-[#E8BFC3]/30 hover:bg-[#E8BFC3]/20'
                  }`}
                >
                  Under ₹1k
                </button>

                <button
                  type="button"
                  onClick={() => {
                    updateURLParam('min', 1000);
                    updateURLParam('max', 3000);
                  }}
                  className={`py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                    minPrice === 1000 && maxPrice === 3000
                      ? 'bg-[#E8BFC3] text-[#332522] border-[#E8BFC3]'
                      : 'bg-[#FFF9F5] text-[#332522]/80 border-[#E8BFC3]/30 hover:bg-[#E8BFC3]/20'
                  }`}
                >
                  ₹1k - ₹3k
                </button>

                <button
                  type="button"
                  onClick={() => {
                    updateURLParam('min', 3000);
                    updateURLParam('max', null);
                  }}
                  className={`py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                    minPrice === 3000 && maxPrice === catalogPriceBounds.max
                      ? 'bg-[#E8BFC3] text-[#332522] border-[#E8BFC3]'
                      : 'bg-[#FFF9F5] text-[#332522]/80 border-[#E8BFC3]/30 hover:bg-[#E8BFC3]/20'
                  }`}
                >
                  Above ₹3k
                </button>
              </div>

              {/* Price Range Slider */}
              <input
                type="range"
                min={catalogPriceBounds.min}
                max={catalogPriceBounds.max}
                step={100}
                value={maxPrice}
                onChange={(e) => updateURLParam('max', Number(e.target.value))}
                className="w-full accent-[#C6A16B] cursor-pointer"
              />
            </div>

            {/* Badges & Availability Toggles */}
            <div className="space-y-3 pt-3 border-t border-[#E8BFC3]/30">
              <span className="block text-xs font-bold uppercase tracking-wider text-[#332522]">
                Status & Collections
              </span>

              <label className="flex items-center justify-between text-xs font-semibold text-[#332522] cursor-pointer bg-[#FFF9F5] p-2.5 rounded-xl border border-[#E8BFC3]/20 hover:border-[#C6A16B]">
                <span className="flex items-center gap-2">
                  <Package size={14} className="text-[#C6A16B]" />
                  In Stock Only
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#332522]/60">({badgeCounts.inStock})</span>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => updateURLParam('stock', e.target.checked ? '1' : null)}
                    className="w-4 h-4 accent-[#C6A16B]"
                  />
                </div>
              </label>

              <label className="flex items-center justify-between text-xs font-semibold text-[#332522] cursor-pointer bg-[#FFF9F5] p-2.5 rounded-xl border border-[#E8BFC3]/20 hover:border-[#C6A16B]">
                <span className="flex items-center gap-2">
                  <Clock size={14} className="text-[#C6A16B]" />
                  New Arrivals
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#332522]/60">({badgeCounts.newArrivals})</span>
                  <input
                    type="checkbox"
                    checked={filterType === 'new'}
                    onChange={(e) => updateURLParam('filter', e.target.checked ? 'new' : null)}
                    className="w-4 h-4 accent-[#C6A16B]"
                  />
                </div>
              </label>

              <label className="flex items-center justify-between text-xs font-semibold text-[#332522] cursor-pointer bg-[#FFF9F5] p-2.5 rounded-xl border border-[#E8BFC3]/20 hover:border-[#C6A16B]">
                <span className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-[#C6A16B]" />
                  Trending Collection
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#332522]/60">({badgeCounts.trending})</span>
                  <input
                    type="checkbox"
                    checked={filterType === 'trending'}
                    onChange={(e) => updateURLParam('filter', e.target.checked ? 'trending' : null)}
                    className="w-4 h-4 accent-[#C6A16B]"
                  />
                </div>
              </label>
            </div>

            {/* Star Rating Filter */}
            <div className="space-y-2 pt-3 border-t border-[#E8BFC3]/30">
              <span className="block text-xs font-bold uppercase tracking-wider text-[#332522]">
                Customer Rating
              </span>
              <div className="space-y-1.5">
                {[4, 3, 2].map((stars) => (
                  <button
                    key={stars}
                    type="button"
                    onClick={() => updateURLParam('rating', minRating === stars ? null : stars)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                      minRating === stars
                        ? 'bg-[#E8BFC3] text-[#332522] border-[#E8BFC3] font-bold'
                        : 'bg-[#FFF9F5] text-[#332522]/80 border-[#E8BFC3]/30 hover:border-[#C6A16B]'
                    }`}
                  >
                    <div className="flex items-center gap-1 text-[#C6A16B]">
                      {Array.from({ length: stars }).map((_, i) => (
                        <Star key={i} size={12} className="fill-current" />
                      ))}
                      <span className="text-[#332522] ml-1">{stars}★ & Above</span>
                    </div>
                    {minRating === stars && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN PRODUCT GRID SECTION */}
          <div className="col-span-1 lg:col-span-9 space-y-6">

            {/* ACTIVE FILTERS SUMMARY BAR */}
            {activeFilters.length > 0 && (
              <div className="bg-white p-4 rounded-2xl border border-[#E8BFC3]/30 shadow-xs flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase font-bold text-[#C6A16B] tracking-wider mr-1">
                  Active Filters:
                </span>
                {activeFilters.map((f) => (
                  <span
                    key={f.id}
                    className="inline-flex items-center gap-1.5 bg-[#FFF9F5] text-[#332522] text-xs font-bold px-3 py-1 rounded-xl border border-[#E8BFC3]/40"
                  >
                    <span>{f.label}</span>
                    <button
                      type="button"
                      onClick={f.clear}
                      className="hover:text-red-600 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
                <button
                  type="button"
                  onClick={handleClearAllFilters}
                  className="text-xs text-[#C6A16B] hover:text-[#332522] font-bold underline ml-auto"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* TOP BAR: RESULTS COUNT & SORT DESKTOP */}
            <div className="flex justify-between items-center text-xs text-[#332522]/80 font-semibold px-1">
              <span aria-live="polite">
                Showing{' '}
                <strong className="text-[#332522] font-bold">
                  {displayedProducts.length}
                </strong>{' '}
                of{' '}
                <strong className="text-[#332522] font-bold">
                  {filteredAndSortedProducts.length}
                </strong>{' '}
                pieces
              </span>

              {/* Desktop Sort Dropdown */}
              <div className="hidden lg:flex items-center space-x-2">
                <span className="uppercase tracking-wider font-bold text-[#332522]">Sort By:</span>
                <select
                  value={sortByParam}
                  onChange={(e) => updateURLParam('sort', e.target.value)}
                  className="bg-white text-xs text-[#332522] font-bold px-3 py-2 rounded-xl border border-[#E8BFC3]/40 focus:outline-none focus:border-[#C6A16B]"
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* PRODUCT GRID OR SKELETON LOADING OR EMPTY STATE */}
            {isLoading ? (
              /* Skeleton Loading Cards */
              <div
                className={`grid grid-cols-2 ${
                  gridDensity === 'compact' ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
                } gap-5`}
              >
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-4 border border-[#E8BFC3]/30 space-y-3 animate-pulse"
                  >
                    <div className="w-full aspect-square bg-[#E8E1D5] rounded-xl" />
                    <div className="h-4 bg-[#E8E1D5] rounded w-3/4" />
                    <div className="h-3 bg-[#E8E1D5] rounded w-1/2" />
                    <div className="h-5 bg-[#E8E1D5] rounded w-1/3 pt-2" />
                  </div>
                ))}
              </div>
            ) : displayedProducts.length > 0 ? (
              /* Real Product Grid */
              <div
                className={`grid grid-cols-2 ${
                  gridDensity === 'compact' ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
                } gap-4 sm:gap-6`}
              >
                {displayedProducts.map((product) => (
                  <div key={product.id} className="relative group">
                    <ProductCard
                      product={product}
                      onAddToCart={onAddToCart}
                    />
                    {/* Quick View Button Overlay */}
                    <button
                      type="button"
                      onClick={() => setQuickViewProduct(product)}
                      className="absolute top-3 right-3 bg-white/95 text-[#332522] text-[10px] uppercase font-bold tracking-wider px-2.5 py-1.5 rounded-lg border border-[#E8BFC3]/50 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-[#332522] hover:text-white cursor-pointer z-20"
                    >
                      Quick View
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              /* Rich Empty State */
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E8BFC3]/40 shadow-xs max-w-xl mx-auto space-y-6 my-12">
                <div className="w-16 h-16 bg-[#FFF9F5] rounded-full flex items-center justify-center mx-auto border border-[#E8BFC3]/40 text-[#C6A16B]">
                  <Search size={28} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#332522]">No Matching Products Found</h3>
                  <p className="text-sm text-[#332522]/70 mt-2">
                    We couldn't find any products matching your current search or filter combination.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleClearAllFilters}
                    className="bg-[#332522] text-[#FFF9F5] px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-black transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>

                {/* Category Recommendations */}
                <div className="pt-6 border-t border-[#E8BFC3]/30">
                  <span className="text-xs uppercase font-bold text-[#C6A16B] tracking-wider block mb-3">
                    Explore Popular Departments:
                  </span>
                  <div className="flex flex-wrap justify-center gap-2">
                    {categories.slice(0, 4).map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => updateURLParam('category', c.slug || c.id)}
                        className="text-xs font-semibold text-[#332522] bg-[#FFF9F5] px-3.5 py-1.5 rounded-xl border border-[#E8BFC3]/40 hover:border-[#C6A16B]"
                      >
                        {c.name} &rarr;
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* NUMBERED PAGINATION CONTROLS */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 pt-8 border-t border-[#E8BFC3]/30">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => updateURLParam('page', currentPage - 1)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    currentPage === 1
                      ? 'opacity-40 cursor-not-allowed border-gray-200'
                      : 'bg-white border-[#E8BFC3]/40 hover:bg-[#E8BFC3] text-[#332522]'
                  }`}
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }).map((_, i) => {
                  const pNum = i + 1;
                  return (
                    <button
                      key={pNum}
                      type="button"
                      onClick={() => updateURLParam('page', pNum)}
                      className={`w-10 h-10 rounded-xl text-xs font-bold transition-all border ${
                        currentPage === pNum
                          ? 'bg-[#332522] text-[#FFF9F5] border-[#332522] shadow-sm'
                          : 'bg-white text-[#332522] border-[#E8BFC3]/40 hover:border-[#C6A16B]'
                      }`}
                    >
                      {pNum}
                    </button>
                  );
                })}

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => updateURLParam('page', currentPage + 1)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    currentPage === totalPages
                      ? 'opacity-40 cursor-not-allowed border-gray-200'
                      : 'bg-white border-[#E8BFC3]/40 hover:bg-[#E8BFC3] text-[#332522]'
                  }`}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* MOBILE FILTER DRAWER / BOTTOM SHEET (< 1024px) */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-[9999] lg:hidden flex flex-col justify-end select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative z-10 bg-white rounded-t-3xl border-t border-[#E8BFC3]/50 p-6 max-h-[85vh] overflow-y-auto space-y-6"
            >
              {/* Drag Handle */}
              <div className="w-12 h-1 bg-[#E8BFC3]/60 rounded-full mx-auto -mt-2 mb-4" />

              <div className="flex justify-between items-center pb-3 border-b border-[#E8BFC3]/30">
                <h3 className="font-serif font-bold text-xl text-[#332522] flex items-center gap-2">
                  <Filter size={20} className="text-[#C6A16B]" /> Filter Catalog
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-[#332522]/60 hover:text-[#332522]"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Search */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#332522] mb-1.5">
                  Search
                </label>
                <input
                  type="text"
                  value={searchInputValue}
                  onChange={(e) => setSearchInputValue(e.target.value)}
                  placeholder="Search catalogue..."
                  className="w-full bg-[#FFF9F5] text-sm text-[#332522] px-4 py-3 rounded-xl border border-[#E8BFC3]/40 font-semibold"
                />
              </div>

              {/* Mobile Price Range & Presets */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="uppercase tracking-wider text-[#332522]">Max Price</span>
                  <span className="text-[#C6A16B] font-mono">₹{maxPrice}</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => updateURLParam('max', 1000)}
                    className="py-2 rounded-xl text-xs font-bold bg-[#FFF9F5] border border-[#E8BFC3]/40"
                  >
                    Under ₹1k
                  </button>
                  <button
                    type="button"
                    onClick={() => updateURLParam('max', 3000)}
                    className="py-2 rounded-xl text-xs font-bold bg-[#FFF9F5] border border-[#E8BFC3]/40"
                  >
                    Under ₹3k
                  </button>
                  <button
                    type="button"
                    onClick={() => updateURLParam('max', null)}
                    className="py-2 rounded-xl text-xs font-bold bg-[#FFF9F5] border border-[#E8BFC3]/40"
                  >
                    All Prices
                  </button>
                </div>

                <input
                  type="range"
                  min={catalogPriceBounds.min}
                  max={catalogPriceBounds.max}
                  step={100}
                  value={maxPrice}
                  onChange={(e) => updateURLParam('max', Number(e.target.value))}
                  className="w-full accent-[#C6A16B]"
                />
              </div>

              {/* Mobile Toggles */}
              <div className="space-y-3 pt-3 border-t border-[#E8BFC3]/30">
                <label className="flex items-center justify-between text-xs font-bold text-[#332522]">
                  <span>In Stock Only</span>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => updateURLParam('stock', e.target.checked ? '1' : null)}
                    className="w-4 h-4 accent-[#C6A16B]"
                  />
                </label>

                <label className="flex items-center justify-between text-xs font-bold text-[#332522]">
                  <span>New Arrivals Only</span>
                  <input
                    type="checkbox"
                    checked={filterType === 'new'}
                    onChange={(e) => updateURLParam('filter', e.target.checked ? 'new' : null)}
                    className="w-4 h-4 accent-[#C6A16B]"
                  />
                </label>
              </div>

              {/* Apply Button */}
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-4 bg-[#332522] text-[#FFF9F5] font-bold text-xs uppercase tracking-widest rounded-xl shadow-md mt-4"
              >
                Apply Filters ({filteredAndSortedProducts.length} Items)
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};
