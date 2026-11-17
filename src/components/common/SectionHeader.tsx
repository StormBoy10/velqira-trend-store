import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  linkText?: string;
  linkUrl?: string;
  icon?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  linkText,
  linkUrl,
  icon,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-12 gap-5"
    >
      <div>
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#927B60] mb-2.5">
          {icon}
          <span>{eyebrow}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#38352F] font-serif leading-tight">
          {title}
        </h2>

        {subtitle && (
          <p className="text-sm sm:text-base text-[#777064] mt-3 max-w-xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {linkText && linkUrl && (
        <Link
          to={linkUrl}
          className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-semibold text-[#38352F] border-b border-[#A18B70] pb-1.5 hover:text-[#927B60] transition-colors shrink-0"
        >
          <span>{linkText}</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-[#C6A16B]" />
        </Link>
      )}
    </motion.div>
  );
};
