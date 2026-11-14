import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchHeroSlidesFromAPI } from '../../services/api';
import type { HeroSlide } from '../../types';

export const Hero: React.FC = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    fetchHeroSlidesFromAPI().then((data) => {
      const activeOnly = (data || []).filter((s) => s && s.isActive !== false);
      setSlides(activeOnly.length > 0 ? activeOnly : data || []);
    });
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [slides]);

  if (slides.length === 0) return null;

  const current = slides[activeSlide] || slides[0];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full min-h-[580px] h-[76vh] max-h-[820px] overflow-hidden bg-[#2B2823] text-white">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={current.id || activeSlide}
            src={current.image}
            alt={current.title || 'VELQIRA Slide'}
            initial={{ opacity: 0, scale: 1.035 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.2, ease: 'easeInOut' },
              scale: { duration: 6, ease: 'linear' },
            }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>

        {/* Editorial gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-20 h-full min-h-[580px] flex items-center">
        <motion.div
          key={current.id || activeSlide}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-[680px] text-white py-16"
        >
          {current.badgeText && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="text-[10px] sm:text-xs uppercase tracking-[0.35em] font-medium mb-6 text-[#D8CBB8]"
            >
              {current.badgeText}
            </motion.p>
          )}

          <h1 className="font-serif text-[44px] sm:text-[64px] lg:text-[84px] leading-[1.06] font-normal tracking-[-0.04em] whitespace-pre-line">
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

          {current.buttonText && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-8"
            >
              <Link
                to={current.buttonLink || '/shop'}
                className="inline-flex items-center gap-4 px-8 py-4 bg-[#F7F4EE] text-[#38352F] text-[10px] sm:text-xs uppercase tracking-[0.18em] font-semibold border border-[#F7F4EE] hover:bg-transparent hover:text-white transition-all duration-300"
              >
                <span>{current.buttonText}</span>
                <ArrowRight size={15} strokeWidth={1.5} />
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Manual Navigation Controls */}
      <div className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-6 z-20">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous slide"
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white text-white hover:text-[#38352F] border border-white/20 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-6 z-20">
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next slide"
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white text-white hover:text-[#38352F] border border-white/20 transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 right-6 sm:right-12 z-20 flex items-center gap-3">
        <span className="text-[10px] tracking-widest font-mono font-medium text-white">
          0{activeSlide + 1}
        </span>

        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              aria-label={`Show slide ${index + 1}`}
              className={`h-[2px] transition-all duration-500 cursor-pointer ${
                activeSlide === index
                  ? 'w-9 bg-white'
                  : 'w-4 bg-white/40 hover:bg-white'
              }`}
            />
          ))}
        </div>

        <span className="text-[10px] tracking-widest font-mono text-white/60">
          0{slides.length}
        </span>
      </div>
    </section>
  );
};
