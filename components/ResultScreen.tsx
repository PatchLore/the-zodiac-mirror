'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import { ZodiacGoddess } from '@/types';
import { goddessProfiles } from '@/data/goddessProfiles';
import html2canvas from 'html2canvas';
import ShareButtons from './ShareButtons';
import UnlockModal from './UnlockModal';

type ResultSource = 'quiz' | 'birthchart';

interface ResultScreenProps {
  goddess: ZodiacGoddess;
  birthSign?: string; // Optional birth sign for comparison
  userName?: string; // Optional user name
  resultSource?: ResultSource; // Source of the result (quiz or birthchart)
  onReset: () => void;
  onViewBirthSign?: (sign: string) => void; // Callback to view birth sign goddess
}

export default function ResultScreen({ goddess, birthSign, userName, resultSource, onReset, onViewBirthSign }: ResultScreenProps) {
  const isFromQuiz = resultSource === 'quiz';
  const [showUnlock, setShowUnlock] = useState(false);
  const [email, setEmail] = useState('');
  const [hasUnlocked, setHasUnlocked] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  const handleFeedback = (feedback: string) => {
    // In production, send feedback to your API
    console.log('Feedback:', feedback, 'for sign:', goddess.sign);
    setFeedbackSubmitted(true);
    // You could send this to your analytics or backend
  };

  const handleCreateGoddessImage = () => {
    // In production, this could open a modal or navigate to an image upload page
    // For now, we'll use the email collection flow
    setShowUnlock(true);
  };

  // Find matching profile from goddessProfiles
  const profile = useMemo(() => {
    return goddessProfiles.find(p => p.sign === goddess.sign);
  }, [goddess.sign]);

  // Randomly select an image from the profile's images array (stable selection)
  const selectedImage = useMemo(() => {
    if (!profile || !profile.images || profile.images.length === 0) {
      return `/Signs/${goddess.sign.charAt(0).toUpperCase() + goddess.sign.slice(1)}.jpg`; // Fallback
    }
    // Select a random image once when component mounts or sign changes
    const randomIndex = Math.floor(Math.random() * profile.images.length);
    return profile.images[randomIndex];
  }, [goddess.sign, profile]);

  const handleDownloadWallpaper = async () => {
    if (!shareRef.current) return;

    if (!hasUnlocked) {
      setShowUnlock(true);
      return;
    }

    try {
      const canvas = await html2canvas(shareRef.current, {
        backgroundColor: '#0a0a12',
        scale: 2,
      });
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `zodiac-aura-${goddess.sign}.png`;
      link.href = url;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden">
      {/* Background with gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${goddess.gradient} opacity-20`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(107,70,193,0.3),transparent_70%)]" />

      {/* Animated particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-8 overflow-y-auto">
        {profile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            {/* Styled Result Card */}
            <div className="bg-purple-900/20 backdrop-blur-md border border-purple-500/30 rounded-3xl p-8 shadow-2xl shadow-purple-900/50 relative overflow-hidden">
              {/* Card background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${goddess.gradient} opacity-5`} />
              
              <div className="relative z-10">
                {/* Zodiac Goddess Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="relative w-full mb-6 rounded-2xl overflow-hidden"
                >
                  <div className="relative aspect-[9/16] w-full bg-purple-950/30">
                    <Image
                      src={selectedImage}
                      alt={profile.title}
                      fill
                      className="object-contain rounded-2xl"
                      sizes="(max-width: 768px) 100vw, 400px"
                      priority
                    />
                    {/* Gradient overlay for mystical effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-purple-900/30 opacity-30 rounded-2xl pointer-events-none" />
                  </div>
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 rounded-2xl border border-purple-500/30 shadow-lg shadow-purple-500/20 pointer-events-none" />
                </motion.div>

                {/* Zodiac Symbol - Glowing Animation */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                  className="text-center mb-6"
                >
                  <motion.div
                    animate={{
                      filter: [
                        'drop-shadow(0 0 20px rgba(235, 72, 153, 0.8))',
                        'drop-shadow(0 0 40px rgba(107, 70, 193, 0.8))',
                        'drop-shadow(0 0 20px rgba(235, 72, 153, 0.8))',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-8xl inline-block"
                  >
                    {goddess.symbol}
                  </motion.div>
                </motion.div>

                {/* Goddess Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold mb-2 text-center gradient-text"
                >
                  {userName ? `${userName}, you are aligned with the ${profile.title}` : `You are aligned with the ${profile.title}`}
                </motion.h1>

                {/* Aura Gradient */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center mb-6"
                >
                  <div className="text-purple-300 text-base mb-2">
                    <span className="font-semibold text-purple-200">Aura:</span>{' '}
                    <span className="text-pink-300">{profile.auraGradient}</span>
                  </div>
                  <div className="text-purple-300 text-base">
                    <span className="font-semibold text-purple-200">Element:</span>{' '}
                    <span className="capitalize text-blue-300">{profile.element}</span>
                  </div>
                </motion.div>

                {/* Power Phrase */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="text-center mb-6"
                >
                  <div className="bg-purple-900/40 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-4">
                    <p className="text-purple-200 italic text-lg font-light leading-relaxed">
                      "{profile.powerPhrase}"
                    </p>
                  </div>
                </motion.div>

                {/* Traits */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="mb-6"
                >
                  <div className="text-purple-200 text-sm font-semibold mb-3 text-center">Traits</div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {profile.traits.map((trait, index) => (
                      <motion.span
                        key={trait}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                        className="px-3 py-1.5 bg-purple-900/50 backdrop-blur-sm border border-purple-500/40 rounded-full text-xs text-purple-200"
                      >
                        {trait}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="text-center mb-6"
                >
                  <p className="text-purple-200 leading-relaxed text-sm mb-3">
                    {profile.description}
                  </p>
                  <p className="text-purple-300 text-xs italic">
                    You carry the energy of {profile.traits.join(', ').toLowerCase()} — the {profile.element} archetype of {goddess.sign.charAt(0).toUpperCase() + goddess.sign.slice(1)}.
                  </p>
                </motion.div>

                {/* Note about zodiac sign match (only for quiz results) */}
                {isFromQuiz && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 }}
                    className="text-center mb-6"
                  >
                    <p className="text-gray-400 text-xs italic">
                      This may not be your zodiac sign — but it reflects your soul's current resonance.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Feedback Section (only for quiz results) */}
        {isFromQuiz && !feedbackSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="w-full max-w-md mb-6"
          >
            <div className="bg-purple-900/20 backdrop-blur-md border border-purple-500/30 rounded-3xl p-6">
              <h2 className="text-xl font-semibold text-purple-200 mb-4 text-center">
                Did your result match your sign?
              </h2>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleFeedback('matched')}
                  className="w-full py-3 px-6 bg-purple-900/40 border border-purple-500/30 rounded-full text-purple-200 text-sm hover:bg-purple-800/50 transition-all"
                >
                  Yes, it matched!
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleFeedback('feels-right')}
                  className="w-full py-3 px-6 bg-purple-900/40 border border-purple-500/30 rounded-full text-purple-200 text-sm hover:bg-purple-800/50 transition-all"
                >
                  No, but it feels right
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleFeedback('explore-more')}
                  className="w-full py-3 px-6 bg-purple-900/40 border border-purple-500/30 rounded-full text-purple-200 text-sm hover:bg-purple-800/50 transition-all"
                >
                  Not sure — I want to explore more
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA: Compare with birth sign */}
        {birthSign && birthSign !== goddess.sign && onViewBirthSign && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 }}
            className="w-full max-w-md mb-6"
          >
            <div className="bg-blue-900/20 backdrop-blur-md border border-blue-500/30 rounded-3xl p-6 text-center">
              <p className="text-blue-200 text-sm mb-4">
                Curious how your birth sign goddess compares?
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onViewBirthSign(birthSign)}
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold shadow-lg shadow-blue-500/50"
              >
                Reveal My Birth Sign Goddess
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* CTA: Create Your Own Goddess Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9 }}
          className="w-full max-w-md mb-6"
        >
          <div className="bg-purple-900/20 backdrop-blur-md border border-purple-500/30 rounded-3xl p-6">
            <h2 className="text-xl font-semibold text-purple-200 mb-3 text-center">
              Want to see yourself as a goddess?
            </h2>
            <p className="text-purple-300 text-sm text-center mb-4">
              Send us a photo and we'll transform it into your own personalized aura portrait.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreateGoddessImage}
              className="w-full py-3 px-6 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full text-white font-semibold shadow-lg shadow-pink-500/50"
            >
              Create My Goddess Image
            </motion.button>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1 }}
          className="w-full max-w-sm space-y-4 mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadWallpaper}
            className="w-full py-4 px-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold text-lg shadow-lg shadow-purple-500/50"
          >
            {hasUnlocked ? 'Download Wallpaper' : 'Unlock Wallpaper'}
          </motion.button>

          <ShareButtons goddess={goddess} shareRef={shareRef} />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="w-full py-3 px-8 bg-purple-900/40 border border-purple-500/30 rounded-full text-purple-200 font-semibold"
          >
            Discover Again
          </motion.button>
        </motion.div>
      </div>

      {/* Hidden shareable content for image generation */}
      {profile && (
        <div ref={shareRef} className="absolute -top-[9999px] left-0 w-full max-w-[450px] aspect-[9/16] bg-mystic-dark p-8 flex flex-col items-center justify-center">
          <div className={`bg-gradient-to-br ${goddess.gradient} opacity-20 absolute inset-0`} />
          <div className="relative z-10 text-center w-full">
            {/* Image for shareable content */}
            <div className="relative w-full mb-6 rounded-2xl overflow-hidden">
              <div className="relative aspect-[9/16] w-full bg-purple-950/30">
                <img
                  src={selectedImage}
                  alt={profile.title}
                  className="w-full h-full rounded-2xl object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/30 opacity-30 rounded-2xl pointer-events-none" />
              </div>
            </div>
            <div className="text-9xl mb-4">{goddess.symbol}</div>
            <h1 className="text-4xl font-bold mb-3 text-white">{profile.title}</h1>
            <div className="text-xl text-purple-300 mb-3">{profile.auraGradient}</div>
            <div className="text-lg text-purple-200 italic">"{profile.powerPhrase}"</div>
          </div>
        </div>
      )}

      {/* Unlock Modal */}
      {showUnlock && (
        <UnlockModal
          onClose={() => setShowUnlock(false)}
          onUnlock={(unlocked) => {
            setHasUnlocked(unlocked);
            setShowUnlock(false);
          }}
          email={email}
          setEmail={setEmail}
          goddess={goddess}
        />
      )}
    </div>
  );
}

