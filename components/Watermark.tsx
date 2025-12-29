'use client';

interface WatermarkProps {
  text?: string;
  className?: string;
}

/**
 * Subtle watermark component for thumbnail images
 * Displays centered text with very low opacity
 */
export default function Watermark({ text = 'ZODIAC MIRROR', className = '' }: WatermarkProps) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <span className="watermark-text">
        {text}
      </span>
    </div>
  );
}

