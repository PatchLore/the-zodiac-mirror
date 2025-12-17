import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About The Zodiac Mirror',
  description:
    'The Zodiac Mirror is a calm, archetypal experience that reflects inner qualities through zodiac symbolism and goddess imagery — a mirror for self-reflection, not prediction.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full px-6 py-10 text-white">
      <div className="mx-auto max-w-[450px] space-y-8">
        <h1 className="text-3xl font-semibold tracking-tight">About The Zodiac Mirror</h1>

        <div className="space-y-5 text-sm leading-relaxed text-purple-100/90">
          <h2 className="text-lg font-semibold text-purple-100">About The Zodiac Mirror</h2>

          <p>
            The Zodiac Mirror is a reflective, mythic web experience designed to help people pause and recognise the
            qualities they already carry.
          </p>

          <p>
            Rather than offering predictions or promises, the Mirror presents symbolic archetypes inspired by zodiac
            psychology, mythology, and timeless patterns of human behaviour.
          </p>

          <p>
            The figures shown — often depicted in feminine form — are <strong>archetypal representations</strong>, not
            literal identities. They act as visual mirrors for inner traits such as stillness, resilience, intuition,
            and presence.
          </p>

          <p>
            This experience does not tell you who you should become.
            <br />
            It reflects what is already present.
          </p>

          <p>
            The Zodiac Mirror is intentionally calm, non-gamified, and free from urgency. It exists as a space for
            reflection, not instruction.
          </p>
        </div>
      </div>
    </main>
  );
}


