import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck, Lock, ArrowLeft, CreditCard, Smartphone, Check, Building2 } from 'lucide-react';
import type { CartItem } from '../types';

interface CheckoutPageProps {
  cart: CartItem[];
  onClearCart: () => void;
}

const FREE_SHIPPING_THRESHOLD = 499;

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, onClearCart }) => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Maharashtra',
    postalCode: '',
    country: 'India',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    upiId: '',
  });

  const subtotal = cart.reduce(
    (acc, item) => acc + (Number(item.product.price) || 0) * item.quantity,
    0
  );

  const discount = appliedPromo === 'VELQIRA10' ? subtotal * 0.1 : 0;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
  const shipping = isFreeShipping ? 0 : 50;
  const total = Math.max(0, subtotal - discount + shipping);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrder = `VEL-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedOrder);
    setSubmitted(true);
    onClearCart();
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#F7F4EE] py-16 sm:py-24">
        <div className="boho-container max-w-xl mx-auto">
          <div className="bg-white border border-[#E4DED3] p-8 sm:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#EEE9DF] border border-[#DED6C9] flex items-center justify-center mx-auto mb-6 text-[#A18B70]">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>

            <p className="text-[10px] uppercase tracking-[0.25em] text-[#927B60] font-semibold mb-2">
              Order Confirmed
            </p>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#38352F] font-normal mb-4">
              Thank You for Your Order
            </h1>

            <p className="text-sm text-[#777064] leading-relaxed max-w-md mx-auto mb-6">
              Your order has been placed with utmost care. A formal confirmation and tracking dossier has been dispatched to{' '}
              <strong className="text-[#38352F]">{formData.email || 'your email'}</strong>.
            </p>

            <div className="p-4 bg-[#F7F4EE] border border-[#E4DED3] max-w-sm mx-auto mb-8 text-xs text-left space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#777064]">Order Reference:</span>
                <span className="font-mono font-bold text-[#38352F]">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777064]">Estimated Delivery:</span>
                <span className="font-medium text-[#38352F]">3 - 5 Business Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777064]">Packaging:</span>
                <span className="font-medium text-[#A18B70]">Artisanal Gift Box</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/')}
              className="boho-button w-full sm:w-auto px-10 py-4 text-xs font-semibold tracking-[0.2em]"
            >
              Return to Storefront
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#F7F4EE] py-24 text-center">
        <div className="boho-container max-w-md mx-auto">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#927B60] mb-2 font-medium">Checkout</p>
          <h2 className="text-3xl font-serif text-[#38352F] mb-4">No items to checkout</h2>
          <p className="text-sm text-[#777064] mb-8">Your bag is currently empty. Please select products to continue.</p>
          <Link to="/shop" className="boho-button px-8 py-3.5 text-xs">
            Discover The Collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F4EE] py-8 sm:py-12">
      <div className="boho-container">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E4DED3]">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#927B60] hover:text-[#38352F] font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Bag</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-[#777064]">
            <Lock className="w-3.5 h-3.5 text-[#A18B70]" />
            <span className="text-[10px] uppercase tracking-[0.16em] font-medium text-[#38352F]">
              256-Bit Encrypted Checkout
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          {/* Left Column: Form Details */}
          <div className="lg:col-span-7 xl:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Customer Contact */}
              <div className="bg-white border border-[#E4DED3] p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#E4DED3]">
                  <h2 className="font-serif text-xl sm:text-2xl text-[#38352F] font-normal">
                    1. Contact Information
                  </h2>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#927B60]">Step 1 of 3</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.18em] text-[#777064] font-medium mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@domain.com"
                      className="w-full bg-[#F7F4EE] border border-[#D8D0C3] text-sm px-4 py-3 text-[#38352F] focus:outline-none focus:border-[#A18B70]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.18em] text-[#777064] font-medium mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#F7F4EE] border border-[#D8D0C3] text-sm px-4 py-3 text-[#38352F] focus:outline-none focus:border-[#A18B70]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Destination */}
              <div className="bg-white border border-[#E4DED3] p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#E4DED3]">
                  <h2 className="font-serif text-xl sm:text-2xl text-[#38352F] font-normal flex items-center gap-2">
                    <Truck className="w-5 h-5 text-[#A18B70]" />
                    <span>2. Shipping Address</span>
                  </h2>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#927B60]">Step 2 of 3</span>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.18em] text-[#777064] font-medium mb-1.5">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full bg-[#F7F4EE] border border-[#D8D0C3] text-sm px-4 py-3 text-[#38352F] focus:outline-none focus:border-[#A18B70]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.18em] text-[#777064] font-medium mb-1.5">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full bg-[#F7F4EE] border border-[#D8D0C3] text-sm px-4 py-3 text-[#38352F] focus:outline-none focus:border-[#A18B70]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.18em] text-[#777064] font-medium mb-1.5">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Apartment, suite, street"
                      className="w-full bg-[#F7F4EE] border border-[#D8D0C3] text-sm px-4 py-3 text-[#38352F] focus:outline-none focus:border-[#A18B70]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.18em] text-[#777064] font-medium mb-1.5">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-[#F7F4EE] border border-[#D8D0C3] text-sm px-4 py-3 text-[#38352F] focus:outline-none focus:border-[#A18B70]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.18em] text-[#777064] font-medium mb-1.5">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full bg-[#F7F4EE] border border-[#D8D0C3] text-sm px-4 py-3 text-[#38352F] focus:outline-none focus:border-[#A18B70]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.18em] text-[#777064] font-medium mb-1.5">
                        Country
                      </label>
                      <input
                        type="text"
                        disabled
                        value="India"
                        className="w-full bg-[#EEE9DF] border border-[#D8D0C3] text-sm px-4 py-3 text-[#777064]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="bg-white border border-[#E4DED3] p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#E4DED3]">
                  <h2 className="font-serif text-xl sm:text-2xl text-[#38352F] font-normal flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#A18B70]" />
                    <span>3. Payment Selection</span>
                  </h2>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#927B60]">Step 3 of 3</span>
                </div>

                {/* Payment Option Tabs */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3.5 border text-center transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#38352F] bg-[#F7F4EE] text-[#38352F]'
                        : 'border-[#E4DED3] bg-white text-[#777064] hover:border-[#A18B70]'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-1.5 text-[#A18B70]" />
                    <span className="text-[10px] uppercase tracking-[0.14em] font-semibold block">Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3.5 border text-center transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-[#38352F] bg-[#F7F4EE] text-[#38352F]'
                        : 'border-[#E4DED3] bg-white text-[#777064] hover:border-[#A18B70]'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 mx-auto mb-1.5 text-[#A18B70]" />
                    <span className="text-[10px] uppercase tracking-[0.14em] font-semibold block">UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3.5 border text-center transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#38352F] bg-[#F7F4EE] text-[#38352F]'
                        : 'border-[#E4DED3] bg-white text-[#777064] hover:border-[#A18B70]'
                    }`}
                  >
                    <Building2 className="w-5 h-5 mx-auto mb-1.5 text-[#A18B70]" />
                    <span className="text-[10px] uppercase tracking-[0.14em] font-semibold block">COD</span>
                  </button>
                </div>

                {/* Payment Details Form */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.18em] text-[#777064] font-medium mb-1.5">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="4111 2222 3333 4444"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full bg-[#F7F4EE] border border-[#D8D0C3] text-sm px-4 py-3 text-[#38352F] focus:outline-none focus:border-[#A18B70]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.18em] text-[#777064] font-medium mb-1.5">
                          Expiration (MM/YY)
                        </label>
                        <input
                          type="text"
                          placeholder="08/28"
                          value={formData.cardExpiry}
                          onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                          className="w-full bg-[#F7F4EE] border border-[#D8D0C3] text-sm px-4 py-3 text-[#38352F] focus:outline-none focus:border-[#A18B70]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.18em] text-[#777064] font-medium mb-1.5">
                          CVV Security Code
                        </label>
                        <input
                          type="password"
                          placeholder="•••"
                          maxLength={4}
                          value={formData.cardCvc}
                          onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                          className="w-full bg-[#F7F4EE] border border-[#D8D0C3] text-sm px-4 py-3 text-[#38352F] focus:outline-none focus:border-[#A18B70]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="pt-2">
                    <label className="block text-[10px] uppercase tracking-[0.18em] text-[#777064] font-medium mb-1.5">
                      Virtual Payment Address (UPI ID)
                    </label>
                    <input
                      type="text"
                      placeholder="username@okhdfcbank"
                      value={formData.upiId}
                      onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                      className="w-full bg-[#F7F4EE] border border-[#D8D0C3] text-sm px-4 py-3 text-[#38352F] focus:outline-none focus:border-[#A18B70]"
                    />
                    <p className="text-[11px] text-[#777064] mt-2">
                      A payment request will be triggered to your phone upon placing the order.
                    </p>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="pt-2 p-4 bg-[#F7F4EE] border border-[#E4DED3] text-xs text-[#38352F]">
                    <p className="font-semibold mb-1">Cash on Delivery Selected</p>
                    <p className="text-[#777064]">
                      Pay in cash or via mobile QR code upon delivery at your doorstep.
                    </p>
                  </div>
                )}
              </div>

              {/* Complete Order Submit Button */}
              <button
                type="submit"
                className="w-full boho-button py-4 text-xs font-semibold tracking-[0.2em] flex items-center justify-center gap-3"
              >
                <span>Authorize & Place Order — ₹{total.toFixed(2)}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Order Review Sidebar */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            <div className="bg-white border border-[#E4DED3] p-6 sm:p-8">
              <h3 className="font-serif text-xl sm:text-2xl text-[#38352F] font-normal mb-6 pb-3 border-b border-[#E4DED3]">
                Order Dossier
              </h3>

              {/* Thumbnails preview */}
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1 divide-y divide-[#E4DED3]/60 mb-6">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="pt-3 first:pt-0 flex items-center gap-3.5">
                    <div className="relative w-14 h-14 bg-[#E8E1D5] overflow-hidden shrink-0 border border-[#E4DED3]">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      <span className="absolute top-0 right-0 bg-[#38352F] text-white text-[9px] w-4 h-4 flex items-center justify-center font-mono">
                        {quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-xs text-[#38352F] truncate">{product.name}</p>
                      <p className="text-[10px] text-[#777064]">Qty: {quantity}</p>
                    </div>
                    <span className="font-serif text-xs text-[#38352F]">
                      ₹{((Number(product.price) || 0) * quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Promo code inside checkout */}
              <form onSubmit={handleApplyPromo} className="mb-6 pt-4 border-t border-[#E4DED3]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Coupon: VELQIRA10"
                    className="flex-1 bg-[#F7F4EE] border border-[#D8D0C3] text-xs px-3 py-2 text-[#38352F] placeholder-[#999184] focus:outline-none focus:border-[#A18B70]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#38352F] text-white text-[9px] uppercase tracking-[0.16em] font-semibold hover:bg-[#A18B70] transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-[10px] text-[#9B3B3B] mt-1.5">{promoError}</p>}
                {appliedPromo && (
                  <p className="text-[10px] text-[#4E5C38] mt-1.5 font-medium">✓ 10% discount applied!</p>
                )}
              </form>

              {/* Pricing breakdown */}
              <div className="space-y-3 text-xs border-t border-[#E4DED3] pt-4">
                <div className="flex justify-between text-[#777064]">
                  <span>Subtotal</span>
                  <span className="text-[#38352F]">₹{subtotal.toFixed(2)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-[#4E5C38] font-medium">
                    <span>Promo ({appliedPromo})</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#777064]">
                  <span>Express Shipping</span>
                  <span className="text-[#38352F]">
                    {shipping === 0 ? <span className="text-[#4E5C38]">Complimentary</span> : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-4 border-t border-[#E4DED3] text-[#38352F]">
                  <span className="font-serif text-lg font-normal">Total Due</span>
                  <span className="font-serif text-2xl font-normal">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#EEE9DF] border border-[#DED6C9] p-4 text-[10px] text-[#777064] space-y-2">
              <div className="flex items-center gap-2 text-[#38352F]">
                <ShieldCheck className="w-4 h-4 text-[#A18B70]" />
                <span className="uppercase tracking-wider font-semibold">Artisanal Grace Guarantee</span>
              </div>
              <p>Each order is hand-inspected and packed in recyclable archival tissue and gift boxes.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
