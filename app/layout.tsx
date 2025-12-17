import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
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
        <div className="mx-auto max-w-[450px] min-h-screen relative">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}

