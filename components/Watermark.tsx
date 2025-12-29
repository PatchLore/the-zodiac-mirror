'use client';

interface WatermarkProps {
  text?: string;
  className?: string;
}

/**
 * Subtle watermark component for thumbnail images
 * Displays centered text with very low opacity
 * DEBUG MODE: Currently set to 12-15% opacity for visibility testing
 */
export default function Watermark({ text = 'ZODIAC MIRROR', className = '' }: WatermarkProps) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <span className="watermark-text watermark-debug">
        {text}
      </span>
    </div>
  );
}

