'use client';

import { useMemo } from 'react';

interface WallpaperCanvasProps {
  /** 9:16 portrait image URL (same-origin recommended for reliable export) */
  imageSrc: string;
  /** Small, tasteful title (optional) */
  title?: string;
  /** One grounding line or power phrase (optional) */
  line?: string;
  /** Optional: used for subtle tinting */
  element?: 'fire' | 'earth' | 'air' | 'water';
}

function elementTint(element?: WallpaperCanvasProps['element']) {
  switch (element) {
    case 'fire':
      return { a: 'rgba(244,63,94,0.18)', b: 'rgba(251,191,36,0.10)' }; // rose / amber
    case 'earth':
      return { a: 'rgba(16,185,129,0.14)', b: 'rgba(251,191,36,0.08)' }; // emerald / amber
    case 'air':
      return { a: 'rgba(59,130,246,0.14)', b: 'rgba(168,85,247,0.10)' }; // blue / violet
    case 'water':
      return { a: 'rgba(99,102,241,0.14)', b: 'rgba(236,72,153,0.08)' }; // indigo / pink
    default:
      return { a: 'rgba(168,85,247,0.12)', b: 'rgba(236,72,153,0.08)' }; // violet / pink
  }
}

/**
 * A dedicated, print-worthy 9:16 wallpaper layout intended for DOM->image export.
 * Renders at 1080x1920 (CSS px), and should be exported with scale >= 2 for crisp output.
 */
export default function WallpaperCanvas({ imageSrc, title, line, element }: WallpaperCanvasProps) {
  const tint = useMemo(() => elementTint(element), [element]);

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#0a0a12',
        color: '#ffffff',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {/* Subtle aura background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(900px 900px at 50% 25%, ${tint.a}, transparent 60%),
            radial-gradient(800px 800px at 50% 70%, ${tint.b}, transparent 65%),
            linear-gradient(180deg, rgba(10,10,18,0.0) 0%, rgba(10,10,18,0.55) 55%, rgba(10,10,18,0.88) 100%)
          `,
        }}
      />

      {/* Portrait (primary focal point) */}
      <div
        style={{
          position: 'absolute',
          left: 96,
          right: 96,
          top: 220,
          height: 1180,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 36,
            overflow: 'hidden',
            backgroundColor: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(168,85,247,0.18)',
          }}
        >
          <img
            src={imageSrc}
            alt={title || 'Zodiac portrait'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain', // no cropping
              display: 'block',
            }}
          />
        </div>
      </div>

      {/* Typography block (small, elegant, safe margins) */}
      <div
        style={{
          position: 'absolute',
          left: 110,
          right: 110,
          bottom: 190,
          textAlign: 'center',
        }}
      >
        {title ? (
          <div
            style={{
              fontSize: 34,
              letterSpacing: 0.2,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.92)',
              marginBottom: 22,
            }}
          >
            {title}
          </div>
        ) : null}

        {line ? (
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              fontStyle: 'italic',
              color: 'rgba(220,214,255,0.92)',
              padding: '0 10px',
            }}
          >
            “{line}”
          </div>
        ) : null}
      </div>
    </div>
  );
}


