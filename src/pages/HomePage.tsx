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

  const reloadData = () => {
    getProducts().then((data) => setProducts(Array.isArray(data) ? data : []));
    getCategories().then((data) => setCategories(Array.isArray(data) ? data : []));
  };

  useEffect(() => {
    reloadData();

    window.addEventListener('velqira_data_updated', reloadData);
    window.addEventListener('storage', reloadData);

    return () => {
      window.removeEventListener('velqira_data_updated', reloadData);
      window.removeEventListener('storage', reloadData);
    };
  }, []);

  const validProducts = (products || []).filter((p) => p && typeof p === 'object' && p.id && p.name);
  const trendingProducts = validProducts.filter((p) => p.isTrending);
  const displayTrending = trendingProducts.length > 0 ? trendingProducts : validProducts.slice(0, 4);

  const newArrivals = validProducts.filter((p) => p.isNew);
  const displayNew = newArrivals.length > 0 ? newArrivals : validProducts.slice(2, 6);

  return (
    <main className="overflow-hidden">
      <Hero onAddToCart={onAddToCart} />

      <Reveal>
        <CategorySection categories={categories || []} />
      </Reveal>

      <Reveal delay={0.1}>
        <TrendingProducts
          products={displayTrending}
          onAddToCart={onAddToCart}
        />
      </Reveal>

      <Reveal delay={0.1}>
        <NewArrivals
          products={displayNew}
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
