import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Zodiac Mirror — Reflecting the Archetypes Within',
  description:
    'A calm, reflective experience to explore zodiac archetypes through a short quiz or your birth details.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full overflow-x-hidden bg-mystic-dark">
        <div className="mx-auto max-w-[450px] min-h-screen relative flex flex-col">
          <div className="flex-1">{children}</div>
          <footer className="px-6 pb-8 pt-6 text-xs text-purple-300/80">
            <nav className="flex items-center justify-center flex-wrap gap-x-5 gap-y-2">
              <Link href="/about" className="hover:text-purple-100 transition-colors">
                About
              </Link>
              <span className="text-purple-500/40" aria-hidden="true">
                •
              </span>
              <Link href="/faq" className="hover:text-purple-100 transition-colors">
                FAQ
              </Link>
              <span className="text-purple-500/40" aria-hidden="true">
                •
              </span>
              <Link href="/privacy" className="hover:text-purple-100 transition-colors">
                Privacy
              </Link>
              <span className="text-purple-500/40" aria-hidden="true">
                •
              </span>
              <Link href="/terms" className="hover:text-purple-100 transition-colors">
                Terms
              </Link>
              <span className="text-purple-500/40" aria-hidden="true">
                •
              </span>
              <Link href="/portrait-terms" className="hover:text-purple-100 transition-colors">
                Portrait Terms
              </Link>
            </nav>
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  );
}

