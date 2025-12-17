'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface StartScreenProps {
  onStartQuiz: (name?: string) => void;
  onStartBirthChart: (name?: string) => void;
}

export default function StartScreen({ onStartQuiz, onStartBirthChart }: StartScreenProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [name, setName] = useState('');

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(107,70,193,0.1),transparent_70%)]" />

      {/* Animated stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Logo/Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 text-center mb-12"
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="text-8xl mb-4 glow-effect"
        >
          ✨
        </motion.div>
        <h1 className="text-5xl font-bold mb-4 gradient-text">
          Zodiac Aura
        </h1>
        <h2 className="text-3xl font-light text-purple-300 mb-2">
          Mirror
        </h2>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-purple-400 text-sm mt-4"
        >
          Discover Your Divine Archetype
        </motion.div>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-10 w-full max-w-sm"
      >
        {!showOptions ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowOptions(true)}
            className="w-full py-5 px-8 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-full text-white font-bold text-lg shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            <span className="relative z-10">Begin Aura Reveal</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4 w-full"
          >
            {/* Optional Name Input */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-purple-200 text-sm mb-2 text-center">
                Enter your name (optional)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full py-3 px-4 bg-purple-900/40 backdrop-blur-sm border border-purple-500/30 rounded-2xl text-white placeholder-purple-400 focus:outline-none focus:border-pink-500/50 transition-all text-center"
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onStartQuiz(name.trim() || undefined)}
              className="w-full py-4 px-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold text-base shadow-lg shadow-purple-500/50"
            >
              Take Personality Quiz
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onStartBirthChart(name.trim() || undefined)}
              className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold text-base shadow-lg shadow-blue-500/50"
            >
              Enter Birth Chart
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

