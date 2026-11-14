import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroSlide {
  id: string;
  image: string;
  wideImage?: string;
  alt: string;
  isGraphicBanner?: boolean;
  bannerType?: 'silk-logo' | 'why-choose' | 'editorial';
  bgColor?: string;
  tag?: string;
  title?: React.ReactNode;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

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
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=2000&auto=format&fit=crop&q=85',
    alt: 'Velqira seasonal fashion collection',
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
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=2000&auto=format&fit=crop&q=85',
    alt: 'Velqira fine jewellery and accessories',
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

export const Hero: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, []);

  const current = slides[activeSlide];
  const isLightBanner = current.isGraphicBanner;

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  return (
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
              /* Slide 1: Champagne Satin Silk VELQIRA Logo Banner */
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

                {/* Subtle soft vignette on silk banner */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </Link>
            ) : current.bannerType === 'why-choose' ? (
              /* Slide 2: Why Choose Velqira graphic banner */
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
            ) : (
              /* Photography Slides */
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

        {/* Editorial gradient overlay for photo slides only */}
        {!isLightBanner && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />
          </>
        )}
      </div>

      {/* Hero Content Overlays */}
      {current.bannerType === 'silk-logo' ? (
        /* Slide 1 Luxury Overlay: Bottom Centered CTA with Tagline */
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
        /* Slide 2: Floating Bottom CTA */
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
      ) : (
        /* Photography Slides: Editorial Left Typography */
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

      {/* Manual Navigation Controls (Prev / Next Arrows) */}
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

      {/* Slide Indicators Bar */}
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
  );
};
