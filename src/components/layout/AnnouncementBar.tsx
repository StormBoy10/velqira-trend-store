import React, { useState } from 'react';
import { Sparkles, Check } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('VELQIRA10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-[#2B2823] text-[#F7F4EE] text-[10px] sm:text-[11px] py-2.5 px-4 text-center border-b border-[#A18B70]/25 tracking-[0.14em] flex items-center justify-center gap-2">
      <Sparkles className="w-3 h-3 text-[#A18B70] shrink-0" />
      <span>
        <strong className="text-[#A18B70] font-medium uppercase tracking-[0.18em]">
          COMPLIMENTARY SHIPPING:
        </strong>{' '}
        On orders over ₹499 &bull; Use code{' '}
        <button
          type="button"
          onClick={handleCopyCode}
          className="inline-flex items-center gap-1 font-semibold underline text-[#D8CBB8] hover:text-white transition-colors cursor-pointer"
          title="Click to copy code"
        >
          <span>VELQIRA10</span>
          {copied ? (
            <span className="text-[#A18B70] inline-flex items-center gap-0.5 text-[9px] bg-[#38352F] px-1 py-0.5 ml-1">
              <Check className="w-2.5 h-2.5" /> Copied
            </span>
          ) : (
            <span className="text-[9px] text-[#A18B70]">(10% off)</span>
          )}
        </button>
      </span>
    </div>
  );
};
