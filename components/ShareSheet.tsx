'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface ShareSheetProps {
  open: boolean;
  onClose: () => void;
  onDownload: () => void | Promise<void>;
  caption: string;
}

export default function ShareSheet({ open, onClose, onDownload, caption }: ShareSheetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCaption = async () => {
    try {
      await navigator.clipboard.writeText(caption);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error('Failed to copy caption:', e);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Share options"
        >
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 left-0 right-0 mx-auto max-w-[450px] rounded-t-3xl border border-purple-500/20 bg-mystic-dark/95 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 text-center">
              <div className="text-lg font-semibold text-purple-100">Share</div>
              <div className="mt-1 text-xs text-purple-300">
                Designed for sharing as a story or wallpaper.
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={onDownload}
                className="w-full py-3 px-6 bg-purple-900/25 border border-purple-500/30 rounded-full text-purple-100 text-sm font-medium hover:bg-purple-900/35 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-mystic-dark"
              >
                Download Wallpaper
              </button>

              <button
                type="button"
                onClick={handleCopyCaption}
                className="w-full py-3 px-6 bg-purple-900/25 border border-purple-500/30 rounded-full text-purple-100 text-sm font-medium hover:bg-purple-900/35 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-mystic-dark"
              >
                Copy Caption
              </button>

              <div className="min-h-[16px] text-center text-xs text-purple-300">
                {copied ? 'Copied' : ''}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 px-6 bg-transparent border border-purple-500/20 rounded-full text-purple-200 text-sm hover:bg-purple-900/20 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-mystic-dark"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


