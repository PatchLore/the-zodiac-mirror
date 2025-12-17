import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Answers to common questions about The Zodiac Mirror, its tone, symbolism, and how to use it as a reflective experience.',
};

export default function FAQPage() {
  return (
    <main className="min-h-screen w-full px-6 py-10 text-white">
      <div className="mx-auto max-w-[450px] space-y-8">
        <h1 className="text-3xl font-semibold tracking-tight">Frequently Asked Questions</h1>

        <div className="space-y-6 text-sm leading-relaxed text-purple-100/90">
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-purple-100">Is The Zodiac Mirror only for women?</h2>
            <p>
              No. The imagery used in The Zodiac Mirror is symbolic and archetypal. Feminine forms are used to represent
              inner qualities, not gender roles. Anyone who resonates with the experience is welcome to explore it.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-purple-100">Is this astrology or fortune-telling?</h2>
            <p>
              The Zodiac Mirror is not predictive. It does not offer forecasts, guarantees, or future outcomes. Instead,
              it uses zodiac symbolism as a reflective framework — a mirror rather than a prophecy.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-purple-100">Why are goddesses used instead of gods?</h2>
            <p>
              Goddess imagery has historically been associated with introspection, intuition, and presence. In The Zodiac
              Mirror, these figures are used as symbolic forms to express psychological and emotional archetypes, not
              religious or literal identities.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-purple-100">Does this use artificial intelligence?</h2>
            <p>
              Some visuals are created or enhanced using AI-assisted tools, combined with careful curation and human
              design decisions. The focus is always on meaning, tone, and clarity — not automation for its own sake.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-purple-100">Will this tell me who I am?</h2>
            <p>
              No. The Zodiac Mirror does not label or define you. It offers a symbolic reflection — something to notice,
              not something to obey.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}


