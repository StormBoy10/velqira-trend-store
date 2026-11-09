import React from 'react';
import { Sparkles, Heart, Globe, Shield } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#FFF9F5] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C6A16B] bg-[#E8BFC3]/30 px-3.5 py-1.5 rounded-full border border-[#C6A16B]/30">
            Our Story & Craft
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif text-[#332522] mt-4">
            About Velqira
          </h1>
          <p className="text-base sm:text-lg text-[#332522]/80 mt-3 leading-relaxed">
            Curating quiet luxury, modern aesthetics, and daily joy across our five signature collections.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white p-8 sm:p-12 rounded-3xl border border-[#D9A6AB]/30 shadow-xs mb-16">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#332522]">
              Warm Minimalism meets Quality Craftsmanship
            </h2>
            <p className="text-sm text-[#332522]/80 mt-4 leading-relaxed">
              Founded with a passion for intentional living, Velqira brings together hand-selected products from five core worlds: Dresses & Fashion, Jewellery & Accessories, Home Decor, Art & Crafts, and Korean Goodies.
            </p>
            <p className="text-sm text-[#332522]/80 mt-3 leading-relaxed">
              We carefully audit every artisan and supplier to ensure each piece brings warmth, utility, and timeless beauty into your everyday routine.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-[#D9A6AB]/30">
            <img
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80"
              alt="Velqira Studio"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>

        {/* 4 Key Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#D9A6AB]/30 shadow-xs text-center">
            <Sparkles className="w-8 h-8 text-[#C6A16B] mx-auto mb-3" />
            <h3 className="font-bold font-serif text-lg text-[#332522]">Ethical Sourcing</h3>
            <p className="text-xs text-[#332522]/70 mt-2">Partnering only with responsible artisan studios and ethical workshops.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#D9A6AB]/30 shadow-xs text-center">
            <Heart className="w-8 h-8 text-[#C6A16B] mx-auto mb-3" />
            <h3 className="font-bold font-serif text-lg text-[#332522]">Customer Devotion</h3>
            <p className="text-xs text-[#332522]/70 mt-2">Dedicated 24/7 care ensuring complete peace of mind with every order.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#D9A6AB]/30 shadow-xs text-center">
            <Globe className="w-8 h-8 text-[#C6A16B] mx-auto mb-3" />
            <h3 className="font-bold font-serif text-lg text-[#332522]">Global Delivery</h3>
            <p className="text-xs text-[#332522]/70 mt-2">Fast express worldwide shipping with eco-conscious plastic-free packaging.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#D9A6AB]/30 shadow-xs text-center">
            <Shield className="w-8 h-8 text-[#C6A16B] mx-auto mb-3" />
            <h3 className="font-bold font-serif text-lg text-[#332522]">Guaranteed Quality</h3>
            <p className="text-xs text-[#332522]/70 mt-2">30-day effortless returns if your item is anything short of perfect.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
