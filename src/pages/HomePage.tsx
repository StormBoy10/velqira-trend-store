import React, { useEffect, useState } from 'react';
import { Hero } from '../components/home/Hero';
import { CategorySection } from '../components/home/CategorySection';
import { TrendingProducts } from '../components/home/TrendingProducts';
import { NewArrivals } from '../components/home/NewArrivals';
import { BrandStory } from '../components/home/BrandStory';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { Reveal } from '../components/motion/Reveal';
import { getProducts, getCategories } from '../services';
import type { Product, Category } from '../types';

interface HomePageProps {
  onAddToCart?: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getProducts().then((data) => setProducts(Array.isArray(data) ? data : []));
    getCategories().then((data) => setCategories(Array.isArray(data) ? data : []));
  }, []);

  const validProducts = (products || []).filter((p) => p && typeof p === 'object');
  const trendingProducts = validProducts.filter((p) => p.isTrending);
  const newArrivals = validProducts.filter((p) => p.isNew);

  return (
    <main className="overflow-hidden">
      <Hero />

      <Reveal>
        <CategorySection categories={categories || []} />
      </Reveal>

      <Reveal delay={0.1}>
        <TrendingProducts
          products={trendingProducts}
          onAddToCart={onAddToCart}
        />
      </Reveal>

      <Reveal delay={0.1}>
        <NewArrivals
          products={newArrivals}
          onAddToCart={onAddToCart}
        />
      </Reveal>

      <Reveal>
        <BrandStory />
      </Reveal>

      <Reveal>
        <NewsletterSection />
      </Reveal>
    </main>
  );
};
