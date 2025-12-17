import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Personalised Portrait Terms | The Zodiac Mirror',
  description:
    'Terms and conditions for requesting personalised aura portraits from The Zodiac Mirror.',
};

export default function PortraitTermsPage() {
  return (
    <main className="min-h-screen w-full px-6 py-10 text-white">
      <div className="mx-auto max-w-[450px] space-y-8">
        <h1 className="text-3xl font-semibold tracking-tight">Personalised Portrait Terms</h1>

        <div className="space-y-5 text-sm leading-relaxed text-purple-100/90">
          <p className="text-purple-200/80">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-100">Overview</h2>
            <p>
              These terms apply specifically to requests for personalised aura portraits. By requesting a portrait, you agree to these terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-100">Request Process</h2>
            <p>
              Personalised portraits are hand-crafted, considered works — not instant filters or automated products. Each request is reviewed individually, and completion timelines may vary.
            </p>
            <p>
              Submitting a request does not guarantee that a portrait will be created. We reserve the right to decline requests at our discretion.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-100">What You Provide</h2>
            <p>
              When you request a personalised portrait, you may be asked to provide:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-purple-200/90">
              <li>Your name and email address</li>
              <li>Your zodiac sign or archetypal reflection</li>
              <li>Optional notes or preferences</li>
              <li>If requested, a photograph of yourself</li>
            </ul>
            <p>
              You represent that any photograph or information you provide is your own, or that you have permission to share it.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-100">Ownership & Usage Rights</h2>
            <p>
              If a personalised portrait is created for you, you receive a personal, non-exclusive license to use it for personal purposes. You may share it on social media or use it as a wallpaper, but you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-purple-200/90">
              <li>Resell or commercially exploit the portrait</li>
              <li>Claim ownership of the artistic work</li>
              <li>Modify the portrait and claim it as your own creation</li>
            </ul>
            <p>
              The Zodiac Mirror retains all rights to the artistic work itself.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-100">Pricing & Payment</h2>
            <p>
              Details regarding pricing, if applicable, will be communicated directly when your request is reviewed. Payment terms, if any, will be agreed upon before work begins.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-100">Privacy</h2>
            <p>
              Any photographs or personal information you share for a portrait request will be used solely for the purpose of creating your portrait. We do not share your images or information with third parties. For more details, see our{' '}
              <Link href="/privacy" className="text-pink-300 hover:text-pink-200 underline">
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-100">Limitation of Liability</h2>
            <p>
              Personalised portraits are creative works. While we strive to create meaningful reflections, we are not liable for any dissatisfaction with the final result beyond our stated commitments.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-100">Contact</h2>
            <p>
              For questions about personalised portraits, please contact us at{' '}
              <a href="mailto:zodiacaura@mail.com" className="text-pink-300 hover:text-pink-200 underline">
                zodiacaura@mail.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="pt-6 border-t border-purple-500/30">
          <Link href="/" className="text-purple-300 hover:text-purple-100 text-sm transition-colors">
            ← Back to The Zodiac Mirror
          </Link>
        </div>
      </div>
    </main>
  );
}

