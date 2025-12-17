'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ZodiacGoddess } from '@/types';

interface UnlockModalProps {
  onClose: () => void;
  onUnlock: (unlocked: boolean) => void;
  email: string;
  setEmail: (email: string) => void;
  goddess: ZodiacGoddess;
}

// API endpoint - Replace with your Formspree endpoint or custom API
// Example Formspree: https://formspree.io/f/YOUR_FORM_ID
const API_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

// Affiliate URL - Replace with your actual affiliate link
const AFFILIATE_URL = 'https://www.etsy.com/shop/your-shop?ref=the-zodiac-mirror';

export default function UnlockModal({ onClose, onUnlock, email, setEmail, goddess }: UnlockModalProps) {
  const [step, setStep] = useState<'email' | 'referral'>('email');
  const [referralCode, setReferralCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    try {
      // Submit email to API endpoint
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          zodiacSign: goddess.sign,
          goddessTitle: goddess.name,
          type: 'email_submission',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit email');
      }

      // Show referral step after successful email submission
      setStep('referral');
    } catch (err) {
      console.error('Error submitting email:', err);
      setError('Failed to submit. Please try again.');
      // Still allow them to continue even if API fails
      setStep('referral');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReferralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Submit email and referral code to API endpoint
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          referralCode: referralCode || 'none',
          zodiacSign: goddess.sign,
          goddessTitle: goddess.name,
          type: 'referral_submission',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      // Unlock after successful submission
      onUnlock(true);
    } catch (err) {
      console.error('Error submitting referral:', err);
      setError('Failed to submit. Please try again.');
      // Still unlock even if API fails
      onUnlock(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnlockWithAffiliate = () => {
    // Open affiliate link in new tab
    window.open(AFFILIATE_URL, '_blank');
    
    // Submit affiliate click tracking
    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email || 'no-email',
        zodiacSign: goddess.sign,
        goddessTitle: goddess.name,
        type: 'affiliate_click',
      }),
    }).catch(err => console.error('Error tracking affiliate click:', err));
    
    // Unlock after affiliate click
    onUnlock(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-mystic-dark border border-purple-500/30 rounded-3xl p-8 max-w-md w-full relative overflow-hidden"
        >
          {/* Background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${goddess.gradient} opacity-10`} />

          <div className="relative z-10">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-purple-300 hover:text-white transition-colors"
            >
              ✕
            </button>

            {step === 'email' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-3xl font-bold mb-4 gradient-text text-center">
                  Save Your Wallpaper
                </h2>
                <p className="text-purple-200 text-center mb-6">
                  Share an email to receive your {goddess.name} wallpaper
                </p>
                {error && (
                  <div className="mb-4 p-3 bg-red-900/30 border border-red-500/30 rounded-xl text-red-300 text-sm text-center">
                    {error}
                  </div>
                )}
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="your@email.com"
                    required
                    disabled={isLoading}
                    className="w-full py-4 px-4 bg-purple-900/40 border border-purple-500/30 rounded-2xl text-white placeholder-purple-400 focus:outline-none focus:border-pink-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: isLoading ? 1 : 1.05 }}
                    whileTap={{ scale: isLoading ? 1 : 0.95 }}
                    disabled={isLoading}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Saving…' : 'Continue'}
                  </motion.button>
                </form>

                <div className="mt-6 pt-6 border-t border-purple-500/30">
                  <p className="text-purple-300 text-sm text-center mb-4">
                    Or explore a related collection:
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleUnlockWithAffiliate}
                    className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full text-white font-bold"
                  >
                    Open crystal collection
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 'referral' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-3xl font-bold mb-4 gradient-text text-center">
                  Add a Referral (Optional)
                </h2>
                <p className="text-purple-200 text-center mb-6">
                  If you have a referral code, you can include it here
                </p>
                {error && (
                  <div className="mb-4 p-3 bg-red-900/30 border border-red-500/30 rounded-xl text-red-300 text-sm text-center">
                    {error}
                  </div>
                )}
                <form onSubmit={handleReferralSubmit} className="space-y-4">
                  <input
                    type="text"
                    value={referralCode}
                    onChange={(e) => {
                      setReferralCode(e.target.value);
                      setError('');
                    }}
                    placeholder="Referral code (optional)"
                    disabled={isLoading}
                    className="w-full py-4 px-4 bg-purple-900/40 border border-purple-500/30 rounded-2xl text-white placeholder-purple-400 focus:outline-none focus:border-pink-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: isLoading ? 1 : 1.05 }}
                    whileTap={{ scale: isLoading ? 1 : 0.95 }}
                    disabled={isLoading}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Saving…' : 'Continue'}
                  </motion.button>
                </form>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

