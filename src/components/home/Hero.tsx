import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const heroImages = [
  '/images/NEW HEROS.jpg',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=2000&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=2000&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=2000&auto=format&fit=crop&q=85',
];

export const Hero: React.FC = () => {
  const [activeImage, setActiveImage] = React.useState(0);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % heroImages.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[620px] h-[76vh] max-h-[820px] overflow-hidden bg-[#DDD3C3]">

      {/* Background Slideshow */}
      <div className="absolute inset-0">

        <AnimatePresence mode="sync">
          <motion.img
            key={activeImage}
            src={heroImages[activeImage]}
            alt="Velqira fashion collection"
            initial={{ opacity: 0, scale: 1.035 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.4, ease: 'easeInOut' },
              scale: { duration: 6, ease: 'linear' },
            }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>

        {/* Editorial overlay for readable text */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />

      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-20 h-full min-h-[620px] flex items-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-[680px] text-white py-20"
        >

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-[10px] sm:text-xs uppercase tracking-[0.35em] font-medium mb-7 text-white/90"
          >
            THE VELQIRA COLLECTION — 2026
          </motion.p>

          <h1 className="font-serif text-[48px] sm:text-[68px] lg:text-[88px] leading-[1.06] font-normal tracking-[-0.04em]">
            Artisanal
            <br />
            <span className="italic">Grace.</span>
            <br />
            Modern Elegance.
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-7 max-w-[430px] text-sm sm:text-base leading-7 text-white/90 font-light"
          >
            Discover thoughtfully curated pieces inspired by
            natural beauty, timeless design and effortless style.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-9"
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-5 px-8 py-4 bg-[#F7F4EE] text-[#38352F] text-[10px] sm:text-xs uppercase tracking-[0.18em] font-semibold border border-[#F7F4EE] hover:bg-transparent hover:text-white transition-all duration-300"
            >
              Discover The Collection
              <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
          </motion.div>

        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 right-7 sm:right-12 z-20 flex items-center gap-3">

        <span className="text-white text-[10px] tracking-widest">
          0{activeImage + 1}
        </span>

        <div className="flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              aria-label={`Show slide ${index + 1}`}
              className={`h-[2px] transition-all duration-500 ${
                activeImage === index
                  ? 'w-9 bg-white'
                  : 'w-4 bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>

        <span className="text-white/70 text-[10px] tracking-widest">
          0{heroImages.length}
        </span>

      </div>

    </section>
  );
};
