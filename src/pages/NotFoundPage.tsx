import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-[#FFF9F5] min-h-screen py-24 text-center">
      <h1 className="text-6xl font-extrabold text-[#332522] font-serif">404</h1>
      <p className="text-xl text-[#332522]/80 mt-4">Page Not Found</p>
      <p className="text-sm text-[#332522]/60 mt-2">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block bg-[#E8BFC3] text-[#332522] px-6 py-3 rounded-xl font-bold hover:bg-[#D9A6AB] transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
};
