import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, Truck, Lock } from 'lucide-react';
import type { CartItem } from '../types';

interface CheckoutPageProps {
  cart: CartItem[];
  onClearCart: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, onClearCart }) => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    paymentMethod: 'credit-card',
  });

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onClearCart();
  };

  if (submitted) {
    return (
      <div className="bg-[#FFF9F5] min-h-screen py-24">
        <div className="max-w-xl mx-auto px-4 text-center bg-white p-10 rounded-3xl border border-[#D9A6AB]/30 shadow-xl">
          <CheckCircle2 className="w-16 h-16 mx-auto text-[#C6A16B] mb-4" />
          <h2 className="text-3xl font-bold font-serif text-[#332522]">Order Confirmed!</h2>
          <p className="text-[#332522]/80 mt-2">
            Thank you for your order, <span className="font-semibold">{formData.firstName}</span>. We've sent a confirmation email to <span className="underline">{formData.email}</span>.
          </p>
          <p className="text-xs text-[#332522]/60 mt-4 bg-[#FFF9F5] p-3 rounded-xl border border-[#D9A6AB]/20">
            Order Reference: <span className="font-mono font-bold text-[#C6A16B]">#VEL-{Math.floor(100000 + Math.random() * 900000)}</span>
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-8 bg-[#E8BFC3] text-[#332522] px-8 py-3.5 rounded-xl font-bold hover:bg-[#D9A6AB] transition-colors shadow-xs"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="bg-[#FFF9F5] min-h-screen py-24 text-center">
        <h2 className="text-2xl font-bold text-[#332522] font-serif">No items to checkout</h2>
        <Link to="/shop" className="text-sm font-semibold text-[#C6A16B] hover:underline mt-4 inline-block">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF9F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold font-serif text-[#332522] mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Shipping Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#D9A6AB]/30 shadow-xs">
            <h2 className="text-xl font-bold font-serif text-[#332522] mb-6 flex items-center">
              <Truck className="w-5 h-5 mr-2 text-[#C6A16B]" /> Shipping & Contact Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#332522] uppercase tracking-wider mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-[#FFF9F5] text-[#332522] text-sm px-3.5 py-2.5 rounded-lg border border-[#D9A6AB]/40 focus:outline-none focus:border-[#C6A16B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#332522] uppercase tracking-wider mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-[#FFF9F5] text-[#332522] text-sm px-3.5 py-2.5 rounded-lg border border-[#D9A6AB]/40 focus:outline-none focus:border-[#C6A16B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#332522] uppercase tracking-wider mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FFF9F5] text-[#332522] text-sm px-3.5 py-2.5 rounded-lg border border-[#D9A6AB]/40 focus:outline-none focus:border-[#C6A16B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#332522] uppercase tracking-wider mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#FFF9F5] text-[#332522] text-sm px-3.5 py-2.5 rounded-lg border border-[#D9A6AB]/40 focus:outline-none focus:border-[#C6A16B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#332522] uppercase tracking-wider mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#FFF9F5] text-[#332522] text-sm px-3.5 py-2.5 rounded-lg border border-[#D9A6AB]/40 focus:outline-none focus:border-[#C6A16B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#332522] uppercase tracking-wider mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-[#FFF9F5] text-[#332522] text-sm px-3.5 py-2.5 rounded-lg border border-[#D9A6AB]/40 focus:outline-none focus:border-[#C6A16B]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#D9A6AB]/30">
                <h3 className="text-lg font-bold font-serif text-[#332522] mb-3 flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-[#C6A16B]" /> Payment Option
                </h3>
                <div className="p-4 bg-[#FFF9F5] rounded-xl border border-[#D9A6AB]/40 space-y-2">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      defaultChecked
                      className="accent-[#C6A16B]"
                    />
                    <span className="text-sm font-semibold text-[#332522]">Credit or Debit Card</span>
                  </label>
                  <p className="text-xs text-[#332522]/60 pl-6">Secure end-to-end encrypted checkout.</p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-[#E8BFC3] text-[#332522] py-4 rounded-xl font-bold hover:bg-[#D9A6AB] transition-colors shadow-xs"
              >
                Complete Order (${total.toFixed(2)})
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#D9A6AB]/30 shadow-xs h-fit space-y-6">
            <h2 className="text-xl font-bold font-serif text-[#332522]">Summary</h2>
            <div className="divide-y divide-[#D9A6AB]/20 max-h-72 overflow-y-auto pr-1">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="py-3 flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-3">
                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded object-cover" />
                    <div>
                      <p className="font-bold text-[#332522] line-clamp-1">{product.name}</p>
                      <p className="text-xs text-[#332522]/60">Qty: {quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-[#332522]">${(product.price * quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#D9A6AB]/30 pt-4 space-y-2 text-sm text-[#332522]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? <strong className="text-[#C6A16B]">FREE</strong> : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-[#D9A6AB]/30 pt-3 flex justify-between font-bold text-base text-[#332522]">
                <span>Total Due</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="p-3.5 bg-[#FFF9F5] rounded-xl border border-[#D9A6AB]/20 flex items-center text-xs text-[#332522]/80 space-x-2">
              <ShieldCheck className="w-5 h-5 text-[#C6A16B] shrink-0" />
              <span>Backed by Velqira's 30-Day Money-Back & Quality Guarantee.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
