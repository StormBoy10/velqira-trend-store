import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft, Plus, Minus, Sparkles, ShieldCheck, RefreshCw, Package } from 'lucide-react';
import type { CartItem } from '../types';

interface CartPageProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

const FREE_SHIPPING_THRESHOLD = 499;

export const CartPage: React.FC<CartPageProps> = ({ cart, onUpdateQuantity, onRemoveItem }) => {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  const subtotal = cart.reduce(
    (acc, item) => acc + (Number(item.product.price) || 0) * item.quantity,
    0
  );

  const discount = appliedPromo === 'VELQIRA10' ? subtotal * 0.1 : 0;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
  const shipping = isFreeShipping ? 0 : 50;
  const total = Math.max(0, subtotal - discount + shipping);

  const progressToFreeShipping = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const amountRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    if (!promoCode.trim()) return;

    if (promoCode.trim().toUpperCase() === 'VELQIRA10') {
      setAppliedPromo('VELQIRA10');
      setPromoCode('');
    } else {
      setPromoError('Invalid coupon code. Try VELQIRA10 for 10% off.');
    }
  };

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#F7F4EE] py-20 lg:py-28">
        <div className="boho-container max-w-2xl text-center">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-[#EEE9DF] border border-[#DED6C9] text-[#A18B70]">
            <ShoppingBag className="w-9 h-9" strokeWidth={1.2} />
          </div>

          <p className="text-[11px] uppercase tracking-[0.26em] text-[#927B60] font-medium mb-3">
            The Velqira Bag
          </p>

          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#38352F] mb-4">
            Your shopping bag is empty
          </h1>

          <p className="text-sm sm:text-base text-[#777064] leading-relaxed max-w-md mx-auto mb-10">
            Explore our curated collections of artisanal fashion, handcrafted jewellery, and intentional living essentials.
          </p>

          <Link
            to="/shop"
            className="boho-button inline-flex items-center gap-4 px-10 py-4 text-xs font-semibold tracking-[0.2em]"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F4EE] py-10 sm:py-14 lg:py-16">
      <div className="boho-container">
        {/* Back Link & Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12 border-b border-[#E4DED3] pb-6">
          <div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#927B60] hover:text-[#38352F] mb-4 transition-colors font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </Link>

            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#38352F]">
              Shopping Bag
            </h1>
          </div>

          <p className="text-xs uppercase tracking-[0.16em] text-[#777064]">
            {cart.reduce((sum, item) => sum + item.quantity, 0)} items in your selection
          </p>
        </div>

        {/* Complimentary Shipping Progress Banner */}
        <div className="mb-10 p-5 bg-[#EEE9DF] border border-[#DED6C9]">
          <div className="flex items-center justify-between mb-2 text-xs text-[#38352F]">
            <div className="flex items-center gap-2 font-medium">
              <Sparkles className="w-4 h-4 text-[#A18B70]" />
              <span>
                {amountRemaining > 0 ? (
                  <>
                    Add <strong className="text-[#38352F]">₹{amountRemaining.toFixed(2)}</strong> more to unlock complimentary express delivery
                  </>
                ) : (
                  <span className="text-[#4E5C38] font-semibold">
                    ✦ Complimentary Express Shipping Unlocked!
                  </span>
                )}
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#777064] font-medium">
              {amountRemaining > 0 ? `${Math.round(progressToFreeShipping)}% complete` : 'Eligible'}
            </span>
          </div>

          <div className="w-full h-1.5 bg-[#DED6C9] overflow-hidden">
            <div
              className="h-full bg-[#A18B70] transition-all duration-500 ease-out"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Main Grid: Items Table & Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="border border-[#E4DED3] bg-white divide-y divide-[#E4DED3]">
              {cart.map(({ product, quantity }) => {
                const itemPrice = Number(product.price) || 0;
                return (
                  <div
                    key={product.id}
                    className="p-5 sm:p-7 flex flex-col sm:flex-row gap-5 sm:gap-6 items-start sm:items-center justify-between"
                  >
                    {/* Thumbnail & Description */}
                    <div className="flex gap-4 sm:gap-6 items-center flex-1 min-w-0">
                      <Link
                        to={`/product/${product.id}`}
                        className="relative w-20 h-20 sm:w-24 sm:h-24 bg-[#E8E1D5] overflow-hidden shrink-0 group"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>

                      <div className="min-w-0 flex-1">
                        {product.subCategory && (
                          <span className="text-[9px] uppercase tracking-[0.2em] text-[#927B60] block mb-1">
                            {product.subCategory}
                          </span>
                        )}

                        <Link
                          to={`/product/${product.id}`}
                          className="font-serif text-base sm:text-lg text-[#38352F] hover:text-[#A18B70] transition-colors leading-snug line-clamp-2"
                        >
                          {product.name}
                        </Link>

                        <p className="text-xs text-[#777064] mt-1">
                          Unit price: ₹{itemPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls & Line Total */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E4DED3]">
                      <div className="inline-flex items-center border border-[#D8D0C3] bg-[#F7F4EE]">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          className="w-8 h-8 flex items-center justify-center text-[#38352F] hover:bg-[#EEE9DF] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-9 text-center text-xs font-semibold text-[#38352F]">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#38352F] hover:bg-[#EEE9DF] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-serif text-base sm:text-lg text-[#38352F] font-medium block">
                          ₹{(itemPrice * quantity).toFixed(2)}
                        </span>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(product.id)}
                          className="text-[10px] uppercase tracking-[0.15em] text-[#999184] hover:text-[#9B3B3B] mt-1 transition-colors inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            <div className="bg-white border border-[#E4DED3] p-6 sm:p-8">
              <h2 className="font-serif text-2xl text-[#38352F] font-normal mb-6 pb-4 border-b border-[#E4DED3]">
                Order Summary
              </h2>

              <div className="space-y-3.5 text-sm">
                <div className="flex justify-between text-[#777064]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#38352F]">₹{subtotal.toFixed(2)}</span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-[#4E5C38] font-medium">
                    <span className="flex items-center gap-1">
                      <span>Promo ({appliedPromo})</span>
                    </span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#777064]">
                  <span>Shipping</span>
                  <span className="font-medium text-[#38352F]">
                    {shipping === 0 ? (
                      <span className="text-[#4E5C38] font-semibold">Complimentary</span>
                    ) : (
                      `₹${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="pt-4 border-t border-[#E4DED3] flex justify-between items-baseline text-[#38352F]">
                  <div>
                    <span className="font-serif text-xl sm:text-2xl font-normal block">Total</span>
                    <span className="text-[10px] text-[#999184]">Includes all applicable GST & taxes</span>
                  </div>
                  <span className="font-serif text-2xl sm:text-3xl font-normal text-[#38352F]">
                    ₹{total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="mt-6 pt-6 border-t border-[#E4DED3]">
                <label className="block text-[10px] uppercase tracking-[0.18em] text-[#777064] font-medium mb-2">
                  Promotional Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="e.g. VELQIRA10"
                    className="flex-1 bg-[#F7F4EE] border border-[#D8D0C3] text-xs px-3.5 py-3 text-[#38352F] placeholder-[#999184] focus:outline-none focus:border-[#A18B70]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-[#38352F] text-white text-[10px] uppercase tracking-[0.16em] font-semibold hover:bg-[#A18B70] transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-[11px] text-[#9B3B3B] mt-2">{promoError}</p>
                )}
                {appliedPromo && (
                  <p className="text-[11px] text-[#4E5C38] mt-2 font-medium">
                    ✓ Promo code VELQIRA10 applied (10% discount).
                  </p>
                )}
              </form>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="w-full mt-6 boho-button py-4 text-xs font-semibold tracking-[0.2em] flex items-center justify-center gap-3"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Reassurance Badges */}
            <div className="bg-[#EEE9DF] border border-[#DED6C9] p-5 space-y-4">
              <div className="flex items-center gap-3 text-xs text-[#38352F]">
                <Package className="w-4 h-4 text-[#A18B70] shrink-0" />
                <span>Complimentary artisanal gift packaging included</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#38352F]">
                <RefreshCw className="w-4 h-4 text-[#A18B70] shrink-0" />
                <span>30-day effortless returns on all signature items</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#38352F]">
                <ShieldCheck className="w-4 h-4 text-[#A18B70] shrink-0" />
                <span>100% secure encrypted payment processing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
