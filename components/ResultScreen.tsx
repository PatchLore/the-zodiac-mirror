'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ZodiacGoddess } from '@/types';
import { goddessProfiles } from '@/data/goddessProfiles';
import html2canvas from 'html2canvas';
import UnlockModal from './UnlockModal';
import ShareSheet from './ShareSheet';
import WallpaperCanvas from './WallpaperCanvas';

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
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copiedPhrase, setCopiedPhrase] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const wallpaperRef = useRef<HTMLDivElement>(null);

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

  const handleCopyPowerPhrase = async () => {
    if (!profile?.powerPhrase) return;
    try {
      await navigator.clipboard.writeText(profile.powerPhrase);
      setCopiedPhrase(true);
      window.setTimeout(() => setCopiedPhrase(false), 1500);
    } catch (e) {
      // Silent failure (no alerts) to keep tone calm
      console.error('Failed to copy power phrase:', e);
    }
  };

  // Randomly select an image from the profile's images array (stable selection)
  const selectedImage = useMemo(() => {
    if (!profile || !profile.images || profile.images.length === 0) {
      return `/Signs/${goddess.sign.charAt(0).toUpperCase() + goddess.sign.slice(1)}.jpg`; // Fallback
    }
    // Select a random image once when component mounts or sign changes
    const randomIndex = Math.floor(Math.random() * profile.images.length);
    return profile.images[randomIndex];
  }, [goddess.sign, profile]);

  const fileSafe = (value: string) =>
    value
      .toLowerCase()
      .replace(/['’"]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  const handleDownloadWallpaper = async () => {
    if (!wallpaperRef.current || !profile) return;
    if (isExporting) return;
    try {
      setIsExporting(true);
      // Wait for fonts (best-effort) to keep text crisp and stable
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fonts = (document as any).fonts;
      if (fonts?.ready) {
        await fonts.ready;
      }

      // Give the browser a moment to layout/paint the off-screen canvas
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Ensure the portrait image is loaded before capture
      const img = wallpaperRef.current.querySelector('img');
      if (img) {
        // `complete` covers cached images; `decode()` helps ensure pixels are ready
        if (!img.complete) {
          await new Promise<void>((resolve) => {
            img.addEventListener('load', () => resolve(), { once: true });
            img.addEventListener('error', () => resolve(), { once: true });
          });
        }
        // decode() is not supported everywhere; best-effort
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decode = (img as any).decode;
        if (typeof decode === 'function') {
          try {
            await decode.call(img);
          } catch {
            // ignore
          }
        }
      }

      const canvas = await html2canvas(wallpaperRef.current, {
        backgroundColor: null,
        scale: 2, // 1080x1920 -> 2160x3840 export
        width: 1080,
        height: 1920,
        useCORS: true,
      });
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `the-zodiac-mirror-${fileSafe(profile.title)}.png`;
      link.href = url;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden">
      {/* Background with gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${goddess.gradient} opacity-20 pointer-events-none`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(107,70,193,0.3),transparent_70%)] pointer-events-none" />

      {/* Animated particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-30 pointer-events-none"
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

        {/* Primary artifact actions (calm, optional) */}
        {profile && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25 }}
            className="w-full max-w-md mb-6"
          >
            <div className="bg-purple-900/10 backdrop-blur-md border border-purple-500/20 rounded-3xl p-5">
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleDownloadWallpaper}
                  disabled={isExporting}
                  className="w-full py-3 px-6 bg-purple-900/25 border border-purple-500/30 rounded-full text-purple-100 text-sm font-medium hover:bg-purple-900/35 transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-mystic-dark"
                >
                  {isExporting ? 'Preparing…' : 'Download Wallpaper'}
                </button>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleCopyPowerPhrase}
                    disabled={isExporting}
                    className="flex-1 py-3 px-4 bg-purple-900/25 border border-purple-500/30 rounded-full text-purple-100 text-sm font-medium hover:bg-purple-900/35 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-mystic-dark"
                  >
                    Copy Reflection
                  </button>
                  <button
                    type="button"
                    onClick={() => setShareOpen(true)}
                    disabled={isExporting}
                    className="flex-1 py-3 px-4 bg-purple-900/25 border border-purple-500/30 rounded-full text-purple-100 text-sm font-medium hover:bg-purple-900/35 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-mystic-dark"
                  >
                    Share
                  </button>
                </div>

                <div className="min-h-[16px] text-center text-xs text-purple-300">
                  {isExporting
                    ? 'Creating a wallpaper image…'
                    : copiedPhrase
                      ? 'Copied'
                      : 'A line to keep from this reflection.'}
                </div>
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
                  Yes, it matched
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
              Personalised Aura Portraits
            </h2>
            <p className="text-purple-300 text-sm text-center mb-3">
              If you’d like a custom portrait inspired by your reflection, you can request a personalised aura image.
            </p>
            <p className="text-purple-300 text-sm text-center mb-5">
              This is a considered, hand-crafted process — not an instant filter.
            </p>
            <a
              href="mailto:zodiacaura@mail.com?subject=Personalised Aura Portrait Request&body=Hi,%0D%0A%0D%0AI'd like to request a personalised aura portrait.%0D%0A%0D%0AName:%0D%0AZodiac Sign:%0D%0AAny notes:%0D%0A%0D%0AThanks"
              className="block w-full py-3 px-6 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full text-white font-semibold shadow-lg shadow-pink-500/30 text-center focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-mystic-dark"
            >
              Request a Personalised Portrait
            </a>
            <p className="text-purple-400/70 text-xs text-center mt-3">
              By requesting a portrait, you agree to the{' '}
              <Link href="/portrait-terms" className="text-pink-300 hover:text-pink-200 underline">
                Personalised Portrait Terms
              </Link>
              .
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1 }}
          className="w-full max-w-sm space-y-3 mb-6"
        >
          <motion.button
            onClick={onReset}
            className="w-full py-3 px-8 bg-transparent border border-purple-500/30 rounded-full text-purple-200 font-semibold hover:bg-purple-900/20 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-mystic-dark"
          >
            Discover Again
          </motion.button>
        </motion.div>
      </div>

      {/* Hidden, dedicated wallpaper renderer (not a screenshot of UI) */}
      {profile && (
        <div
          ref={wallpaperRef}
          style={{
            position: 'fixed',
            top: '-9999px',
            left: '-9999px',
            width: '1080px',
            height: '1920px',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        >
          <WallpaperCanvas
            imageSrc={selectedImage}
            title={profile.title}
            line={profile.powerPhrase}
            element={profile.element}
          />
        </div>
      )}

      {/* Unlock Modal */}
      {showUnlock && (
        <UnlockModal
          onClose={() => setShowUnlock(false)}
          onUnlock={(unlocked) => {
            setShowUnlock(false);
          }}
          email={email}
          setEmail={setEmail}
          goddess={goddess}
        />
      )}

      {/* Share sheet (UI-only) */}
      {profile && (
        <ShareSheet
          open={shareOpen}
          onClose={() => setShareOpen(false)}
          onDownload={handleDownloadWallpaper}
          caption={`The Zodiac Mirror — ${profile.title}\n\n“${profile.powerPhrase}”\n\nthezodiacmirror.com\n\nDesigned for sharing as a story or wallpaper.`}
        />
      )}
    </div>
  );
}

