import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&auto=format&fit=crop&q=80',
    tag: 'Featured Choice',
    title: 'Velqira Pro & Natural Living Line',
    subtitle: 'Explore sustainable craftsmanship for everyday comfort.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=80',
    tag: 'New Collection 2025',
    title: 'Luxury Silk & Fashion Outfits',
    subtitle: 'Warm pastel tones designed for effortless elegance.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1000&auto=format&fit=crop&q=80',
    tag: 'Artisanal Grace',
    title: '18k Gold & Pearl Jewellery',
    subtitle: 'Handcrafted earrings, layered necklaces, and fine accessories.',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1000&auto=format&fit=crop&q=80',
    tag: 'Korean Room Decor',
    title: 'Aesthetic Bunny Lamp & Bubble Candles',
    subtitle: 'Cozy lighting and room accessories for your sanctuary.',
  },
];

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="relative bg-[#FFF9F5] text-[#332522] overflow-hidden py-20 sm:py-32 border-b border-[#D9A6AB]/30">
      {/* Background Animated Gradient Blurs */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-10 right-10 w-96 h-96 bg-[#E8BFC3] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#C6A16B] rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left Copy Container (Exact text retained) */}
        <div className="lg:col-span-7 flex flex-col items-start transition-all duration-700 ease-out">
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
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-[#332522] bg-[#E8BFC3] hover:bg-[#D9A6AB] transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              Explore Collection
              <ArrowRight className="ml-2 w-5 h-5 text-[#332522]" />
            </Link>
            <Link
              to="/categories"
              className="inline-flex items-center justify-center px-8 py-4 border border-[#D9A6AB]/60 text-base font-bold rounded-xl text-[#332522] bg-white/70 hover:bg-white transition-all shadow-xs cursor-pointer"
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
        </div>

        {/* Right Hero Image Advanced Slideshow Container */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group h-[450px] sm:h-[520px]">

            {/* Slideshow Image Stack */}
            {heroSlides.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    isActive ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover transition-transform duration-10000 ease-out transform scale-105 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#332522]/80 via-transparent to-transparent" />

                  {/* Floating Tag Card for active slide */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-[#D9A6AB]/40 shadow-xl transition-all duration-500">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C6A16B]">
                      {slide.tag}
                    </span>
                    <p className="text-base font-bold font-serif text-[#332522] mt-0.5">
                      {slide.title}
                    </p>
                    <p className="text-xs text-[#332522]/75 mt-0.5 leading-relaxed">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Previous / Next Slide Controls */}
            <button
              onClick={handlePrevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md text-[#332522] flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 transition-all shadow-md cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md text-[#332522] flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 transition-all shadow-md cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Indicator Dots */}
            <div className="absolute top-4 right-4 z-20 flex space-x-1.5 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    index === currentSlide ? 'w-6 bg-[#E8BFC3]' : 'w-2 bg-white/60 hover:bg-white'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
