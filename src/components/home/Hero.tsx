import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full aspect-[21/9] min-h-[520px] max-h-[660px] overflow-hidden text-[#332522] border-b border-[#C6A16B]/30 group flex items-center">

      {/* VELQIRA CHAMPAGNE GOLD SILK SATIN BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=2000&auto=format&fit=crop&q=90"
          alt="VELQIRA Silk Signature Background"
          className="w-full h-full object-cover object-center transform scale-100 hover:scale-105 transition-transform duration-10000 ease-out"
        />
        {/* Soft Warm Editorial Cream Overlay for crystal clear text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF9F5]/90 via-[#FFF9F5]/75 to-transparent" />
      </div>

      {/* FRONT TEXT CONTENT (Positioned in front of the champagne silk background) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-center items-start py-12">
        <div className="max-w-2xl">

          {/* Badge */}
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#C6A16B] bg-[#E8BFC3]/40 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-[#C6A16B]/40 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A16B]" />
            <span>Curated Luxe Essentials 2025</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold font-serif tracking-tight text-[#332522] leading-[1.12]">
            Artisanal Grace. <br />
            <span className="italic font-normal text-[#C6A16B]">Modern Elegance.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-[#332522]/85 leading-relaxed font-normal">
            Discover handpicked collections designed for refined living. Blending soft aesthetics, natural tones, and timeless quality.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-[#332522] bg-[#E8BFC3] hover:bg-[#D9A6AB] transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              Explore Collection
              <ArrowRight className="ml-2 w-5 h-5 text-[#332522]" />
            </Link>
            <Link
              to="/categories"
              className="inline-flex items-center justify-center px-8 py-4 border border-[#C6A16B]/40 text-base font-bold rounded-xl text-[#332522] bg-white/80 backdrop-blur-md hover:bg-white transition-all shadow-xs cursor-pointer"
            >
              Browse Categories
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="mt-12 pt-8 border-t border-[#C6A16B]/30 grid grid-cols-3 gap-6 max-w-md">
            <div>
              <p className="text-2xl font-bold font-serif text-[#332522]">100%</p>
              <p className="text-xs text-[#332522]/70 font-medium">Authentic Quality</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-serif text-[#332522]">4.9★</p>
              <p className="text-xs text-[#332522]/70 font-medium">Customer Satisfaction</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-serif text-[#332522]">Global</p>
              <p className="text-xs text-[#332522]/70 font-medium">Express Shipping</p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
