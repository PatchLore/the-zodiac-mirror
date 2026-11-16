import type { Metadata } from 'next';
import Link from 'next/link';
import WatermarkedImage from '@/components/WatermarkedImage';

export const metadata: Metadata = {
  title: 'Zodiac Goddess Posters | The Zodiac Mirror',
  description:
    'Two complete 12-sign Zodiac Goddess digital poster collections: an Art Nouveau tarot-style set and an ancient-world set. Digital downloads for personal use.',
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

interface Collection {
  id: string;
  title: string;
  description: string;
  details: string;
  url: string;
  buttonLabel: string;
  price: string;
  imagePath: (name: string, sign: string) => string;
}

const collections: Collection[] = [
  {
    id: 'art-nouveau',
    title: 'Art Nouveau Collection',
    description:
      'Twelve goddesses in a gold-framed tarot style, each seated beneath a glowing full moon with her sign’s symbol above.',
    details: '12 JPG posters · 2304 × 3456 px · print-ready up to 12×18 in',
    url: 'https://payhip.com/b/O8biG',
    buttonLabel: 'Download the Art Nouveau collection',
    price: '£15',
    imagePath: (name) => `/Signs/art-nouveau/${name}.jpg`,
  },
  {
    id: 'ancient-world',
    title: 'Ancient-World Collection',
    description:
      'Twelve painterly goddess portraits inspired by ancient civilizations, from Mesopotamia and Egypt to Greece and Rome.',
    details: '12 JPG posters · 1920 × 2880 px · good for prints up to 12×18 in',
    url: 'https://payhip.com/b/Q0qy6',
    buttonLabel: 'Download the Ancient-World collection',
    price: '£9',
    imagePath: (name, sign) =>
      // Sagittarius uses SagittariusBest.png
      sign === 'sagittarius'
        ? '/Signs/12 Mythical Signs Posters/SagittariusBest.png'
        : `/Signs/12 Mythical Signs Posters/${name}.png`,
  },
];

// Purchase button component
function PurchaseButton({ collection }: { collection: Collection }) {
  return (
    <a
      href={collection.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block w-full py-4 px-8 bg-purple-900/25 border border-purple-500/40 rounded-full text-purple-100 text-center font-medium hover:bg-purple-900/35 hover:border-purple-500/60 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-mystic-dark"
      aria-label={`${collection.buttonLabel} - Digital download, ${collection.price}`}
    >
      {collection.buttonLabel}
      <span className="block text-xs text-purple-300/80 mt-1">Digital download · {collection.price}</span>
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
            Two complete twelve-sign poster collections. Each poster presents a mystical archetypal goddess figure—dreamlike, symbolic, and designed as collectible digital art.
          </p>
        </div>

        {collections.map((collection) => (
          <section key={collection.id} className="space-y-6 pt-6 border-t border-purple-500/30" aria-labelledby={`${collection.id}-heading`}>
            <div className="space-y-3">
              <h2 id={`${collection.id}-heading`} className="text-xl font-semibold tracking-tight">
                {collection.title}
              </h2>
              <p className="text-sm leading-relaxed text-purple-100/90">{collection.description}</p>
              <p className="text-xs text-purple-300/80">{collection.details}</p>
            </div>

            <PurchaseButton collection={collection} />

            {/* Poster Grid */}
            <div className="grid grid-cols-2 gap-4">
              {zodiacSigns.map(({ name, sign }) => (
                <div
                  key={sign}
                  className="relative aspect-[2/3] bg-mystic-dark border border-purple-500/20 rounded-lg overflow-hidden"
                >
                  <WatermarkedImage
                    src={collection.imagePath(name, sign)}
                    alt={`${name} Zodiac Goddess Poster - ${collection.title}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 50vw, 200px"
                  />
                </div>
              ))}
            </div>

            <PurchaseButton collection={collection} />
          </section>
        ))}

        {/* Additional Info */}
        <div className="pt-6 border-t border-purple-500/30 text-center">
          <p className="text-purple-300 text-sm">
            High-resolution digital downloads for personal use. Sizes and print guidance are listed with each collection.
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
