import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Watermark from '@/components/Watermark';

export const metadata: Metadata = {
  title: 'Zodiac Goddess Posters | The Zodiac Mirror',
  description:
    'Download the complete 12-sign Zodiac Goddess digital poster collection. High-resolution digital art prints.',
};

// Zodiac signs in order
const zodiacSigns = [
  { name: 'Aries', sign: 'aries' },
  { name: 'Taurus', sign: 'taurus' },
  { name: 'Gemini', sign: 'gemini' },
  { name: 'Cancer', sign: 'cancer' },
  { name: 'Leo', sign: 'leo' },
  { name: 'Virgo', sign: 'virgo' },
  { name: 'Libra', sign: 'libra' },
  { name: 'Scorpio', sign: 'scorpio' },
  { name: 'Sagittarius', sign: 'sagittarius' },
  { name: 'Capricorn', sign: 'capricorn' },
  { name: 'Aquarius', sign: 'aquarius' },
  { name: 'Pisces', sign: 'pisces' },
];

const PAYHIP_URL = 'https://payhip.com/b/Q0qy6';

// Purchase button component
function PurchaseButton() {
  return (
    <a
      href={PAYHIP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block w-full py-4 px-8 bg-purple-900/25 border border-purple-500/40 rounded-full text-purple-100 text-center font-medium hover:bg-purple-900/35 hover:border-purple-500/60 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-mystic-dark"
      aria-label="Download the complete 12-sign Zodiac Goddess digital poster collection - Digital download"
    >
      Download the complete 12-sign Zodiac Goddess digital poster collection
      <span className="block text-xs text-purple-300/80 mt-1">Digital download</span>
    </a>
  );
}

export default function PostersPage() {
  return (
    <main className="min-h-screen w-full px-6 py-10 text-white">
      <div className="mx-auto max-w-[450px] space-y-8">
        <h1 className="text-3xl font-semibold tracking-tight">Zodiac Goddess Posters</h1>

        <div className="space-y-4 text-sm leading-relaxed text-purple-100/90">
          <p>
            A complete 12-piece fine-art zodiac poster series. Each poster presents a mystical archetypal goddess figure—dreamlike, symbolic, and designed as collectible digital art.
          </p>
        </div>

        {/* Purchase CTA - Top */}
        <div className="pt-4">
          <PurchaseButton />
        </div>

        {/* Poster Grid */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          {zodiacSigns.map(({ name, sign }) => {
            // Handle special case for Sagittarius (using SagittariusBest.png)
            const imagePath = sign === 'sagittarius'
              ? '/Signs/12 Mythical Signs Posters/SagittariusBest.png'
              : `/Signs/12 Mythical Signs Posters/${name}.png`;

            return (
              <div
                key={sign}
                className="relative aspect-[9/16] bg-mystic-dark border border-purple-500/20 rounded-lg overflow-hidden"
                style={{ position: 'relative' }}
              >
                <Image
                  src={imagePath}
                  alt={`${name} Zodiac Goddess Poster`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, 200px"
                  style={{ position: 'absolute', zIndex: 1 }}
                />
                <Watermark />
              </div>
            );
          })}
        </div>

        {/* Purchase CTA - Bottom */}
        <div className="pt-6">
          <PurchaseButton />
        </div>

        {/* Additional Info */}
        <div className="pt-6 border-t border-purple-500/30 text-center">
          <p className="text-purple-300 text-sm">
            High-resolution digital downloads. Print-ready quality.
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

