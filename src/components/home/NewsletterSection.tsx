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
    <section className="boho-section bg-[#F7F4EE] border-b border-[#DED6C9]">
      <div className="boho-container text-center">
        <div className="bg-[#EEE9DF] p-8 sm:p-14 lg:p-16 border border-[#DED6C9] max-w-4xl mx-auto relative overflow-hidden">

          <div className="w-12 h-12 bg-[#F7F4EE] border border-[#A18B70]/40 flex items-center justify-center mx-auto mb-5 text-[#A18B70]">
            <Mail className="w-5 h-5" />
          </div>

          <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#927B60]">Join The Velqira Circle</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#38352F] mt-2">
            Enjoy 15% Off Your First Order
          </h2>
          <p className="text-sm sm:text-base text-[#777064] mt-3 max-w-lg mx-auto leading-relaxed">
            Subscribe to receive private sale invitations, early access to new seasonal collections, and curated editorial content.
          </p>

          {subscribed ? (
            <div className="mt-8 p-4 bg-[#F7F4EE] border border-[#A18B70]/40 flex items-center justify-center space-x-2 text-[#38352F] font-semibold max-w-md mx-auto text-xs uppercase tracking-wider">
              <CheckCircle className="w-4 h-4 text-[#A18B70]" />
              <span>Thank you for subscribing! Welcome code sent.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 bg-[#F7F4EE] text-[#38352F] placeholder-[#999184] text-xs px-4 py-4 border border-[#BDB3A4] focus:outline-none focus:border-[#927B60] transition-colors"
              />
              <button
                type="submit"
                className="boho-button"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-[10px] uppercase tracking-wider text-[#999184] mt-5">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};
