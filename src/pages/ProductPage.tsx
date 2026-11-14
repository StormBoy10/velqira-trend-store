import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  ShoppingBag,
  ArrowLeft,
  Check,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';

import { getProductById } from '../services';
import type { Product } from '../types';

interface ProductPageProps {
  onAddToCart?: (product: Product) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  onAddToCart,
}) => {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageOpen, setImageOpen] = useState(false);
  const [imageZoom, setImageZoom] = useState(1);

  useEffect(() => {
    let cancelled = false;

    const loadProduct = async () => {
      setLoading(true);
      setProduct(null);

      try {
        if (id) {
          const result = await getProductById(id);

          if (!cancelled) {
            setProduct(result || null);
          }
        }
      } catch (error) {
        console.error('Failed to load product:', error);

        if (!cancelled) {
          setProduct(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    if (!imageOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setImageOpen(false);
        setImageZoom(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [imageOpen]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F4EE] flex items-center justify-center">
        <p className="font-serif text-xl text-[#777064]">
          Discovering your selection...
        </p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[#F7F4EE] flex flex-col items-center justify-center text-center px-5">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#927B60] mb-3">
          Velqira collection
        </p>

        <h2 className="text-3xl sm:text-4xl font-serif text-[#38352F]">
          Product not found
        </h2>

        <Link
          to="/shop"
          className="mt-6 text-xs uppercase tracking-[0.16em] text-[#927B60] border-b border-[#927B60] pb-2"
        >
          Return to shop
        </Link>
      </main>
    );
  }

  const isAvailable = product.inStock !== false;
  const price = Number(product.price) || 0;
  const originalPrice = Number(product.originalPrice);
  const hasOriginalPrice =
    Number.isFinite(originalPrice) && originalPrice > price;

  return (
    <main className="min-h-screen bg-[#F7F4EE] py-8 sm:py-12 lg:py-16">
      <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 xl:px-12 2xl:px-16">

        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 lg:mb-12">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.17em] text-[#777064] hover:text-[#38352F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to collection
          </Link>

          <span className="text-[10px] uppercase tracking-[0.17em] text-[#927B60]">
            Velqira Trend Store
          </span>
        </div>

        {/* Product layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-24 items-start">

          {/* Product image with zoom trigger */}
          <div className="min-w-0">
            <button
              type="button"
              onClick={() => {
                setImageZoom(1);
                setImageOpen(true);
              }}
              aria-label="View enlarged product image"
              className="relative w-full aspect-[4/5] max-h-[950px] overflow-hidden bg-[#E8E1D5] cursor-zoom-in group"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              <span className="absolute bottom-5 right-5 bg-[#F7F4EE]/95 text-[#38352F] px-4 py-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.15em]">
                <ZoomIn className="w-4 h-4" />
                Click to enlarge
              </span>
            </button>
          </div>

          {/* Product information */}
          <div className="lg:sticky lg:top-24 py-2 lg:py-8 xl:py-12">

            <p className="text-[10px] uppercase tracking-[0.25em] text-[#927B60] mb-5">
              {product.category || 'The collection'}
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl xl:text-6xl font-normal text-[#38352F] leading-tight">
              {product.name}
            </h1>

            {product.subCategory && (
              <p className="text-xs uppercase tracking-[0.16em] text-[#927B60] mt-4">
                {product.subCategory}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 mt-6">
              <div className="flex items-center gap-1.5 text-[#927B60]">
                <Star className="w-4 h-4 fill-current" />

                <span className="text-sm font-semibold text-[#38352F]">
                  {product.rating || 5.0}
                </span>
              </div>

              <span className="w-px h-4 bg-[#CFC5B6]" />

              <span className="text-xs text-[#777064]">
                {product.reviewsCount || 0} customer reviews
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-baseline gap-4 border-y border-[#D8D0C3] py-6">
              <span className="font-serif text-3xl sm:text-4xl text-[#38352F]">
                ₹{price.toFixed(2)}
              </span>

              {hasOriginalPrice && (
                <>
                  <span className="text-lg text-[#999184] line-through">
                    ₹{originalPrice.toFixed(2)}
                  </span>

                  <span className="text-[9px] uppercase tracking-[0.15em] text-[#927B60]">
                    Special price
                  </span>
                </>
              )}
            </div>

            <div className="mt-8">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#927B60] font-semibold mb-3">
                Product details
              </p>

              <p className="text-sm sm:text-base text-[#6F695F] leading-8">
                {product.description ||
                  'A thoughtfully selected piece from the Velqira collection.'}
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3 text-xs">
              {isAvailable ? (
                <>
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E4E7D9] text-[#596347]">
                    <Check className="w-3.5 h-3.5" />
                  </span>

                  <span className="text-[#596347]">
                    Available to order
                  </span>
                </>
              ) : (
                <span className="text-[#927B60]">
                  Currently unavailable
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                if (isAvailable && onAddToCart) {
                  onAddToCart(product);
                }
              }}
              disabled={!isAvailable || !onAddToCart}
              className={`mt-8 w-full min-h-14 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors ${
                isAvailable && onAddToCart
                  ? 'bg-[#38352F] text-[#F7F4EE] hover:bg-[#927B60]'
                  : 'bg-[#D8D0C3] text-[#777064] cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />

              {isAvailable
                ? 'Add to shopping bag'
                : 'Currently unavailable'}
            </button>

            <p className="text-[10px] text-center text-[#999184] mt-4 leading-relaxed">
              Artisanal Grace. Modern Elegance.
            </p>

          </div>
        </div>
      </div>

      {/* Full-screen product image viewer */}
      {imageOpen && (
        <div
          className="fixed inset-0 z-[10000] bg-[#171511]/95 flex items-center justify-center p-3 sm:p-8"
          onClick={() => {
            setImageOpen(false);
            setImageZoom(1);
          }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => {
              setImageOpen(false);
              setImageZoom(1);
            }}
            aria-label="Close image viewer"
            className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image area */}
          <div
            className="w-full h-full flex items-center justify-center overflow-auto"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={product.image}
              alt={product.name}
              onClick={() =>
                setImageZoom((previous) =>
                  previous >= 2.5 ? 1 : Math.min(previous + 0.5, 3)
                )
              }
              style={{
                transform: `scale(${imageZoom})`,
                transformOrigin: 'center center',
              }}
              className="max-w-full max-h-full object-contain cursor-zoom-in transition-transform duration-300"
            />
          </div>

          {/* Zoom controls */}
          <div
            className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#F7F4EE] px-3 py-2 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() =>
                setImageZoom((previous) => Math.max(1, previous - 0.5))
              }
              disabled={imageZoom <= 1}
              aria-label="Zoom out"
              className="p-2 text-[#38352F] disabled:opacity-30 hover:bg-[#E8E1D5]"
            >
              <ZoomOut className="w-5 h-5" />
            </button>

            <span className="text-xs font-medium text-[#38352F] min-w-12 text-center">
              {Math.round(imageZoom * 100)}%
            </span>

            <button
              type="button"
              onClick={() =>
                setImageZoom((previous) => Math.min(3, previous + 0.5))
              }
              disabled={imageZoom >= 3}
              aria-label="Zoom in"
              className="p-2 text-[#38352F] disabled:opacity-30 hover:bg-[#E8E1D5]"
            >
              <ZoomIn className="w-5 h-5" />
            </button>

            <span className="w-px h-6 bg-[#D8D0C3]" />

            <button
              type="button"
              onClick={() => setImageZoom(1)}
              aria-label="Reset zoom"
              className="p-2 text-[#38352F] hover:bg-[#E8E1D5]"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
