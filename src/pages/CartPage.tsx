import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import type { CartItem } from '../types';

interface CartPageProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ cart, onUpdateQuantity, onRemoveItem }) => {
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="bg-[#FFF9F5] min-h-screen py-24 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto text-[#D9A6AB] mb-4" />
        <h2 className="text-2xl font-bold text-[#332522] font-serif">Your Cart is Empty</h2>
        <p className="text-[#332522]/70 mt-2">Looks like you haven't added anything to your cart yet.</p>
        <Link
          to="/shop"
          className="mt-6 inline-block bg-[#E8BFC3] text-[#332522] px-6 py-3 rounded-xl font-bold hover:bg-[#D9A6AB] transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF9F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold font-serif text-[#332522] mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 divide-y divide-[#D9A6AB]/30 bg-white p-6 rounded-2xl border border-[#D9A6AB]/30 shadow-xs">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="py-6 flex space-x-4 items-center first:pt-0 last:pb-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg bg-[#FFF9F5] border border-[#D9A6AB]/20"
                />
                <div className="flex-1">
                  <h3 className="font-semibold font-serif text-[#332522]">{product.name}</h3>
                  <p className="text-sm text-[#332522]/70">₹{product.price.toFixed(2)}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      onClick={() => onUpdateQuantity(product.id, -1)}
                      className="w-7 h-7 border rounded-md border-[#D9A6AB]/50 text-[#332522] flex items-center justify-center hover:bg-[#FFF9F5] transition-colors font-bold"
                    >
                      -
                    </button>
                    <span className="text-sm font-semibold text-[#332522] px-1">{quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(product.id, 1)}
                      className="w-7 h-7 border rounded-md border-[#D9A6AB]/50 text-[#332522] flex items-center justify-center hover:bg-[#FFF9F5] transition-colors font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#332522]">₹{(product.price * quantity).toFixed(2)}</p>
                  <button
                    onClick={() => onRemoveItem(product.id)}
                    className="text-red-500 hover:text-red-700 mt-2 text-xs flex items-center ml-auto font-medium"
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-2xl border border-[#D9A6AB]/30 shadow-xs h-fit">
            <h2 className="text-lg font-bold text-[#332522] mb-4 font-serif">Order Summary</h2>
            <div className="flex justify-between py-2 text-sm text-[#332522]/80">
              <span>Subtotal</span>
              <span className="font-semibold text-[#332522]">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 text-sm text-[#332522]/80">
              <span>Shipping</span>
              <span className="font-semibold text-[#C6A16B]">Calculated at checkout</span>
            </div>
            <div className="border-t border-[#D9A6AB]/30 mt-4 pt-4 flex justify-between font-bold text-[#332522]">
              <span>Total</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              className="w-full mt-6 bg-[#E8BFC3] text-[#332522] py-3.5 rounded-xl font-bold hover:bg-[#D9A6AB] transition-colors shadow-xs inline-block text-center"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
