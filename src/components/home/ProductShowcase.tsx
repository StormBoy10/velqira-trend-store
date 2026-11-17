import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { ProductCard } from '../products/ProductCard';

interface ProductShowcaseProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  linkText: string;
  linkUrl: string;
  icon: React.ReactNode;
  tone: 'cream' | 'white';
  products: Product[];
  onAddToCart?: (product: Product) => void;
  emptyMessage?: string;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  eyebrow,
  title,
  subtitle,
  linkText,
  linkUrl,
  icon,
  tone,
  products,
  onAddToCart,
  emptyMessage = 'New arrivals will be coming soon.',
}) => {
  const bgClass = tone === 'cream' ? 'bg-[#FFF9F5]' : 'bg-[#FFFFFF]';

  return (
    <section className={`py-20 border-b border-[#D9A6AB]/25 ${bgClass}`}>
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#C6A16B] mb-2">
              {icon}
              <span>{eyebrow}</span>
            </div>

            <h2 className="font-serif text-[30px] sm:text-[36px] font-bold text-[#332522] leading-tight">
              {title}
            </h2>

            <p className="text-sm text-[#332522]/70 mt-2 max-w-xl leading-relaxed">
              {subtitle}
            </p>
          </div>

          <Link
            to={linkUrl}
            className="group inline-flex items-center gap-2 text-sm font-bold text-[#332522] border-b border-[#C6A16B] pb-1 hover:text-[#C6A16B] transition-colors shrink-0"
          >
            <span>{linkText}</span>
            <ArrowRight className="w-4 h-4 text-[#C6A16B] transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </motion.div>

        {/* Product Cards Grid & Mobile Swipeable Row */}
        {products.length > 0 ? (
          <>
            {/* Phone Mobile Horizontal Swipe Row (< 640px) */}
            <div className="block sm:hidden">
              <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 scrollbar-none pb-4 -mx-4 px-4">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.1 + index * 0.1,
                    }}
                    className="w-[70vw] max-w-[280px] shrink-0 snap-start"
                  >
                    <ProductCard product={product} onAddToCart={onAddToCart} />
                  </motion.div>
                ))}
              </div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#C6A16B] font-bold text-center mt-3">
                Swipe to see more &rarr;
              </p>
            </div>

            {/* Tablet (2 cols), Laptop (3 cols), Large Screens (4 cols) */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.1 + index * 0.1,
                  }}
                >
                  <ProductCard product={product} onAddToCart={onAddToCart} />
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="py-16 text-center border border-dashed border-[#D9A6AB]/30 rounded-3xl bg-[#FFF9F5]/60 max-w-lg mx-auto">
            <p className="font-serif text-xl text-[#332522]/70">
              {emptyMessage}
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
