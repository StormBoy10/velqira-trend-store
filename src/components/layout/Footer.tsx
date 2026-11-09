import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Globe, Share2, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#332522] text-[#FFF9F5] pt-16 pb-8 border-t border-[#C6A16B]/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#C6A16B]/20">

          {/* Brand Info */}
          <div className="md:col-span-4">
            <Link to="/" className="text-2xl font-bold font-serif text-[#FFF9F5] flex items-center gap-1.5 mb-4">
              <span className="text-[#C6A16B]">✦</span> VELQIRA
            </Link>
            <p className="text-sm text-[#FFF9F5]/80 leading-relaxed max-w-sm">
              Curated luxury essentials designed for modern living. Embracing warmth, craftsmanship, and timeless elegance.
            </p>

            <div className="flex space-x-3 mt-6">
              <a href="#" className="w-9 h-9 rounded-full bg-[#FFF9F5]/10 flex items-center justify-center text-[#C6A16B] hover:bg-[#E8BFC3] hover:text-[#332522] transition-colors" aria-label="Global">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#FFF9F5]/10 flex items-center justify-center text-[#C6A16B] hover:bg-[#E8BFC3] hover:text-[#332522] transition-colors" aria-label="Share">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#FFF9F5]/10 flex items-center justify-center text-[#C6A16B] hover:bg-[#E8BFC3] hover:text-[#332522] transition-colors" aria-label="Favorites">
                <Heart className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold text-[#C6A16B] uppercase tracking-widest mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm text-[#FFF9F5]/80 font-medium">
              <li><Link to="/" className="hover:text-[#E8BFC3] transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-[#E8BFC3] transition-colors">Shop All</Link></li>
              <li><Link to="/shop?filter=trending" className="hover:text-[#E8BFC3] transition-colors">Trending</Link></li>
              <li><Link to="/shop?filter=new" className="hover:text-[#E8BFC3] transition-colors">New Arrivals</Link></li>
              <li><Link to="/about" className="hover:text-[#E8BFC3] transition-colors">About Us</Link></li>
              <li><Link to="/admin" className="hover:text-[#E8BFC3] transition-colors font-bold text-[#C6A16B]">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold text-[#C6A16B] uppercase tracking-widest mb-4">Categories</h4>
            <ul className="space-y-2.5 text-sm text-[#FFF9F5]/80 font-medium">
              <li><Link to="/shop?category=dresses-fashion" className="hover:text-[#E8BFC3] transition-colors">Dresses & Fashion</Link></li>
              <li><Link to="/shop?category=jewellery-accessories" className="hover:text-[#E8BFC3] transition-colors">Jewellery & Accessories</Link></li>
              <li><Link to="/shop?category=home-decor" className="hover:text-[#E8BFC3] transition-colors">Home Decor</Link></li>
              <li><Link to="/shop?category=art-crafts" className="hover:text-[#E8BFC3] transition-colors">Art & Crafts</Link></li>
              <li><Link to="/shop?category=korean-goodies" className="hover:text-[#E8BFC3] transition-colors">Korean Goodies</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold text-[#C6A16B] uppercase tracking-widest mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-sm text-[#FFF9F5]/80 font-medium">
              <li><a href="#" className="hover:text-[#E8BFC3] transition-colors">Shipping & Global Delivery</a></li>
              <li><a href="#" className="hover:text-[#E8BFC3] transition-colors">Returns & Exchange Policy</a></li>
              <li><a href="#" className="hover:text-[#E8BFC3] transition-colors">Order Tracking</a></li>
              <li><a href="#" className="hover:text-[#E8BFC3] transition-colors">FAQ & Support</a></li>
              <li><a href="#" className="hover:text-[#E8BFC3] transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FFF9F5]/60 gap-4">
          <p>&copy; {new Date().getFullYear()} Velqira Store. All rights reserved. Crafting warm minimalist experiences.</p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center space-x-1 text-[#C6A16B] hover:text-[#FFF9F5] transition-colors font-semibold"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
