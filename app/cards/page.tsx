import type { Metadata } from 'next';
import Link from 'next/link';
import { zodiacGoddesses } from '@/data/zodiacGoddesses';

export const metadata: Metadata = {
  title: 'Zodiac Mirror Cards | The Zodiac Mirror',
  description:
    'Zodiac Mirror Cards are quiet artefacts drawn from the same archetypes as the Mirror. Each card holds a single presence.',
};

const zodiacSigns = [
  'aries',
  'taurus',
  'gemini',
  'cancer',
  'leo',
  'virgo',
  'libra',
  'scorpio',
  'sagittarius',
  'capricorn',
  'aquarius',
  'pisces',
];

export default function CardsPage() {
  return (
    <main className="min-h-screen w-full px-6 py-10 text-white">
      <div className="mx-auto max-w-[450px] space-y-8">
        <h1 className="text-3xl font-semibold tracking-tight">Zodiac Mirror Cards</h1>

        <div className="space-y-5 text-sm leading-relaxed text-purple-100/90">
          <p>
            Zodiac Mirror Cards are quiet artefacts drawn from the same archetypes as the Mirror.
          </p>
          <p>
            Each card holds a single presence.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          {zodiacSigns.map((sign) => {
            const goddess = zodiacGoddesses[sign];
            if (!goddess) return null;

            return (
              <div
                key={sign}
                className="relative aspect-[2/3] bg-purple-900/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-4 flex flex-col items-center justify-center overflow-hidden"
              >
                {/* Card background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${goddess.gradient} opacity-5 pointer-events-none`} />
                
                <div className="relative z-10 text-center space-y-3">
                  {/* Zodiac Symbol */}
                  <div className="text-4xl">{goddess.symbol}</div>
                  
                  {/* Goddess Name */}
                  <div className="text-xs font-semibold text-purple-200 uppercase tracking-wide">
                    {sign.charAt(0).toUpperCase() + sign.slice(1)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Coming Soon */}
        <div className="mt-8 pt-6 border-t border-purple-500/30 text-center">
          <p className="text-purple-300 text-sm">
            Coming soon
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[450px] pt-8 border-t border-purple-500/30 mt-8">
        <Link href="/" className="text-purple-300 hover:text-purple-100 text-sm transition-colors">
          ← Back to The Zodiac Mirror
        </Link>
      </div>
    </main>
  );
}

