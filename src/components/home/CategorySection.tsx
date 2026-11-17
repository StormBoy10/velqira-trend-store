import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import type { Category, Product } from '../../types';
import { CategoryCard } from './CategoryCard';
import { SectionHeader } from '../common/SectionHeader';
import { getProducts } from '../../services';

interface CategorySectionProps {
  categories: Category[];
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  categories,
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then((data) => setProducts(Array.isArray(data) ? data : []));
  }, []);

  const homeCategories = categories.filter(
    (category) =>
      category.showOnHome !== false && category.isActive !== false
  );

  const getProductCount = (category: Category) => {
    const slug = category.slug || category.id;
    const catId = category.id;
    return products.filter((p) => {
      if (!p || !p.category) return false;
      const pCat = p.category.toLowerCase();
      return (
        p.category === catId ||
        p.category === slug ||
        pCat === slug.toLowerCase() ||
        pCat === catId.toLowerCase()
      );
    }).length;
  };

  return (
    <section className="boho-section bg-[#F7F4EE] border-b border-[#DED6C9] py-14 sm:py-20">
      <div className="boho-container">
        <SectionHeader
          eyebrow="Curated for your lifestyle"
          title="Shop by category"
          subtitle="Thoughtfully selected pieces that bring natural beauty, timeless character and effortless elegance into your everyday."
          linkText="Explore all collections"
          linkUrl="/shop"
        />

        {homeCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {homeCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.1,
                }}
              >
                <CategoryCard
                  category={category}
                  productCount={getProductCount(category)}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center border border-dashed border-[#CFC5B6] rounded-2xl bg-white/50">
            <p className="font-serif text-xl text-[#777064]">
              Collections are coming soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
