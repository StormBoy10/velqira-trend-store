import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

const heroImages = [
  '/images/NEW HEROS.jpg',
  'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=1920&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&auto=format&fit=crop&q=85',
];

export const Hero: React.FC = () => {
  const [activeImage, setActiveImage] = React.useState(0);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % heroImages.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative flex h-[580px] sm:h-[680px] lg:h-[750px] sm:aspect-[4/3] lg:aspect-[16/9] max-h-[750px] w-full items-center justify-center overflow-hidden border-b border-[#C6A16B]/30 text-[#332522]">

      {/* Background slideshow featuring high-definition luxury editorial themes */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.img
            key={activeImage}
            src={heroImages[activeImage]}
            alt="VELQIRA luxury collection"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>

        {/* Soft elegant warm cream overlay for pristine luxury contrast */}
        <div className="absolute inset-0 bg-[#FFF9F5]/45 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF9F5]/35 via-transparent to-[#FFF9F5]/55" />
      </div>

      {/* Hero content */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-20 text-center sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8 inline-flex items-center space-x-2 rounded-full border border-[#C6A16B]/40 bg-[#FFF9F5]/85 px-5 py-2 text-sm font-extrabold uppercase tracking-widest text-[#C6A16B] shadow-sm backdrop-blur-md sm:text-base"
        >
          <Sparkles className="h-4 w-4 text-[#C6A16B]" />
          <span>Curated Luxe Essentials 2026</span>
        </motion.div>

        <h1 className="text-5xl font-black leading-[1.08] tracking-tight sm:text-7xl lg:text-8xl font-serif text-[#332522]">
          Artisanal Grace. <br />
          <span className="italic font-normal text-[#C6A16B]">Modern Elegance.</span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="mt-8 max-w-3xl text-xl leading-relaxed text-[#332522]/90 sm:text-2xl lg:text-3xl font-serif font-medium"
        >
          Discover handpicked collections designed for refined living.
          Blending soft aesthetics, natural tones, and timeless quality.
        </motion.p>
      </motion.div>

      {/* Slideshow indicators */}
      <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 gap-2 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            aria-label={`Show background image ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
              activeImage === index
                ? 'w-8 bg-[#C6A16B]'
                : 'w-2.5 bg-white/70 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
