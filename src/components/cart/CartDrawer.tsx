import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import type { CartItem } from '../../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

const FREE_SHIPPING_THRESHOLD = 499;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const navigate = useNavigate();

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const subtotal = cart.reduce(
    (acc, item) => acc + (Number(item.product.price) || 0) * item.quantity,
    0
  );

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const progressToFreeShipping = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const amountRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1A1713]/50 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="relative z-10 w-full max-w-[480px] bg-[#F7F4EE] h-full flex flex-col shadow-2xl border-l border-[#E4DED3]"
            aria-label="Shopping bag drawer"
          >
            {/* Header */}
            <div className="px-6 sm:px-8 py-5 border-b border-[#E4DED3] flex items-center justify-between bg-[#F7F4EE]">
              <div className="flex items-baseline gap-2">
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#38352F]">
                  Shopping Bag
                </h2>
                <span className="text-xs uppercase tracking-[0.18em] text-[#927B60] font-medium">
                  ({totalItems} {totalItems === 1 ? 'piece' : 'pieces'})
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 text-[#38352F] hover:text-[#927B60] transition-colors"
                aria-label="Close shopping bag"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="px-6 sm:px-8 py-3.5 bg-[#EEE9DF] border-b border-[#E4DED3] text-xs">
              <div className="flex items-center justify-between mb-1.5 text-[#38352F]">
                <div className="flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#A18B70]" />
                  <span>
                    {amountRemaining > 0 ? (
                      <>
                        Add <strong className="text-[#38352F]">₹{amountRemaining.toFixed(2)}</strong> for free shipping
                      </>
                    ) : (
                      <span className="text-[#4E5C38] font-semibold">
                        ✦ You have unlocked complimentary express shipping
                      </span>
                    )}
                  </span>
                </div>
                <span className="text-[10px] text-[#777064] tracking-wider uppercase">
                  {amountRemaining > 0 ? `${Math.round(progressToFreeShipping)}%` : 'Unlocked'}
                </span>
              </div>

              <div className="w-full h-1 bg-[#DED6C9] overflow-hidden">
                <motion.div
                  className="h-full bg-[#A18B70]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToFreeShipping}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#EEE9DF] border border-[#DED6C9] flex items-center justify-center text-[#A18B70] mb-4">
                    <ShoppingBag className="w-7 h-7" strokeWidth={1.2} />
                  </div>
                  <h3 className="font-serif text-2xl text-[#38352F] font-normal mb-2">
                    Your bag is empty
                  </h3>
                  <p className="text-sm text-[#777064] max-w-[280px] leading-relaxed mb-8">
                    Discover our artisanal pieces inspired by natural beauty and effortless elegance.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      navigate('/shop');
                    }}
                    className="boho-button text-[10px] py-3.5 px-8"
                  >
                    Explore Collection
                  </button>
                </div>
              ) : (
                cart.map(({ product, quantity }) => {
                  const itemPrice = Number(product.price) || 0;
                  return (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-4 pb-6 border-b border-[#E4DED3] last:border-b-0"
                    >
                      {/* Product Thumbnail */}
                      <Link
                        to={`/product/${product.id}`}
                        onClick={onClose}
                        className="relative w-20 h-20 sm:w-24 sm:h-24 bg-[#E8E1D5] overflow-hidden shrink-0 group"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>

                      {/* Info & Quantity */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              to={`/product/${product.id}`}
                              onClick={onClose}
                              className="font-serif text-base text-[#38352F] hover:text-[#A18B70] transition-colors leading-snug line-clamp-2"
                            >
                              {product.name}
                            </Link>

                            <button
                              type="button"
                              onClick={() => onRemoveItem(product.id)}
                              className="text-[#999184] hover:text-[#38352F] p-1 transition-colors"
                              title="Remove item"
                              aria-label={`Remove ${product.name}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {product.subCategory && (
                            <p className="text-[10px] uppercase tracking-[0.14em] text-[#927B60] mt-1">
                              {product.subCategory}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-2">
                          {/* Quantity Selector */}
                          <div className="inline-flex items-center border border-[#D8D0C3] bg-[#F7F4EE]">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(product.id, -1)}
                              className="w-7 h-7 flex items-center justify-center text-[#38352F] hover:bg-[#EEE9DF] transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-medium text-[#38352F]">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(product.id, 1)}
                              className="w-7 h-7 flex items-center justify-center text-[#38352F] hover:bg-[#EEE9DF] transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Price */}
                          <span className="font-serif text-sm sm:text-base text-[#38352F] font-normal">
                            ₹{(itemPrice * quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer Summary & Actions */}
            {cart.length > 0 && (
              <div className="px-6 sm:px-8 py-5 border-t border-[#E4DED3] bg-[#F7F4EE] space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.18em] text-[#777064] block">
                      Subtotal
                    </span>
                    <span className="text-[10px] text-[#999184]">
                      Taxes & shipping calculated at checkout
                    </span>
                  </div>
                  <span className="font-serif text-2xl text-[#38352F]">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      navigate('/checkout');
                    }}
                    className="w-full boho-button py-4 text-xs font-semibold tracking-[0.18em] flex items-center justify-center gap-3"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      navigate('/cart');
                    }}
                    className="w-full py-3 text-center text-[11px] uppercase tracking-[0.18em] text-[#38352F] hover:text-[#927B60] font-medium border-b border-transparent hover:border-[#927B60] transition-colors"
                  >
                    View Full Shopping Bag
                  </button>
                </div>

                <div className="pt-2 text-center">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#999184]">
                    Artisanal Grace · Secure Checkout · Carbon Neutral
                  </p>
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
