import React from 'react';
import { Award, Compass, HeartHandshake } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section className="boho-section bg-[#38352F] text-[#F7F4EE] relative overflow-hidden border-t border-[#A18B70]/30">
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl bg-[#A18B70]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="boho-container relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Craftsmanship Studio Image Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative overflow-hidden border border-[#A18B70]/30">
              <img
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80"
                alt="Velqira Craftsmanship Studio"
                className="w-full h-[480px] lg:h-[540px] object-cover"
              />
            </div>
            {/* Overlaid Badge */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-[#D8CBB8] text-[#38352F] p-6 max-w-xs border border-[#A18B70]/40">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#38352F]/80">Our Ethos</p>
              <p className="text-sm font-serif mt-1 leading-snug">"Mindful creation for those who value quiet luxury & lasting quality."</p>
            </div>
          </div>

          {/* Right Column: Editorial Text */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#A18B70] mb-2">Editorial</span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#F7F4EE] leading-tight">
              Designed with Intention. <br />
              <span className="italic font-normal text-[#D8CBB8]">Crafted for Life.</span>
            </h2>

            <p className="mt-6 text-base text-[#F7F4EE]/85 leading-relaxed">
              At Velqira, we believe that true elegance lies in simplicity and uncompromising quality. Founded on the principle of warm minimalism, every piece in our collection is thoughtfully curated to bring balance, comfort, and quiet beauty to your daily routine.
            </p>

            {/* Three Pillars */}
            <div className="mt-8 space-y-5">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#F7F4EE]/10 text-[#A18B70]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-base font-serif text-[#F7F4EE]">Uncompromising Quality</h4>
                  <p className="text-xs text-[#F7F4EE]/70 mt-0.5">Sourced exclusively from ethical artisans and premium material partners.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#F7F4EE]/10 text-[#A18B70]">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-base font-serif text-[#F7F4EE]">Timeless Aesthetics</h4>
                  <p className="text-xs text-[#F7F4EE]/70 mt-0.5">Designed beyond fleeting trends to remain timeless year after year.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#F7F4EE]/10 text-[#A18B70]">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-base font-serif text-[#F7F4EE]">Sustainable Commitment</h4>
                  <p className="text-xs text-[#F7F4EE]/70 mt-0.5">Eco-conscious packaging and zero-waste manufacturing practices.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
