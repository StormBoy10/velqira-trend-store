import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface PageLoaderProps {
  onComplete: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({
  onComplete,
}) => {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 2800);

    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#EDE1CD]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
    >
      {/* Silk background */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3.5, ease: 'easeOut' }}
      >
        <img
          src="/images/velqira-editorial-silk.jpeg"
          alt="VELQIRA luxury silk"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Soft cinematic overlay */}
      <div className="absolute inset-0 bg-[#F8EEDC]/10" />

      {/* Animated golden light */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.38) 48%, transparent 65%)',
        }}
        initial={{ x: '-120%' }}
        animate={{ x: '120%' }}
        transition={{
          duration: 2.2,
          ease: 'easeInOut',
          delay: 0.3,
        }}
      />

      {/* Loading details */}
      <div className="absolute bottom-12 sm:bottom-16 left-0 right-0 flex flex-col items-center px-6">

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-[#493727] text-[9px] sm:text-[10px] uppercase tracking-[0.38em] font-medium"
        >
          Artisanal Grace. Modern Elegance.
        </motion.p>

        {/* Loading line */}
        <div className="w-32 sm:w-40 h-[2px] bg-[#6F573D]/20 mt-7 overflow-hidden">
          <motion.div
            className="h-full bg-[#80613B]"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: 2.5,
              ease: 'easeInOut',
            }}
          />
        </div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-3 text-[8px] uppercase tracking-[0.3em] text-[#493727]"
        >
          Preparing your experience
        </motion.span>
      </div>
    </motion.div>
  );
};
