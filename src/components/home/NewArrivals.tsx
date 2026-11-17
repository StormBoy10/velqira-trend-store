import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import type { Product } from '../../types';
import { ProductCard } from '../products/ProductCard';
import { SectionHeader } from '../common/SectionHeader';

interface NewArrivalsProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({
  products,
  onAddToCart,
}) => {
  return (
    <section className="boho-section bg-[#FFF9F5] border-b border-[#DED6C9] py-14 sm:py-20">
      <div className="boho-container">
        <SectionHeader
          icon={<Sparkles className="w-4 h-4 text-[#C6A16B]" />}
          eyebrow="Just arrived"
          title="New arrivals"
          subtitle="Explore our latest finds, selected to bring a little something special to your everyday style."
          linkText="Discover new pieces"
          linkUrl="/shop?filter=new"
        />

        {products.length > 0 ? (
          <>
            {/* Phone Mobile Swipeable Horizontal Snap Row (< 640px) */}
            <div className="block sm:hidden">
              <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 scrollbar-none pb-4 -mx-4 px-4">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                      delay: index * 0.08,
                    }}
                    className="w-[260px] shrink-0 snap-start"
                  >
                    <ProductCard product={product} onAddToCart={onAddToCart} />
                  </motion.div>
                ))}
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#927B60] font-bold text-center mt-3">
                Swipe to see more &rarr;
              </p>
            </div>

            {/* Desktop & Tablet Responsive Grid (>= 640px) */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-7 lg:gap-x-10 gap-y-12">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                    delay: index * 0.08,
                  }}
                >
                  <ProductCard product={product} onAddToCart={onAddToCart} />
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="py-16 text-center border border-dashed border-[#CFC5B6] rounded-2xl bg-white/50">
            <p className="font-serif text-xl text-[#777064]">
              Something beautiful is on its way.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
