import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ cartCount = 0 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'Trending', path: '/shop?filter=trending' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FFF9F5]/95 backdrop-blur-md border-b border-[#D9A6AB]/30 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Mobile menu trigger */}
        <div className="flex items-center sm:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#332522] hover:text-[#C6A16B] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Brand Logo */}
        <Link to="/" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#332522] font-serif flex items-center gap-1.5">
          <span className="text-[#C6A16B] text-xl">✦</span> VELQIRA
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden sm:flex space-x-8 text-sm font-semibold text-[#332522]">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`transition-colors hover:text-[#C6A16B] relative py-1 ${
                  isActive ? 'text-[#C6A16B] font-bold' : ''
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C6A16B] rounded-full"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <Link to="/shop" className="p-2 text-[#332522] hover:text-[#C6A16B] transition-colors" aria-label="Search">
            <Search className="w-5 h-5" />
          </Link>
          <Link to="/admin" className="p-2 text-[#332522] hover:text-[#C6A16B] transition-colors" aria-label="Account">
            <User className="w-5 h-5" />
          </Link>
          <Link
            to="/cart"
            className="p-2 text-[#332522] hover:text-[#C6A16B] transition-colors relative"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#E8BFC3] text-[#332522] text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold border border-[#D9A6AB] shadow-xs">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#FFF9F5] border-b border-[#D9A6AB]/30 px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#332522] hover:text-[#C6A16B] py-2 border-b border-[#D9A6AB]/10"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
