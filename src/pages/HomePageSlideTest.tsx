import React, { useEffect, useRef, useState } from 'react';

import { Hero } from '../components/home/Hero';
import { CategorySection } from '../components/home/CategorySection';
import { TrendingProducts } from '../components/home/TrendingProducts';
import { NewArrivals } from '../components/home/NewArrivals';
import { BrandStory } from '../components/home/BrandStory';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { Reveal } from '../components/motion/Reveal';

import { getProducts, getCategories } from '../services';
import type { Product, Category } from '../types';

import './HomePageSlideTest.css';

interface HomePageSlideTestProps {
  onAddToCart?: (product: Product) => void;
}

export const HomePageSlideTest: React.FC<HomePageSlideTestProps> = ({
  onAddToCart,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);

  const slideContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getProducts().then((data) =>
      setProducts(Array.isArray(data) ? data : [])
    );

    getCategories().then((data) =>
      setCategories(Array.isArray(data) ? data : [])
    );
  }, []);

  const validProducts = products.filter(
    (p) => p && typeof p === 'object'
  );

  const trendingProducts = validProducts.filter(
    (p) => p.isTrending
  );

  const newArrivals = validProducts.filter(
    (p) => p.isNew
  );

  // Navigate between the four main slides
  const goToSlide = (index: number) => {
    const container = slideContainerRef.current;
    if (!container) return;

    const slides = container.querySelectorAll<HTMLElement>(
      '.velqira-slide'
    );

    const target = slides[index];

    if (target) {
      container.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  // Detect the currently visible slide
  const handleScroll = () => {
    const container = slideContainerRef.current;
    if (!container) return;

    const slides = container.querySelectorAll<HTMLElement>(
      '.velqira-slide'
    );

    let closestIndex = 0;
    let closestDistance = Infinity;

    slides.forEach((slide, index) => {
      const distance = Math.abs(
        slide.getBoundingClientRect().top -
        container.getBoundingClientRect().top
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveSlide(closestIndex);
  };

  return (
    <main className="velqira-slide-test">

      {/* FIRST FOUR FULL-SCREEN SLIDES */}
      <div
        className="velqira-slide-container"
        ref={slideContainerRef}
        onScroll={handleScroll}
      >

        {/* SLIDE 01 - HOME */}
        <section className="velqira-slide" data-slide="home">
          <div className="velqira-slide-content">
            <Hero />
          </div>
        </section>

        {/* SLIDE 02 - SHOP BY CATEGORY */}
        <section
          className="velqira-slide"
          data-slide="categories"
        >
          <div className="velqira-slide-content">
            <CategorySection categories={categories} />
          </div>
        </section>

        {/* SLIDE 03 - TRENDING NOW */}
        <section
          className="velqira-slide"
          data-slide="trending"
        >
          <div className="velqira-slide-content">
            <TrendingProducts
              products={trendingProducts}
              onAddToCart={onAddToCart}
            />
          </div>
        </section>

        {/* SLIDE 04 - NEW ARRIVALS */}
        <section
          className="velqira-slide"
          data-slide="arrivals"
        >
          <div className="velqira-slide-content">
            <NewArrivals
              products={newArrivals}
              onAddToCart={onAddToCart}
            />
          </div>
        </section>

        {/* SLIDE NAVIGATION */}
        <div className="velqira-slide-navigation">

          <button
            className="velqira-slide-arrow"
            onClick={() => goToSlide(Math.max(0, activeSlide - 1))}
            disabled={activeSlide === 0}
            aria-label="Previous slide"
          >
            ↑
          </button>

          <div className="velqira-slide-dots">
            {[0, 1, 2, 3].map((index) => (
              <button
                key={index}
                className={`velqira-slide-dot ${
                  activeSlide === index ? 'active' : ''
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            className="velqira-slide-arrow"
            onClick={() => goToSlide(Math.min(3, activeSlide + 1))}
            disabled={activeSlide === 3}
            aria-label="Next slide"
          >
            ↓
          </button>

          <span className="velqira-slide-counter">
            0{activeSlide + 1} / 04
          </span>

        </div>
      </div>

      {/* REMAINING WEBSITE - ORIGINAL NORMAL SCROLL */}
      <div className="velqira-slide-rest">
        <Reveal>
          <BrandStory />
        </Reveal>

        <Reveal>
          <NewsletterSection />
        </Reveal>
      </div>

    </main>
  );
};
