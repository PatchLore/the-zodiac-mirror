'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

interface HomePageProps {
  onStartQuiz: (name?: string) => void;
  onStartBirthChart: (name?: string) => void;
  onRevisitReflection?: () => void;
  onExploreAnother?: () => void;
  savedGoddessName?: string;
}

export default function HomePage({
  onStartQuiz,
  onStartBirthChart,
  onRevisitReflection,
  onExploreAnother,
  savedGoddessName,
}: HomePageProps) {
  const [showQuizOptions, setShowQuizOptions] = useState(false);
  const [name, setName] = useState('');

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-6 py-10">
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

      <div className="relative z-10 w-full max-w-sm space-y-8">
        {/* Logo/Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center"
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
            ✦
          </motion.div>
          <h1 className="text-5xl font-bold mb-4 gradient-text">
            The Zodiac Mirror
          </h1>
          <h2 className="text-xl font-light text-purple-300 mb-2 tracking-wide">
            Reflecting the Archetypes Within
          </h2>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-purple-400 text-sm mt-4"
          >
            A calm space to explore your archetypal resonance
          </motion.div>
        </motion.div>

        {/* Returning User Panel */}
        {savedGoddessName && onRevisitReflection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-purple-900/20 backdrop-blur-md border border-purple-500/30 rounded-3xl p-6"
          >
            <p className="text-purple-200 text-center mb-4">
              Welcome back{savedGoddessName ? `, ${savedGoddessName}` : ''}
            </p>
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onRevisitReflection}
                className="w-full py-3 px-6 bg-purple-900/40 border border-purple-500/30 rounded-full text-purple-100 text-sm font-medium hover:bg-purple-800/50 transition-all"
              >
                Revisit My Reflection
              </motion.button>
              {onExploreAnother && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onExploreAnother}
                  className="w-full py-3 px-6 bg-transparent border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium hover:bg-purple-900/20 transition-all"
                >
                  Explore Another Goddess
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* Main Entry Paths */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="space-y-4"
        >
          {/* Entry Path 1: Explore Your Zodiac Aura */}
          {!showQuizOptions ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowQuizOptions(true)}
              className="w-full py-4 px-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold text-base shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all"
            >
              Explore Your Zodiac Aura
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-3"
            >
              {/* Optional Name Input */}
              <div>
                <label className="block text-purple-200 text-xs mb-2 text-center">
                  Enter your name (optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full py-3 px-4 bg-purple-900/40 backdrop-blur-sm border border-purple-500/30 rounded-2xl text-white placeholder-purple-400 focus:outline-none focus:border-pink-500/50 transition-all text-center text-sm"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onStartQuiz(name.trim() || undefined)}
                className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold text-sm shadow-lg shadow-purple-500/50"
              >
                Take Personality Quiz
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onStartBirthChart(name.trim() || undefined)}
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold text-sm shadow-lg shadow-blue-500/50"
              >
                Enter Birth Chart
              </motion.button>
            </motion.div>
          )}

          {/* Entry Path 2: Browse Collection */}
          <Link href="/posters">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-8 bg-purple-900/25 border border-purple-500/40 rounded-full text-purple-100 text-base font-medium hover:bg-purple-900/35 hover:border-purple-500/60 transition-all"
            >
              Browse the Zodiac Goddess Collection
            </motion.button>
          </Link>

          {/* Entry Path 3: Commission Portrait */}
          <Link href="/portrait">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-8 bg-purple-900/25 border border-purple-500/40 rounded-full text-purple-100 text-base font-medium hover:bg-purple-900/35 hover:border-purple-500/60 transition-all"
            >
              Commission a Personalised Portrait
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
