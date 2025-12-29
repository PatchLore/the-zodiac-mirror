'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function PortraitPage() {
  // Render PayPal hosted button
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const paypalAny = (window as any).paypal;
    if (!paypalAny?.HostedButtons) return;

    paypalAny.HostedButtons({
      hostedButtonId: 'DRQT4AJREA3WN',
    }).render('#paypal-container-DRQT4AJREA3WN');
  }, []);

  return (
    <main className="min-h-screen w-full px-6 py-10 text-white">
      <div className="mx-auto max-w-[450px] space-y-8">
        <div>
          <Link href="/" className="text-purple-300 hover:text-purple-100 text-sm transition-colors mb-4 inline-block">
            ← Back to The Zodiac Mirror
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight">Personalised Portrait</h1>
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-purple-100/90">
          <p>
            Commission a personalised Zodiac Mirror portrait—a hand-crafted digital artwork inspired by your reflection.
          </p>
          <p>
            This is a considered, hand-crafted process—not an instant filter.
          </p>
        </div>

        <div className="bg-purple-900/20 backdrop-blur-md border border-purple-500/30 rounded-3xl p-6">
          <h2 className="text-xl font-semibold text-purple-200 mb-3 text-center">
            What's Included
          </h2>
          <ul className="space-y-3 text-purple-300/90 text-sm">
            <li className="flex items-start">
              <span className="text-pink-300 mr-2">•</span>
              <span>A personalised portrait image</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-300 mr-2">•</span>
              <span>A short living portrait where the aura subtly moves</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-300 mr-2">•</span>
              <span>A curated soundtrack of 10 tracks inspired by your reflection</span>
            </li>
          </ul>
        </div>

        <div className="bg-purple-900/20 backdrop-blur-md border border-purple-500/30 rounded-3xl p-6">
          <h2 className="text-xl font-semibold text-purple-200 mb-3 text-center">
            How It Works
          </h2>
          <div className="space-y-4 text-purple-300/90 text-sm">
            <p>
              Send your photo to{' '}
              <a href="mailto:zodiacaura@mail.com" className="text-pink-300 hover:text-pink-200 underline">
                zodiacaura@mail.com
              </a>
              . You'll be guided with a few gentle questions by email.
            </p>
            <p>
              Your portrait, living portrait, and soundtrack are created individually, inspired by your reflection and responses.
            </p>
            <p>
              All three elements are delivered privately by email.
            </p>
          </div>
        </div>

        <div className="bg-purple-900/20 backdrop-blur-md border border-purple-500/30 rounded-3xl p-6">
          <h2 className="text-xl font-semibold text-purple-200 mb-3 text-center">
            Request Your Portrait
          </h2>
          <p className="text-purple-300 text-sm text-center mb-5">
            Pay for a personalised portrait. Created individually and delivered privately.
          </p>
          <div
            id="paypal-container-DRQT4AJREA3WN"
            className="mt-4"
            aria-label="PayPal payment for personalised portrait"
          />
          <p className="text-purple-400/70 text-xs text-center mt-4">
            By paying, you agree to the{' '}
            <Link href="/portrait-terms" className="text-pink-300 hover:text-pink-200 underline">
              Personalised Portrait Terms
            </Link>
            .
          </p>
        </div>

        <div className="bg-purple-900/10 backdrop-blur-md border border-purple-500/20 rounded-3xl p-5">
          <h3 className="text-purple-200 text-sm font-semibold text-center mb-3">
            What happens next
          </h3>
          <ul className="space-y-2 text-purple-300/90 text-xs">
            <li className="flex items-start">
              <span className="text-pink-300 mr-2">•</span>
              <span>Send your photo to{' '}
                <a href="mailto:zodiacaura@mail.com" className="text-pink-300 hover:text-pink-200 underline">
                  zodiacaura@mail.com
                </a>
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-300 mr-2">•</span>
              <span>Your portrait, living portrait, and soundtrack are created individually</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-300 mr-2">•</span>
              <span>Inspired by your reflection and responses</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-300 mr-2">•</span>
              <span>All three elements delivered privately by email</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
