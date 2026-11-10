import React from 'react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#332522] text-[#FFF9F5] text-xs py-2 px-4 text-center font-medium border-b border-[#C6A16B]/30 tracking-wide flex items-center justify-center space-x-2">
      <span className="inline-block w-2 h-2 rounded-full bg-[#C6A16B] animate-pulse"></span>
      <span>
        <strong className="text-[#C6A16B] font-serif uppercase tracking-wider">VELQIRA EXCLUSIVE:</strong> Complimentary shipping on orders over ₹499 &bull; Use code <span className="font-bold underline text-[#E8BFC3] cursor-pointer">VELQIRA10</span> for 10% off
      </span>
    </div>
  );
};
