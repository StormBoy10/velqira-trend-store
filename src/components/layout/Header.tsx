import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  Search,
  User,
  Menu,
  X,
  ArrowRight,
} from 'lucide-react';

interface HeaderProps {
  cartCount?: number;
  onOpenCart?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount = 0,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All', path: '/shop' },
    { name: 'Collections', path: '/categories' },
    { name: 'Trending', path: '/trending' },
    { name: 'Our Story', path: '/about' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F7F4EE]/95 backdrop-blur-md border-b border-[#E4DED3]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="h-[76px] lg:h-[88px] flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#38352F] hover:text-[#A18B70] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X size={22} strokeWidth={1.5} />
            ) : (
              <Menu size={22} strokeWidth={1.5} />
            )}
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="flex flex-col items-center lg:items-start min-w-0 group"
          >
            <span className="font-serif text-[26px] sm:text-[32px] tracking-[0.14em] text-[#38352F] leading-none transition-colors group-hover:text-[#A18B70]">
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
                  className={`relative py-2 text-[11px] uppercase tracking-[0.14em] font-medium transition-colors duration-300 ${
                    active
                      ? 'text-[#A18B70]'
                      : 'text-[#504B42] hover:text-[#A18B70]'
                  }`}
                >
                  {link.name}
                  {active && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 w-full h-px bg-[#A18B70]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Quick Search Toggle */}
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#38352F] hover:text-[#A18B70] transition-colors"
              aria-label="Search collection"
              title="Search"
            >
              {searchOpen ? <X size={19} strokeWidth={1.5} /> : <Search size={19} strokeWidth={1.5} />}
            </button>

            {/* Admin Atelier Portal Link */}
            <Link
              to="/admin"
              className="hidden sm:block p-2 text-[#38352F] hover:text-[#A18B70] transition-colors"
              aria-label="Atelier Portal"
              title="Atelier Portal"
            >
              <User size={19} strokeWidth={1.5} />
            </Link>

            {/* Shopping Bag Button */}
            <button
              type="button"
              onClick={onOpenCart ? onOpenCart : () => navigate('/cart')}
              className="relative p-2 text-[#38352F] hover:text-[#A18B70] transition-colors"
              aria-label={`Shopping bag, ${cartCount} items`}
              title="Shopping Bag"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />

              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#A18B70] text-white text-[9px] font-semibold"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-[#E4DED3] bg-[#EEE9DF]"
          >
            <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-4">
              <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto flex items-center">
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dresses, gold necklaces, ceramic vases, decor..."
                  className="w-full bg-[#F7F4EE] border border-[#D8D0C3] text-xs sm:text-sm pl-4 pr-12 py-3 text-[#38352F] placeholder-[#8A806F] focus:outline-none focus:border-[#A18B70]"
                />
                <button
                  type="submit"
                  className="absolute right-2 p-2 text-[#38352F] hover:text-[#A18B70]"
                  aria-label="Submit search"
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden border-t border-[#E4DED3] bg-[#F7F4EE]"
          >
            <nav className="px-6 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 border-b border-[#E4DED3]/60 text-xs uppercase tracking-[0.18em] text-[#38352F] hover:text-[#A18B70] font-medium"
                >
                  {link.name}
                </Link>
              ))}

              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-xs uppercase tracking-[0.18em] text-[#927B60] hover:text-[#38352F] font-semibold"
              >
                Atelier Admin Portal
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
