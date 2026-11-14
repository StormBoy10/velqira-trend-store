import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete?: () => void;
  duration?: number; // Duration in milliseconds, default 2200ms
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  duration = 2200,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [imgSrc, setImgSrc] = useState('/images/Velqira Satin Gold Logo.jpg');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F7F4EE] overflow-hidden select-none"
        >
          {/* Background Luxury Silk Texture Image with Fallback */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFF9F5] via-[#EADCD0] to-[#F7F4EE]">
            <motion.img
              src={imgSrc}
              alt="VELQIRA Luxe Opening"
              initial={{ scale: 1.08, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              onError={() => setImgSrc('/images/NEW HEROS.jpg')}
              className="w-full h-full object-cover object-center"
            />
            {/* Soft Ambient Overlay for luxury contrast */}
            <div className="absolute inset-0 bg-[#F7F4EE]/30 backdrop-blur-[1px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#F7F4EE]/40 via-transparent to-[#F7F4EE]/60" />
          </div>

          {/* Centered Opening Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center px-8 py-6 rounded-2xl bg-[#F7F4EE]/85 backdrop-blur-md border border-[#A18B70]/35 shadow-2xl max-w-sm text-center"
          >
            <span className="text-2xl text-[#A18B70] animate-pulse mb-1">✦</span>
            <span className="font-serif text-3xl sm:text-4xl tracking-[0.14em] text-[#38352F] font-bold">
              VELQIRA
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#777064] mt-2">
              Artisanal Grace · Modern Elegance
            </span>

            {/* Minimalist Progress Line */}
            <div className="w-36 h-[2px] bg-[#D8CBB8] mt-6 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: duration / 1000 - 0.2, ease: 'easeInOut' }}
                className="w-full h-full bg-[#A18B70]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
