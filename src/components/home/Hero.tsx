import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=85',
    tag: 'Featured Choice',
    title: 'Velqira Pro & Natural Living Line',
    subtitle: 'Explore sustainable craftsmanship for everyday comfort.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&auto=format&fit=crop&q=85',
    tag: 'New Collection 2025',
    title: 'Luxury Silk & Fashion Outfits',
    subtitle: 'Warm pastel tones designed for effortless elegance.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1600&auto=format&fit=crop&q=85',
    tag: 'Artisanal Grace',
    title: '18k Gold & Pearl Jewellery',
    subtitle: 'Handcrafted earrings, layered necklaces, and fine accessories.',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1600&auto=format&fit=crop&q=85',
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
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="relative w-full h-[580px] sm:h-[680px] overflow-hidden text-[#FFF9F5] border-b border-[#C6A16B]/30 group">

      {/* FULL-FRAME BACKGROUND SLIDESHOW CAROUSEL */}
      {heroSlides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-0 scale-100' : 'opacity-0 -z-10 scale-105 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center transform scale-100 hover:scale-105 transition-transform duration-10000 ease-out"
            />
            {/* Soft Warm Editorial Overlay Gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#332522]/90 via-[#332522]/65 to-transparent" />
          </div>
        );
      })}

      {/* FRONT TEXT CONTENT (Positioned directly in front of the full-frame sliding background) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-start">
        <div className="max-w-2xl">

          {/* Badge */}
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#FFF9F5] bg-[#E8BFC3]/30 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-[#FFF9F5]/30 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A16B]" />
            <span>Curated Luxe Essentials 2025</span>
          </div>

          {/* Exact Title Requested */}
          <h1 className="text-4xl sm:text-6xl font-extrabold font-serif tracking-tight text-[#FFF9F5] leading-[1.12]">
            Artisanal Grace. <br />
            <span className="italic font-normal text-[#E8BFC3]">Modern Elegance.</span>
          </h1>

          {/* Exact Subtitle Requested */}
          <p className="mt-6 text-lg sm:text-xl text-[#FFF9F5]/90 leading-relaxed font-normal">
            Discover handpicked collections designed for refined living. Blending soft aesthetics, natural tones, and timeless quality.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-[#332522] bg-[#E8BFC3] hover:bg-[#D9A6AB] transition-all shadow-lg hover:shadow-xl cursor-pointer"
            >
              Explore Collection
              <ArrowRight className="ml-2 w-5 h-5 text-[#332522]" />
            </Link>
            <Link
              to="/categories"
              className="inline-flex items-center justify-center px-8 py-4 border border-[#FFF9F5]/50 text-base font-bold rounded-xl text-[#FFF9F5] bg-white/10 backdrop-blur-md hover:bg-white/25 transition-all shadow-md cursor-pointer"
            >
              Browse Categories
            </Link>
          </div>

          {/* Stats summary */}
          <div className="mt-12 pt-8 border-t border-[#FFF9F5]/20 grid grid-cols-3 gap-6 max-w-md">
            <div>
              <p className="text-2xl font-bold font-serif text-[#FFF9F5]">100%</p>
              <p className="text-xs text-[#FFF9F5]/80 font-medium">Authentic Quality</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-serif text-[#FFF9F5]">4.9★</p>
              <p className="text-xs text-[#FFF9F5]/80 font-medium">Customer Satisfaction</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-serif text-[#FFF9F5]">Global</p>
              <p className="text-xs text-[#FFF9F5]/80 font-medium">Express Shipping</p>
            </div>
          </div>

        </div>
      </div>

      {/* FULL-FRAME SLIDESHOW CONTROLS & INDICATORS */}

      {/* Left/Right Chevrons */}
      <button
        onClick={handlePrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md text-[#FFF9F5] border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white hover:text-[#332522] transition-all shadow-lg cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md text-[#FFF9F5] border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white hover:text-[#332522] transition-all shadow-lg cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Active Slide Info Tag (Bottom Right) */}
      <div className="absolute bottom-6 right-6 z-20 hidden md:block bg-black/40 backdrop-blur-md border border-white/20 p-4 rounded-2xl max-w-xs shadow-2xl">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#E8BFC3]">
          {heroSlides[currentSlide].tag}
        </span>
        <p className="text-sm font-bold font-serif text-[#FFF9F5] mt-0.5">
          {heroSlides[currentSlide].title}
        </p>
        <p className="text-xs text-[#FFF9F5]/80 mt-0.5 line-clamp-1">
          {heroSlides[currentSlide].subtitle}
        </p>
      </div>

      {/* Bottom Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
              index === currentSlide ? 'w-8 bg-[#E8BFC3]' : 'w-2.5 bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </section>
  );
};
