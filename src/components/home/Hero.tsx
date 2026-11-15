import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductQuickViewModal } from '../products/ProductQuickViewModal';
import { getProductById } from '../../services';
import type { Product } from '../../types';

interface HeroSlide {
  id: string;
  image: string;
  wideImage?: string;
  alt: string;
  isGraphicBanner?: boolean;
  bannerType?: 'silk-logo' | 'why-choose' | 'showcase-3' | 'showcase-4' | 'editorial';
  bgColor?: string;
  tag?: string;
  title?: React.ReactNode;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

interface HeroProps {
  onAddToCart?: (product: Product) => void;
}

const jewelleryShowcaseItems = [
  { id: 'jewel-1', image: '/images/jewellery-necklace-1.jpg', name: 'JSK Dainty Crystal Tulip Pendant Necklace', targetUrl: '/product/jewel-1', productId: 'jewel-1' },
  { id: 'jewel-2', image: '/images/jewellery-necklace-2.jpg', name: 'JSK Rainbow Gemstone Charm Necklace', targetUrl: '/product/jewel-2', productId: 'jewel-2' },
  { id: 'jewel-3', image: '/images/jewellery-necklace-3.jpg', name: 'JSK Five Gemstones Gold Silk Chain', targetUrl: '/product/jewel-3', productId: 'jewel-3' },
];

const stickerShowcaseItems = [
  { id: 'sticker-1', image: '/images/korean-sticker-1.jpg', name: 'Purple Heart Ribbons Deco Sheet', targetUrl: '/product/sticker-1', productId: 'sticker-1' },
  { id: 'sticker-2', image: '/images/korean-sticker-2.jpg', name: 'Holo Black Hearts Ribbon Sheet', targetUrl: '/product/sticker-2', productId: 'sticker-2' },
  { id: 'sticker-3', image: '/images/korean-sticker-3.jpg', name: 'Kuromi Portable Stationery Set', targetUrl: '/product/sticker-3', productId: 'sticker-3' },
  { id: 'sticker-4', image: '/images/korean-sticker-4.jpg', name: 'Lavender Butterflies Kawaii Sheet', targetUrl: '/product/sticker-4', productId: 'sticker-4' },
];

const slides: HeroSlide[] = [
  {
    id: 'velqira-satin-brand',
    image: '/images/velqira-silk-banner.jpg',
    wideImage: '/images/velqira-satin-gold-logo.jpg',
    alt: 'VELQIRA — Artisanal Grace & Modern Elegance Satin Gold',
    isGraphicBanner: true,
    bannerType: 'silk-logo',
    bgColor: '#E2CDB0',
    tag: 'THE ATELIER HOUSE — 2026',
    subtitle: 'Artisanal Grace · Modern Elegance · Intentional Living',
    ctaText: 'Discover The Collection',
    ctaLink: '/shop',
  },
  {
    id: 'why-choose-velqira',
    image: '/images/why-choose-velqira.jpg',
    wideImage: '/images/hero-slide-1-wide.jpg',
    alt: 'Why Choose Velqira - Handpicked with Love',
    isGraphicBanner: true,
    bannerType: 'why-choose',
    bgColor: '#F7E5D7',
    ctaText: 'Explore Handpicked Collections',
    ctaLink: '/shop',
  },
  {
    id: 'artisanal-grace',
    image: '/images/hero-slide-3-showcase.jpg',
    alt: 'Velqira Jewellery 3-Piece Atelier Showcase',
    bannerType: 'showcase-3',
    bgColor: '#171413',
    tag: 'THE VELQIRA COLLECTION — 2026',
    title: (
      <>
        Artisanal
        <br />
        <span className="italic">Grace.</span>
        <br />
        Modern Elegance.
      </>
    ),
    subtitle: 'Discover thoughtfully curated pieces inspired by natural beauty, timeless design and effortless style.',
    ctaText: 'Discover The Collection',
    ctaLink: '/shop',
  },
  {
    id: 'quiet-luxury',
    image: '/images/hero-slide-4-showcase.jpg',
    alt: 'Velqira 4-Item Atelier Showcase',
    bannerType: 'showcase-4',
    bgColor: '#181514',
    tag: 'SIGNATURE ATELIER PIECES',
    title: (
      <>
        Quiet Luxury.
        <br />
        <span className="italic">Effortless</span>
        <br />
        Modern Style.
      </>
    ),
    subtitle: 'Handcrafted gold jewellery, heirloom accessories, and conscious artisanal accents.',
    ctaText: 'Explore Jewellery & Accessories',
    ctaLink: '/shop?category=jewellery-accessories',
  },
  {
    id: 'intentional-living',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=2000&auto=format&fit=crop&q=85',
    alt: 'Velqira home decor and mindful living',
    tag: 'INTENTIONAL LIVING',
    title: (
      <>
        Warm Minimalism.
        <br />
        <span className="italic">Timeless</span>
        <br />
        Everyday Finds.
      </>
    ),
    subtitle: 'Curated home decor, ceramic forms, and joyful lifestyle treasures for your sanctuary.',
    ctaText: 'Explore Home & Decor',
    ctaLink: '/shop?category=home-decor',
  },
];

export const Hero: React.FC<HeroProps> = ({ onAddToCart }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedQuickProduct, setSelectedQuickProduct] = useState<Product | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (!selectedQuickProduct) {
        setActiveSlide((current) => (current + 1) % slides.length);
      }
    }, 6500);

    return () => window.clearInterval(interval);
  }, [selectedQuickProduct]);

  const current = slides[activeSlide];
  const isLightBanner = current.isGraphicBanner;
  const isShowcaseSlide = current.bannerType === 'showcase-3' || current.bannerType === 'showcase-4';

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handleOpenShowcaseProduct = async (
    productId: string,
    defaultName: string,
    image: string,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const fetched = await getProductById(productId);
    if (fetched) {
      setSelectedQuickProduct(fetched);
    } else {
      setSelectedQuickProduct({
        id: productId,
        name: defaultName,
        description: 'Delicate handcrafted boutique VELQIRA luxury collection piece.',
        price: 1499.0,
        originalPrice: 1899.0,
        category: 'jewellery-accessories',
        image: image,
        rating: 4.9,
        reviewsCount: 84,
        inStock: true,
      });
    }
  };

  return (
    <>
      {/* Quick View Purchase Pop-Up Modal */}
      <ProductQuickViewModal
        product={selectedQuickProduct}
        onClose={() => setSelectedQuickProduct(null)}
        onAddToCart={onAddToCart}
      />

      <section
        className="relative w-full min-h-[580px] h-[76vh] max-h-[820px] overflow-hidden transition-colors duration-700"
        style={{ backgroundColor: current.bgColor || '#2B2823' }}
      >
        {/* Background Slideshow */}
        <div className="absolute inset-0">
          <AnimatePresence mode="sync">
            <motion.div
              key={current.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full flex items-center justify-center"
            >
              {current.bannerType === 'silk-logo' ? (
                <Link
                  to={current.ctaLink || '/shop'}
                  className="relative w-full h-full block cursor-pointer group overflow-hidden"
                >
                  <picture className="w-full h-full block">
                    {current.wideImage && (
                      <source
                        media="(min-width: 768px)"
                        srcSet={current.wideImage}
                      />
                  )}
                    <motion.img
                      src={current.image}
                      alt={current.alt}
                      initial={{ scale: 1.03 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 6.5, ease: 'easeOut' }}
                      className="w-full h-full object-cover object-center"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </Link>
              ) : current.bannerType === 'why-choose' ? (
                <Link
                  to={current.ctaLink || '/shop'}
                  className="w-full h-full flex items-center justify-center p-4 sm:p-8 lg:p-12 cursor-pointer group"
                >
                  <picture className="w-full h-full flex items-center justify-center">
                    {current.wideImage && (
                      <source
                        media="(min-width: 1024px)"
                        srcSet={current.wideImage}
                      />
                    )}
                    <img
                      src={current.image}
                      alt={current.alt}
                      className="max-h-full max-w-full w-auto h-auto object-contain drop-shadow-sm transition-transform duration-700 group-hover:scale-[1.015]"
                    />
                  </picture>
                </Link>
              ) : isShowcaseSlide ? (
                <motion.img
                  src={current.image}
                  alt={current.alt}
                  initial={{ scale: 1.02 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 6.5, ease: 'linear' }}
                  className="absolute inset-0 w-full h-full object-cover object-right lg:object-center"
                />
              ) : (
                <motion.img
                  src={current.image}
                  alt={current.alt}
                  initial={{ scale: 1.04 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 6.5, ease: 'linear' }}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              )}
            </motion.div>
          </AnimatePresence>

          {isShowcaseSlide ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-[#141211]/95 via-[#141211]/70 to-transparent lg:w-[65%] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141211]/60 via-transparent to-[#141211]/30 pointer-events-none" />
            </>
          ) : !isLightBanner ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />
            </>
          ) : null}
        </div>

        {/* Hero Content Overlays */}
        {current.bannerType === 'silk-logo' ? (
          <div className="absolute bottom-10 sm:bottom-12 left-0 right-0 z-20 flex flex-col items-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#38352F] font-semibold mb-3 drop-shadow-xs">
                {current.subtitle}
              </p>
              <Link
                to={current.ctaLink || '/shop'}
                className="inline-flex items-center gap-4 px-8 sm:px-10 py-3.5 sm:py-4 bg-[#38352F] text-[#F7F4EE] text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold border border-[#38352F] shadow-xl hover:bg-transparent hover:text-[#38352F] transition-all duration-300 backdrop-blur-xs"
              >
                <span>{current.ctaText || 'Discover The Collection'}</span>
                <ArrowRight size={15} strokeWidth={1.5} />
              </Link>
            </motion.div>
          </div>
        ) : current.bannerType === 'why-choose' ? (
          <div className="absolute bottom-10 left-6 sm:left-12 lg:left-20 z-20">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Link
                to={current.ctaLink || '/shop'}
                className="inline-flex items-center gap-4 px-7 sm:px-9 py-3.5 sm:py-4 bg-[#38352F] text-[#F7F4EE] text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold border border-[#38352F] shadow-lg hover:bg-transparent hover:text-[#38352F] transition-all duration-300"
              >
                <span>{current.ctaText || 'Discover The Collection'}</span>
                <ArrowRight size={15} strokeWidth={1.5} />
              </Link>
            </motion.div>
          </div>
        ) : isShowcaseSlide ? (
          <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-20 h-full min-h-[580px] flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 w-full items-center">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="lg:col-span-6 xl:col-span-5 text-white py-12"
              >
                {current.tag && (
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.6 }}
                    className="text-[10px] sm:text-xs uppercase tracking-[0.35em] font-medium mb-6 text-[#D8CBB8]"
                  >
                    {current.tag}
                  </motion.p>
                )}

                <h1 className="font-serif text-[42px] sm:text-[60px] lg:text-[76px] leading-[1.06] font-normal tracking-[-0.04em]">
                  {current.title}
                </h1>

                {current.subtitle && (
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.6 }}
                    className="mt-6 max-w-[430px] text-sm sm:text-base leading-7 text-white/90 font-light"
                  >
                    {current.subtitle}
                  </motion.p>
                )}

                {current.ctaText && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mt-8"
                  >
                    <Link
                      to={current.ctaLink || '/shop'}
                      className="inline-flex items-center gap-4 px-8 py-4 bg-[#F7F4EE] text-[#38352F] text-[10px] sm:text-xs uppercase tracking-[0.18em] font-semibold border border-[#F7F4EE] hover:bg-transparent hover:text-white transition-all duration-300"
                    >
                      <span>{current.ctaText}</span>
                      <ArrowRight size={15} strokeWidth={1.5} />
                    </Link>
                  </motion.div>
                )}
              </motion.div>

              {/* Right Column: Multi-Item Interactive Showcase Pop-Up Trigger */}
              <div className="lg:col-span-6 xl:col-span-7 hidden lg:block z-30">
                {current.bannerType === 'showcase-3' ? (
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="grid grid-cols-3 gap-4 xl:gap-5 items-center"
                  >
                    {jewelleryShowcaseItems.map((item, idx) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={(e) => handleOpenShowcaseProduct(item.productId, item.name, item.image, e)}
                        className={`group relative block aspect-[3/4] bg-[#221E1C] border border-[#A18B70]/40 shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[#F7F4EE] cursor-pointer text-left w-full ${
                          idx === 1 ? 'translate-y-4' : '-translate-y-3'
                        }`}
                        title={`Quick View & Buy ${item.name}`}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5">
                          <span className="text-[10px] text-[#F7F4EE] font-serif font-bold tracking-wider uppercase leading-tight group-hover:text-[#D8CBB8]">
                            {item.name}
                          </span>
                          <span className="text-[8px] text-[#A18B70] uppercase font-bold tracking-widest mt-1 flex items-center gap-1">
                            <Eye size={10} /> Quick Purchase &rarr;
                          </span>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="grid grid-cols-4 gap-3.5 xl:gap-4 items-center"
                  >
                    {stickerShowcaseItems.map((item, idx) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={(e) => handleOpenShowcaseProduct(item.productId, item.name, item.image, e)}
                        className={`group relative block aspect-[3/4] bg-[#221E1C] border border-[#A18B70]/40 shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[#F7F4EE] cursor-pointer text-left w-full ${
                          idx % 2 === 1 ? 'translate-y-3' : '-translate-y-3'
                        }`}
                        title={`Quick View & Buy ${item.name}`}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5">
                          <span className="text-[9px] text-[#F7F4EE] font-serif font-bold tracking-wider uppercase leading-tight group-hover:text-[#D8CBB8]">
                            {item.name}
                          </span>
                          <span className="text-[8px] text-[#A18B70] uppercase font-bold tracking-widest mt-1 flex items-center gap-1">
                            <Eye size={10} /> Quick Purchase &rarr;
                          </span>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-20 h-full min-h-[580px] flex items-center pointer-events-none">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="max-w-[680px] text-white py-16 pointer-events-auto"
            >
              {current.tag && (
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.6 }}
                  className="text-[10px] sm:text-xs uppercase tracking-[0.35em] font-medium mb-6 text-white/90"
                >
                  {current.tag}
                </motion.p>
              )}

              <h1 className="font-serif text-[44px] sm:text-[64px] lg:text-[84px] leading-[1.06] font-normal tracking-[-0.04em]">
                {current.title}
              </h1>

              {current.subtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.6 }}
                  className="mt-6 max-w-[430px] text-sm sm:text-base leading-7 text-white/90 font-light"
                >
                  {current.subtitle}
                </motion.p>
              )}

              {current.ctaText && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="mt-8"
                >
                  <Link
                    to={current.ctaLink || '/shop'}
                    className="inline-flex items-center gap-4 px-8 py-4 bg-[#F7F4EE] text-[#38352F] text-[10px] sm:text-xs uppercase tracking-[0.18em] font-semibold border border-[#F7F4EE] hover:bg-transparent hover:text-white transition-all duration-300"
                  >
                    <span>{current.ctaText}</span>
                    <ArrowRight size={15} strokeWidth={1.5} />
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}

        {/* Manual Navigation Controls */}
        <div className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-6 z-20">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              isLightBanner
                ? 'bg-[#38352F]/15 hover:bg-[#38352F] text-[#38352F] hover:text-white border border-[#38352F]/25 shadow-sm'
                : 'bg-white/10 hover:bg-white text-white hover:text-[#38352F] border border-white/20'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-6 z-20">
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              isLightBanner
                ? 'bg-[#38352F]/15 hover:bg-[#38352F] text-[#38352F] hover:text-white border border-[#38352F]/25 shadow-sm'
                : 'bg-white/10 hover:bg-white text-white hover:text-[#38352F] border border-white/20'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 right-6 sm:right-12 z-20 flex items-center gap-3">
          <span
            className={`text-[10px] tracking-widest font-mono font-medium ${
              isLightBanner ? 'text-[#38352F]' : 'text-white'
            }`}
          >
            0{activeSlide + 1}
          </span>

          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                aria-label={`Show slide ${index + 1}`}
                className={`h-[2px] transition-all duration-500 ${
                  activeSlide === index
                    ? isLightBanner
                      ? 'w-9 bg-[#38352F]'
                      : 'w-9 bg-white'
                    : isLightBanner
                    ? 'w-4 bg-[#38352F]/30 hover:bg-[#38352F]'
                    : 'w-4 bg-white/40 hover:bg-white'
                }`}
              />
            ))}
          </div>

          <span
            className={`text-[10px] tracking-widest font-mono ${
              isLightBanner ? 'text-[#38352F]/60' : 'text-white/60'
            }`}
          >
            0{slides.length}
          </span>
        </div>
      </section>
    </>
  );
};
