import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingBag, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart?: (product: Product) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setAdded(false);
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const isAvailable = product.inStock !== false;
  const price = Number(product.price) || 0;
  const originalPrice = Number(product.originalPrice);
  const hasOriginalPrice = Number.isFinite(originalPrice) && originalPrice > price;

  const handleAdd = () => {
    if (isAvailable && onAddToCart) {
      for (let i = 0; i < quantity; i++) {
        onAddToCart(product);
      }
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 lg:p-8 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#171511]/80 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-4xl bg-[#F7F4EE] border border-[#A18B70]/30 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#38352F]/10 hover:bg-[#38352F] text-[#38352F] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} strokeWidth={1.5} />
          </button>

          {/* Left Column: High-Res Image Showcase */}
          <div className="md:w-1/2 relative bg-[#E8E1D5] overflow-hidden min-h-[320px] md:min-h-[460px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-[#F7F4EE] text-[#38352F] text-[9px] uppercase tracking-[0.18em] px-3 py-1 font-semibold border border-[#38352F]/20">
                New Arrival
              </span>
            )}
            {!isAvailable && (
              <span className="absolute top-4 left-4 bg-[#38352F] text-white text-[9px] uppercase tracking-[0.18em] px-3 py-1 font-semibold">
                Sold Out
              </span>
            )}
          </div>

          {/* Right Column: Product Details & Purchase Form */}
          <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#927B60]">
                {product.category || 'Atelier Collection'}
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl text-[#38352F] font-normal leading-tight mt-1">
                {product.name}
              </h2>

              {product.subCategory && (
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#927B60] mt-1">
                  {product.subCategory}
                </p>
              )}

              <div className="flex items-center gap-2 mt-3 text-xs">
                <div className="flex items-center gap-1 text-[#927B60]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold text-[#38352F]">{product.rating || 5.0}</span>
                </div>
                <span className="text-[#CFC5B6]">|</span>
                <span className="text-[#777064]">({product.reviewsCount || 0} customer reviews)</span>
              </div>

              {/* Price & Cut MRP */}
              <div className="flex items-baseline gap-3 my-5 py-3 border-y border-[#D8D0C3]">
                <span className="font-serif text-2xl sm:text-3xl font-medium text-[#38352F]">
                  ₹{price.toFixed(2)}
                </span>
                {hasOriginalPrice && (
                  <span className="text-sm text-[#999184] line-through">
                    ₹{originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[#6F695F] leading-relaxed line-clamp-4">
                {product.description || 'Handcrafted luxury piece designed for refined living.'}
              </p>
            </div>

            {/* Actions: Quantity + Add To Cart + Direct View */}
            <div className="mt-6 pt-4 border-t border-[#D8D0C3] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#625B50] font-semibold">Quantity</span>
                <div className="flex items-center border border-[#BDB3A4] bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1 text-sm text-[#38352F] hover:bg-[#F7F4EE] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-semibold text-[#38352F]">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1 text-sm text-[#38352F] hover:bg-[#F7F4EE] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                disabled={!isAvailable || !onAddToCart}
                className={`w-full min-h-[50px] flex items-center justify-center gap-3 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 ${
                  added
                    ? 'bg-[#596347] text-white'
                    : isAvailable && onAddToCart
                    ? 'bg-[#38352F] text-[#F7F4EE] hover:bg-[#927B60]'
                    : 'bg-[#D8D0C3] text-[#777064] cursor-not-allowed'
                }`}
              >
                {added ? (
                  <>
                    <Check size={16} />
                    <span>Added {quantity} To Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>{isAvailable ? `Add ${quantity} To Shopping Bag` : 'Sold Out'}</span>
                  </>
                )}
              </button>

              <div className="flex justify-between items-center pt-2">
                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-[#927B60] border-b border-[#927B60] pb-0.5 hover:text-[#38352F]"
                >
                  <span>Full Product Details</span>
                  <ArrowRight size={12} />
                </Link>
                <span className="text-[9px] uppercase tracking-[0.16em] text-[#999184]">
                  {isAvailable ? 'In Stock · Fast Shipping' : 'Out Of Stock'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
