import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Search,
  User,
  Menu,
  X,
} from 'lucide-react';

interface HeaderProps {
  cartCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All', path: '/shop' },
    { name: 'Collections', path: '/categories' },
    { name: 'Trending', path: '/trending' },
    { name: 'Our Story', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F7F4EE]/95 backdrop-blur-md border-b border-[#E4DED3]">

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">

        <div className="h-[76px] lg:h-[88px] flex items-center justify-between">

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#38352F]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen
              ? <X size={22} strokeWidth={1.5} />
              : <Menu size={22} strokeWidth={1.5} />
            }
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="flex flex-col items-center lg:items-start min-w-0"
          >
            <span className="font-serif text-[27px] sm:text-[32px] tracking-[0.12em] text-[#38352F] leading-none">
              VELQIRA
            </span>

            <span className="hidden sm:block text-[8px] tracking-[0.32em] uppercase text-[#8A806F] mt-2">
              Artisanal Grace · Modern Elegance
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative py-2 text-[11px] uppercase tracking-[0.13em] transition-colors duration-300 ${
                    active
                      ? 'text-[#A18B70]'
                      : 'text-[#504B42] hover:text-[#A18B70]'
                  }`}
                >
                  {link.name}

                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-px bg-[#A18B70]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-2 sm:gap-5">

            <Link
              to="/shop"
              className="p-2 text-[#38352F] hover:text-[#A18B70]"
              aria-label="Search products"
            >
              <Search size={19} strokeWidth={1.5} />
            </Link>

            <Link
              to="/admin"
              className="hidden sm:block p-2 text-[#38352F] hover:text-[#A18B70]"
              aria-label="Admin account"
            >
              <User size={19} strokeWidth={1.5} />
            </Link>

            <Link
              to="/cart"
              className="relative p-2 text-[#38352F] hover:text-[#A18B70]"
              aria-label={`Shopping bag, ${cartCount} items`}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />

              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[17px] h-[17px] px-1 rounded-full bg-[#A18B70] text-white text-[9px]">
                  {cartCount}
                </span>
              )}
            </Link>

          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen
            ? 'max-h-[400px] border-t border-[#E4DED3]'
            : 'max-h-0'
        }`}
      >
        <nav className="px-6 py-4 bg-[#F7F4EE]">

          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-4 border-b border-[#E4DED3] text-[11px] uppercase tracking-[0.16em] text-[#38352F] hover:text-[#A18B70]"
            >
              {link.name}
            </Link>
          ))}

        </nav>
      </div>

    </header>
  );
};
