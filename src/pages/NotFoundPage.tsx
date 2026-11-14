import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <main className="bg-[#F7F4EE] min-h-[75vh] flex items-center justify-center py-24 text-center">
      <div className="boho-container max-w-md mx-auto">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#927B60] font-semibold block mb-2">
          Page Not Found
        </span>
        <h1 className="text-7xl sm:text-8xl font-serif text-[#38352F] font-normal mb-4">
          404
        </h1>
        <p className="text-sm sm:text-base text-[#777064] leading-relaxed mb-8">
          The requested curation is unavailable or has transitioned to a new collection.
        </p>
        <Link
          to="/"
          className="boho-button inline-flex items-center gap-3 text-xs tracking-[0.2em] px-8 py-3.5"
        >
          <span>Return to Storefront</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </main>
  );
};
