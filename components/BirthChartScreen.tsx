'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { getZodiacFromDate } from '@/data/zodiacGoddesses';
import { zodiacGoddesses } from '@/data/zodiacGoddesses';
import { ZodiacGoddess } from '@/types';

interface BirthChartScreenProps {
  onComplete: (goddess: ZodiacGoddess) => void;
  onBack: () => void;
}

export default function BirthChartScreen({ onComplete, onBack }: BirthChartScreenProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;

    const dateObj = new Date(date);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const sign = getZodiacFromDate(month, day);
    const goddess = zodiacGoddesses[sign];
    if (goddess) {
      onComplete(goddess);
    } else {
      console.error('Invalid zodiac sign:', sign);
      // Fallback to aries if sign is invalid
      const fallbackGoddess = zodiacGoddesses['aries'];
      if (fallbackGoddess) {
        onComplete(fallbackGoddess);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden px-6 py-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-pink-900/30" />

      {/* Header */}
      <div className="relative z-10 mb-8">
        <button
          onClick={onBack}
          className="text-purple-300 mb-6 text-sm flex items-center gap-2"
        >
          ← Back
        </button>
        <h2 className="text-3xl font-bold mb-2 text-center gradient-text">
          Birth Chart Input
        </h2>
        <p className="text-center text-purple-300 text-sm">
          Enter your birth details to reveal your Zodiac Goddess
        </p>
      </div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex-1 flex flex-col"
        onSubmit={handleSubmit}
      >
        <div className="space-y-6 flex-1 flex flex-col justify-center">
          <div>
            <label className="block text-purple-200 text-sm mb-2">Birth Date *</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full py-4 px-4 bg-purple-900/40 backdrop-blur-sm border border-purple-500/30 rounded-2xl text-white focus:outline-none focus:border-pink-500/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-purple-200 text-sm mb-2">Birth Time (optional)</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full py-4 px-4 bg-purple-900/40 backdrop-blur-sm border border-purple-500/30 rounded-2xl text-white focus:outline-none focus:border-pink-500/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-purple-200 text-sm mb-2">Birth Location (optional)</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, Country"
              className="w-full py-4 px-4 bg-purple-900/40 backdrop-blur-sm border border-purple-500/30 rounded-2xl text-white placeholder-purple-400 focus:outline-none focus:border-pink-500/50 transition-all"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!date}
            className="w-full py-5 px-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-bold text-lg shadow-lg shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            Reveal My Aura
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}

