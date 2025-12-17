import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zodiac Aura Mirror',
  description: 'Discover your Zodiac Goddess identity through a mystical quiz',
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
      </body>
    </html>
  );
}

