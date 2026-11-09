import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-[#FFF9F5] border-b border-[#D9A6AB]/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white p-8 sm:p-14 rounded-3xl border border-[#D9A6AB]/40 shadow-xl relative overflow-hidden">
          {/* Subtle Corner Accent Decor */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8BFC3]/30 rounded-full blur-2xl pointer-events-none"></div>

          <div className="w-12 h-12 bg-[#FFF9F5] border border-[#C6A16B]/40 rounded-full flex items-center justify-center mx-auto mb-4 text-[#C6A16B]">
            <Mail className="w-6 h-6" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-[#C6A16B]">Join The Velqira Circle</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#332522] mt-1">
            Enjoy 15% Off Your First Order
          </h2>
          <p className="text-sm sm:text-base text-[#332522]/70 mt-3 max-w-lg mx-auto">
            Subscribe to receive private sale invitations, early access to new seasonal collections, and curated editorial content.
          </p>

          {subscribed ? (
            <div className="mt-8 p-4 bg-[#FFF9F5] border border-[#C6A16B]/40 rounded-2xl flex items-center justify-center space-x-2 text-[#332522] font-semibold max-w-md mx-auto">
              <CheckCircle className="w-5 h-5 text-[#C6A16B]" />
              <span>Thank you for subscribing! Your welcome code has been sent.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 bg-[#FFF9F5] text-[#332522] placeholder-[#332522]/40 text-sm px-4 py-3.5 rounded-xl border border-[#D9A6AB]/50 focus:outline-none focus:border-[#C6A16B] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#E8BFC3] text-[#332522] px-7 py-3.5 text-sm font-bold rounded-xl hover:bg-[#D9A6AB] transition-colors shadow-xs"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-xs text-[#332522]/50 mt-4">
            We respect your privacy. Unsubscribe at any time with one click.
          </p>
        </div>
      </div>
    </section>
  );
};
