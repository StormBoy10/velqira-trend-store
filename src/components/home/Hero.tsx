import React from 'react';
import { Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[580px] sm:min-h-[680px] lg:min-h-[750px] overflow-hidden text-[#332522] border-b border-[#C6A16B]/30 flex items-center justify-center">

      {/* VELQIRA CHAMPAGNE SILK BACKGROUND WITH BALANCED BLUR EFFECT */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Silk Texture Image with Subtle Scale and Balanced Soft Blur */}
        <img
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1600&auto=format&fit=crop&q=85"
          alt="VELQIRA Silk Signature Background"
          className="w-full h-full object-cover object-center transform scale-105 filter blur-[2px] opacity-90 transition-transform duration-10000 ease-out"
        />

        {/* Balanced Soft Warm Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF9F5]/92 via-[#FFF9F5]/82 to-[#FFF9F5]/50 backdrop-blur-[1px]" />
      </div>

      {/* FRONT TEXT CONTENT - ENLARGED TYPOGRAPHY */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-center items-start py-20">
        <div className="max-w-4xl">

          {/* Enlarged Badge */}
          <div className="inline-flex items-center space-x-2 text-sm sm:text-base font-extrabold uppercase tracking-widest text-[#C6A16B] bg-[#E8BFC3]/40 backdrop-blur-md px-5 py-2 rounded-full mb-8 border border-[#C6A16B]/40 shadow-xs">
            <Sparkles className="w-4 h-4 text-[#C6A16B]" />
            <span>Curated Luxe Essentials 2025</span>
          </div>

          {/* Significantly Enlarged Title */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-serif tracking-tight text-[#332522] leading-[1.08]">
            Artisanal Grace. <br />
            <span className="italic font-normal text-[#C6A16B]">Modern Elegance.</span>
          </h1>

          {/* Enlarged Subtitle */}
          <p className="mt-8 text-xl sm:text-2xl lg:text-3xl text-[#332522]/85 leading-relaxed font-normal max-w-3xl font-serif">
            Discover handpicked collections designed for refined living. Blending soft aesthetics, natural tones, and timeless quality.
          </p>

        </div>
      </div>

    </section>
  );
};
