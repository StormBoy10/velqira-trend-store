import React from 'react';
import { Award, Compass, HeartHandshake } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section className="py-24 bg-[#332522] text-[#FFF9F5] relative overflow-hidden border-t border-[#C6A16B]/30">
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl bg-[#C6A16B]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Craftsmanship Studio Image Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#C6A16B]/30">
              <img
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80"
                alt="Velqira Craftsmanship Studio"
                className="w-full h-[480px] object-cover"
              />
            </div>
            {/* Overlaid Badge */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-[#E8BFC3] text-[#332522] p-6 rounded-2xl shadow-xl max-w-xs border border-[#C6A16B]/40">
              <p className="text-xs font-bold uppercase tracking-widest text-[#332522]/80">Our Ethos</p>
              <p className="text-sm font-bold font-serif mt-1">"Mindful creation for those who value quiet luxury & lasting quality."</p>
            </div>
          </div>

          {/* Right Column: Editorial Text */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C6A16B] mb-2">Editorial</span>
            <h2 className="text-3xl sm:text-5xl font-bold font-serif text-[#FFF9F5] leading-tight">
              Designed with Intention. <br />
              <span className="italic font-normal text-[#E8BFC3]">Crafted for Life.</span>
            </h2>

            <p className="mt-6 text-base text-[#FFF9F5]/85 leading-relaxed">
              At Velqira, we believe that true elegance lies in simplicity and uncompromising quality. Founded on the principle of warm minimalism, every piece in our collection is thoughtfully curated to bring balance, comfort, and quiet beauty to your daily routine.
            </p>

            {/* Three Pillars */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#FFF9F5]/10 rounded-xl text-[#C6A16B]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base font-serif text-[#FFF9F5]">Uncompromising Quality</h4>
                  <p className="text-xs text-[#FFF9F5]/70 mt-0.5">Sourced exclusively from ethical artisans and premium material partners.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#FFF9F5]/10 rounded-xl text-[#C6A16B]">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base font-serif text-[#FFF9F5]">Timeless Aesthetics</h4>
                  <p className="text-xs text-[#FFF9F5]/70 mt-0.5">Designed beyond fleeting trends to remain timeless year after year.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#FFF9F5]/10 rounded-xl text-[#C6A16B]">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base font-serif text-[#FFF9F5]">Sustainable Commitment</h4>
                  <p className="text-xs text-[#FFF9F5]/70 mt-0.5">Eco-conscious packaging and zero-waste manufacturing practices.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
