import React from 'react';
import { Sparkles, Heart, Globe, ArrowRight, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#F7F4EE] py-12 sm:py-16 lg:py-20">
      <div className="boho-container">
        {/* Editorial Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <span className="text-[11px] uppercase tracking-[0.28em] text-[#927B60] font-medium block mb-3">
            Our Story & Craftsmanship
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#38352F] leading-tight">
            Artisanal Grace. <br />
            <span className="italic">Quiet Luxury.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#777064] mt-6 leading-relaxed max-w-xl mx-auto font-light">
            Founded on the philosophy of warm minimalism, Velqira brings together thoughtfully designed objects, apparel, and lifestyle treasures that celebrate timeless character.
          </p>
        </div>

        {/* Feature Narrative & Studio Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-20 lg:mb-28 border border-[#E4DED3] bg-[#EEE9DF] p-6 sm:p-12 lg:p-16">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#927B60] font-semibold">
              The Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#38352F] font-normal leading-snug">
              Every piece carries an authentic artisan footprint.
            </h2>
            <p className="text-sm text-[#777064] leading-relaxed">
              In an era of fleeting fast-fashion cycles, Velqira was established as an antidote: a slower, more deliberate sanctuary for objects that endure. We curate across five distinctive worlds — Dresses & Fashion, Jewellery & Accessories, Home Decor, Art & Crafts, and Korean Goodies.
            </p>
            <p className="text-sm text-[#777064] leading-relaxed">
              Each piece is assessed for texture, hand-feel, structural integrity, and sustainable sourcing before finding its place in our seasonal edits.
            </p>

            <div className="pt-4 border-t border-[#DED6C9]">
              <blockquote className="font-serif italic text-base sm:text-lg text-[#38352F]">
                "True elegance does not demand attention; it commands presence through simplicity."
              </blockquote>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#E8E1D5] border border-[#D8D0C3]">
              <img
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1000&auto=format&fit=crop&q=85"
                alt="Velqira Atelier and Artisan Studio"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Four Core Pillars */}
        <div className="mb-20 lg:mb-28">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#927B60] font-medium block mb-2">
              Our Commitments
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#38352F]">
              The Four Velqira Pillars
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-[#E4DED3] p-8 text-center transition-transform hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-[#F7F4EE] border border-[#DED6C9] flex items-center justify-center mx-auto mb-5 text-[#A18B70]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-normal text-[#38352F] mb-2">Ethical Studios</h4>
              <p className="text-xs text-[#777064] leading-relaxed">
                Partnering exclusively with family ateliers and certified workshops committed to fair living wages.
              </p>
            </div>

            <div className="bg-white border border-[#E4DED3] p-8 text-center transition-transform hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-[#F7F4EE] border border-[#DED6C9] flex items-center justify-center mx-auto mb-5 text-[#A18B70]">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-normal text-[#38352F] mb-2">Guaranteed Quality</h4>
              <p className="text-xs text-[#777064] leading-relaxed">
                Every gemstone, silk weave, and ceramic glaze undergoes meticulous multi-point quality audits.
              </p>
            </div>

            <div className="bg-white border border-[#E4DED3] p-8 text-center transition-transform hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-[#F7F4EE] border border-[#DED6C9] flex items-center justify-center mx-auto mb-5 text-[#A18B70]">
                <Globe className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-normal text-[#38352F] mb-2">Eco Packaging</h4>
              <p className="text-xs text-[#777064] leading-relaxed">
                100% plastic-free, recyclable gift-grade packaging crafted from sustainably managed FSC forests.
              </p>
            </div>

            <div className="bg-white border border-[#E4DED3] p-8 text-center transition-transform hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-[#F7F4EE] border border-[#DED6C9] flex items-center justify-center mx-auto mb-5 text-[#A18B70]">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-normal text-[#38352F] mb-2">Customer Care</h4>
              <p className="text-xs text-[#777064] leading-relaxed">
                Effortless 30-day returns and bespoke concierge support for a reassuring shopping experience.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Banner Invitation */}
        <div className="border border-[#E4DED3] bg-[#38352F] text-[#F7F4EE] p-10 sm:p-16 text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#A18B70] font-medium block mb-3">
            Invitation
          </span>
          <h3 className="font-serif text-3xl sm:text-5xl font-normal leading-tight mb-6">
            Experience the Collection Firsthand
          </h3>
          <p className="text-sm text-[#F7F4EE]/80 max-w-md mx-auto mb-8 font-light">
            Discover artisanal treasures created to bring effortless warmth and aesthetic harmony into your everyday.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#F7F4EE] text-[#38352F] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#A18B70] hover:text-white transition-colors"
          >
            <span>Explore The Store</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
};
