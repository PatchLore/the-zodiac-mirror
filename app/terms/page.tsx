import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions | The Zodiac Mirror',
  description:
    'Terms and conditions for using The Zodiac Mirror — clear, simple guidelines.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen w-full px-6 py-10 text-white">
      <div className="mx-auto max-w-[450px] space-y-8">
        <h1 className="text-3xl font-semibold tracking-tight">Terms & Conditions</h1>

        <div className="space-y-5 text-sm leading-relaxed text-purple-100/90">
          <p className="text-purple-200/80">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-100">Acceptance of Terms</h2>
            <p>
              By using The Zodiac Mirror, you agree to these terms and conditions. If you do not agree, please do not use the site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-100">Nature of the Experience</h2>
            <p>
              The Zodiac Mirror is a reflective, symbolic experience. It does not provide predictions, guarantees, or factual claims about your future or identity. The archetypes presented are symbolic representations intended for reflection, not instruction.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-100">Use of the Site</h2>
            <p>
              You may use The Zodiac Mirror for personal, non-commercial purposes. You may share your results, but you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-purple-200/90">
              <li>Reproduce or redistribute the site's content for commercial purposes</li>
              <li>Claim ownership of the site's design, imagery, or content</li>
              <li>Use the site in any way that violates applicable laws</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-100">Intellectual Property</h2>
            <p>
              All content on The Zodiac Mirror, including text, images, designs, and code, is owned by The Zodiac Mirror or used with appropriate permissions. You may not copy, modify, or distribute this content without explicit written permission.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-100">Limitation of Liability</h2>
            <p>
              The Zodiac Mirror is provided "as is" without warranties of any kind. We are not liable for any direct, indirect, or consequential damages arising from your use of the site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-100">Changes to Terms</h2>
            <p>
              We may update these terms at any time. The updated date will be noted at the top of this page. Continued use of the site after changes indicates your acceptance of the updated terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-100">Contact</h2>
            <p>
              If you have questions about these terms, please contact us at{' '}
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

