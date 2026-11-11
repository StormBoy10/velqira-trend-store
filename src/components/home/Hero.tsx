import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[580px] sm:min-h-[660px] overflow-hidden text-[#332522] border-b border-[#C6A16B]/30 flex items-center justify-center">

      {/* VELQIRA CHAMPAGNE SILK BACKGROUND WITH BALANCED BLUR EFFECT */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Silk Texture Image with Subtle Scale and Balanced Soft Blur */}
        <img
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1600&auto=format&fit=crop&q=85"
          alt="VELQIRA Silk Signature Background"
          className="w-full h-full object-cover object-center transform scale-105 filter blur-[2px] opacity-90 transition-transform duration-10000 ease-out"
        />

        {/* Balanced Soft Warm Gradient Overlay for Readable Typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF9F5]/92 via-[#FFF9F5]/80 to-[#FFF9F5]/45 backdrop-blur-[1px]" />
      </div>

      {/* FRONT TEXT CONTENT (Positioned directly in front of the blurred champagne silk background) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-center items-start py-16">
        <div className="max-w-2xl">

          {/* Badge */}
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#C6A16B] bg-[#E8BFC3]/40 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-[#C6A16B]/40 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A16B]" />
            <span>Curated Luxe Essentials 2025</span>
          </div>

          {/* Exact Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold font-serif tracking-tight text-[#332522] leading-[1.12]">
            Artisanal Grace. <br />
            <span className="italic font-normal text-[#C6A16B]">Modern Elegance.</span>
          </h1>

          {/* Exact Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-[#332522]/85 leading-relaxed font-normal">
            Discover handpicked collections designed for refined living. Blending soft aesthetics, natural tones, and timeless quality.
          </p>

          {/* Action Buttons */}
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
