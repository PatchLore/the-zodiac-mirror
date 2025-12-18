import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { goddessProfiles } from '@/data/goddessProfiles';

export const metadata: Metadata = {
  title: 'Zodiac Mirror Cards | The Zodiac Mirror',
  description:
    'Quiet artifacts drawn from the same archetypes as the Mirror. Each card holds a single presence.',
};

export default function CardsPage() {
  return (
    <main className="min-h-screen w-full px-6 py-10 text-white">
      <div className="mx-auto max-w-[450px] space-y-8">
        <h1 className="text-3xl font-semibold tracking-tight">Zodiac Mirror Cards</h1>

        <div className="space-y-4 text-sm leading-relaxed text-purple-100/90">
          <p>
            Quiet artifacts drawn from the same archetypes as the Mirror.
          </p>
          <p>
            Each card holds a single presence.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          {goddessProfiles.map((profile) => {
            const imagePath = profile.images && profile.images.length > 0 
              ? profile.images[0] 
              : `/Signs/${profile.sign.charAt(0).toUpperCase() + profile.sign.slice(1)}.jpg`;

            return (
              <div
                key={profile.sign}
                className="relative aspect-[2/3] bg-mystic-dark border border-purple-500/20 rounded-lg overflow-hidden"
              >
                <Image
                  src={imagePath}
                  alt={profile.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 200px"
                />
              </div>
            );
          })}
        </div>

        {/* Mirror Cards Section */}
        <div className="mt-8 pt-8 border-t border-purple-500/30">
          <h2 className="text-xl font-semibold text-purple-200 mb-4">
            Mirror Cards
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-purple-100/90 mb-4">
            <p>
              Mirror Cards are a reflective edition of Zodiac Mirror Cards.
            </p>
            <p>
              Each card presents an archetype on one side, and a mirror on the other — inviting recognition rather than interpretation.
            </p>
          </div>
          <p className="text-purple-300 text-xs">
            A reflective edition is in preparation.
          </p>
        </div>

        {/* Closing line */}
        <div className="mt-8 pt-6 border-t border-purple-500/30 text-center">
          <p className="text-purple-300 text-sm">
            Digital and physical editions are being prepared.
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

