import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Globe, Share2, Heart, Shield, RefreshCw, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#38352F] text-[#F7F4EE] pt-16 pb-10 border-t border-[#A18B70]/30 relative">
      <div className="boho-container">
        {/* Brand Value Pillars Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-12 mb-12 border-b border-[#F7F4EE]/10 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <Sparkles className="w-5 h-5 text-[#A18B70] shrink-0" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F7F4EE]">Curated Artisanship</p>
              <p className="text-[11px] text-[#F7F4EE]/65">Hand-audited quality across 5 categories</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <RefreshCw className="w-5 h-5 text-[#A18B70] shrink-0" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F7F4EE]">Complimentary Delivery</p>
              <p className="text-[11px] text-[#F7F4EE]/65">Orders over ₹499 qualify for express shipping</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <Shield className="w-5 h-5 text-[#A18B70] shrink-0" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F7F4EE]">Effortless Returns</p>
              <p className="text-[11px] text-[#F7F4EE]/65">30-day seamless guarantee & full concierge support</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#F7F4EE]/10">
          {/* Brand Info */}
          <div className="md:col-span-4">
            <Link to="/" className="inline-block mb-4">
              <span className="font-serif text-2xl tracking-[0.14em] text-[#F7F4EE] block leading-none">
                VELQIRA
              </span>
              <span className="text-[8px] uppercase tracking-[0.32em] text-[#A18B70] mt-1.5 block">
                Artisanal Grace · Modern Elegance
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-[#F7F4EE]/75 leading-relaxed max-w-sm mt-3 font-light">
              Curated luxury essentials designed for mindful everyday living. Embracing warmth, craftsmanship, and timeless elegance.
            </p>

            <div className="flex space-x-3 mt-6">
              <span className="w-8 h-8 rounded-full bg-[#F7F4EE]/10 flex items-center justify-center text-[#A18B70] hover:bg-[#A18B70] hover:text-[#38352F] transition-colors cursor-pointer">
                <Globe className="w-3.5 h-3.5" />
              </span>
              <span className="w-8 h-8 rounded-full bg-[#F7F4EE]/10 flex items-center justify-center text-[#A18B70] hover:bg-[#A18B70] hover:text-[#38352F] transition-colors cursor-pointer">
                <Share2 className="w-3.5 h-3.5" />
              </span>
              <span className="w-8 h-8 rounded-full bg-[#F7F4EE]/10 flex items-center justify-center text-[#A18B70] hover:bg-[#A18B70] hover:text-[#38352F] transition-colors cursor-pointer">
                <Heart className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-semibold text-[#A18B70] uppercase tracking-[0.2em] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F7F4EE]/75">
              <li><Link to="/" className="hover:text-[#A18B70] transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-[#A18B70] transition-colors">Shop All</Link></li>
              <li><Link to="/categories" className="hover:text-[#A18B70] transition-colors">Collections</Link></li>
              <li><Link to="/trending" className="hover:text-[#A18B70] transition-colors">The Trending Edit</Link></li>
              <li><Link to="/about" className="hover:text-[#A18B70] transition-colors">Our Story</Link></li>
              <li><Link to="/admin" className="text-[#A18B70]/80 hover:text-[#A18B70] transition-colors font-medium">Atelier Portal</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-semibold text-[#A18B70] uppercase tracking-[0.2em] mb-4">
              Departments
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F7F4EE]/75">
              <li><Link to="/shop?category=dresses-fashion" className="hover:text-[#A18B70] transition-colors">Dresses & Fashion</Link></li>
              <li><Link to="/shop?category=jewellery-accessories" className="hover:text-[#A18B70] transition-colors">Jewellery & Accessories</Link></li>
              <li><Link to="/shop?category=home-decor" className="hover:text-[#A18B70] transition-colors">Home Decor</Link></li>
              <li><Link to="/shop?category=art-crafts" className="hover:text-[#A18B70] transition-colors">Art & Crafts</Link></li>
              <li><Link to="/shop?category=korean-goodies" className="hover:text-[#A18B70] transition-colors">Korean Goodies</Link></li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-semibold text-[#A18B70] uppercase tracking-[0.2em] mb-4">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F7F4EE]/75">
              <li><span className="hover:text-[#A18B70] transition-colors cursor-pointer">Shipping & Global Freight</span></li>
              <li><span className="hover:text-[#A18B70] transition-colors cursor-pointer">Returns & Exchanges Policy</span></li>
              <li><span className="hover:text-[#A18B70] transition-colors cursor-pointer">Order Dossier & Tracking</span></li>
              <li><span className="hover:text-[#A18B70] transition-colors cursor-pointer">Client Concierge & FAQ</span></li>
              <li><span className="hover:text-[#A18B70] transition-colors cursor-pointer">Sustainability Statement</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#F7F4EE]/60 gap-4">
          <p>&copy; {new Date().getFullYear()} VELQIRA MAISON. All rights reserved. Thoughtfully crafted.</p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-[#A18B70] hover:text-[#F7F4EE] transition-colors uppercase tracking-[0.15em] text-[10px] font-semibold"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
