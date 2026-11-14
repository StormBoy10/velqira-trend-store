import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface PageLoaderProps {
  onComplete: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  useEffect(() => {
    // Check if user has already seen the intro animation in this browser session
    const hasVisited = sessionStorage.getItem('velqira_intro_seen');
    const delay = hasVisited ? 700 : 1800;

    const timer = window.setTimeout(() => {
      sessionStorage.setItem('velqira_intro_seen', 'true');
      onComplete();
    }, delay);

    return () => window.clearTimeout(timer);
  }, [onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem('velqira_intro_seen', 'true');
    onComplete();
  };

  return (
    <motion.div
      onClick={handleSkip}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#EDE1CD] cursor-pointer"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      title="Click to enter"
    >
      {/* Silk background */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: 'easeOut' }}
      >
        <img
          src="/images/velqira-editorial-silk.jpeg"
          alt="VELQIRA luxury silk"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Soft cinematic overlay */}
      <div className="absolute inset-0 bg-[#2B2823]/25" />

      {/* Animated golden light */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.3) 48%, transparent 65%)',
        }}
        initial={{ x: '-120%' }}
        animate={{ x: '120%' }}
        transition={{
          duration: 1.6,
          ease: 'easeInOut',
          delay: 0.2,
        }}
      />

      {/* Center Brand Identity */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center text-[#F7F4EE]">
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-[0.2em] font-normal"
        >
          VELQIRA
        </motion.span>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-[#D8CBB8] text-[9px] sm:text-[10px] uppercase tracking-[0.38em] font-medium mt-3"
        >
          Artisanal Grace · Modern Elegance
        </motion.p>

        {/* Loading Progress Line */}
        <div className="w-32 sm:w-44 h-[1.5px] bg-white/20 mt-6 overflow-hidden">
          <motion.div
            className="h-full bg-[#D8CBB8]"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: 1.5,
              ease: 'easeInOut',
            }}
          />
        </div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-3 text-[8px] uppercase tracking-[0.28em] text-[#D8CBB8]"
        >
          Click anywhere to enter
        </motion.span>
      </div>
    </motion.div>
  );
};
