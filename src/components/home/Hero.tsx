import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-[#FFF9F5] text-[#332522] overflow-hidden py-20 sm:py-32 border-b border-[#D9A6AB]/30">
      {/* Background Animated Gradient Blurs */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-10 right-10 w-96 h-96 bg-[#E8BFC3] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#C6A16B] rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Copy Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#C6A16B] bg-[#E8BFC3]/30 px-3.5 py-1.5 rounded-full mb-6 border border-[#C6A16B]/30 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A16B]" />
            <span>Curated Luxe Essentials 2025</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold font-serif tracking-tight text-[#332522] leading-[1.15]">
            Artisanal Grace. <br />
            <span className="italic font-normal text-[#C6A16B]">Modern Elegance.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-[#332522]/80 leading-relaxed max-w-xl">
            Discover handpicked collections designed for refined living. Blending soft aesthetics, natural tones, and timeless quality.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-[#332522] bg-[#E8BFC3] hover:bg-[#D9A6AB] transition-all shadow-sm hover:shadow-md"
            >
              Explore Collection
              <ArrowRight className="ml-2 w-5 h-5 text-[#332522]" />
            </Link>
            <Link
              to="/shop?category=all"
              className="inline-flex items-center justify-center px-8 py-4 border border-[#D9A6AB]/60 text-base font-bold rounded-xl text-[#332522] bg-white/70 hover:bg-white transition-all shadow-xs"
            >
              Browse Categories
            </Link>
          </div>

          {/* Highlights summary */}
          <div className="mt-12 pt-8 border-t border-[#D9A6AB]/30 grid grid-cols-3 gap-6 w-full max-w-md">
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
        </motion.div>

        {/* Right Hero Image Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80"
              alt="Velqira Hero Collection"
              className="w-full h-[450px] sm:h-[520px] object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#332522]/60 via-transparent to-transparent" />

            {/* Floating Tag */}
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-[#D9A6AB]/40 shadow-lg">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C6A16B]">Featured Choice</span>
              <p className="text-base font-bold font-serif text-[#332522]">Velqira Pro & Natural Living Line</p>
              <p className="text-xs text-[#332522]/70 mt-0.5">Explore sustainable craftsmanship for everyday comfort.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
