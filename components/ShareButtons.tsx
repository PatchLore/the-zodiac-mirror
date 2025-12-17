'use client';

import { motion } from 'framer-motion';
import { ZodiacGoddess } from '@/types';

interface ShareButtonsProps {
  goddess: ZodiacGoddess;
  shareRef: React.RefObject<HTMLDivElement>;
}

export default function ShareButtons({ goddess, shareRef }: ShareButtonsProps) {
  const shareText = `I discovered I'm ${goddess.name} - ${goddess.symbol}\n\n${goddess.powerPhrase}\n\nDiscover your Zodiac Goddess at zodiacauramirror.com`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleTikTokShare = () => {
    // TikTok doesn't have direct share API, so we'll copy to clipboard and show instructions
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      alert('Copied to clipboard! Paste into TikTok to share.');
    }
  };

  const handleInstagramShare = async () => {
    // For Instagram Stories, we need to generate an image
    if (!shareRef.current) return;

    try {
      const canvas = await import('html2canvas').then((mod) => mod.default);
      const imgCanvas = await canvas(shareRef.current, {
        backgroundColor: '#0a0a12',
        scale: 2,
      });
      const url = imgCanvas.toDataURL('image/png');

      // Create a download link for Instagram Stories
      const link = document.createElement('a');
      link.download = `zodiac-aura-${goddess.sign}-story.png`;
      link.href = url;
      link.click();

      alert('Image downloaded! Open Instagram Stories and add this image to share.');
    } catch (error) {
      console.error('Error generating share image:', error);
    }
  };

  const handleReelsShare = async () => {
    // Similar to Instagram Stories
    handleInstagramShare();
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank');
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank');
  };

  return (
    <div className="w-full">
      <div className="text-center text-purple-300 text-sm mb-3">Share Your Aura</div>
      <div className="flex gap-3 justify-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleTikTokShare}
          className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xl hover:bg-gray-800 transition-colors"
          aria-label="Share to TikTok"
        >
          <span className="text-xs font-bold">TT</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleInstagramShare}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white flex items-center justify-center text-xl hover:opacity-90 transition-opacity"
          aria-label="Share to Instagram Stories"
        >
          <span className="text-xs font-bold">IG</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleReelsShare}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center text-xl hover:opacity-90 transition-opacity"
          aria-label="Share to Reels"
        >
          <span className="text-xs font-bold">R</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleTwitterShare}
          className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl hover:bg-blue-600 transition-colors"
          aria-label="Share to Twitter"
        >
          <span className="text-xs font-bold">X</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleFacebookShare}
          className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl hover:bg-blue-700 transition-colors"
          aria-label="Share to Facebook"
        >
          <span className="text-xs font-bold">f</span>
        </motion.button>
      </div>
    </div>
  );
}

