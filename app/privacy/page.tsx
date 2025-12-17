import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | The Zodiac Mirror',
  description:
    'Privacy policy for The Zodiac Mirror — how we handle your data with clarity and respect.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen w-full px-6 py-10 text-white">
      <div className="mx-auto max-w-[450px] space-y-8">
        <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>

        <div className="space-y-5 text-sm leading-relaxed text-purple-100/90">
          <p className="text-purple-200/80">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-100">Overview</h2>
            <p>
              The Zodiac Mirror is designed to respect your privacy. We collect minimal information and use it only to provide the experience you interact with.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-100">Information We Collect</h2>
            <p>
              When you use The Zodiac Mirror, we may collect:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-purple-200/90">
              <li>Quiz responses and birth chart information you choose to enter</li>
              <li>Basic usage data through Vercel Analytics (anonymized)</li>
              <li>Email addresses only if you request a personalised portrait</li>
            </ul>
            <p>
              We do not use cookies for tracking. We do not sell your data to third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-100">How We Use Your Information</h2>
            <p>
              Quiz responses and birth chart data are processed entirely in your browser. They are not stored on our servers unless you explicitly request a personalised portrait.
            </p>
            <p>
              If you contact us via email for a personalised portrait, we use your email address only to respond to your request.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-100">Third-Party Services</h2>
            <p>
              We use Vercel Analytics to understand how the site is used. This service collects anonymized page view data only. You can learn more about Vercel's privacy practices on their website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-100">Your Rights</h2>
            <p>
              You can use The Zodiac Mirror without providing any personal information. If you have shared your email with us, you can request that we delete it at any time by contacting zodiacaura@mail.com.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-100">Changes to This Policy</h2>
            <p>
              If we update this privacy policy, we will note the change date at the top of this page. Continued use of the site after changes indicates your acceptance of the updated policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-100">Contact</h2>
            <p>
              If you have questions about this privacy policy, please contact us at{' '}
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

