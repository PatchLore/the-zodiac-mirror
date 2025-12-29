'use client';

import { useEffect, useRef, useState } from 'react';

interface WatermarkedImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  fill?: boolean;
}

/**
 * Component that renders an image with a watermark baked into the canvas
 * This ensures the watermark persists when the image is saved
 */
export default function WatermarkedImage({ 
  src, 
  alt, 
  className = '', 
  sizes,
  fill = false 
}: WatermarkedImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    // Function to draw the watermarked image
    const drawWatermarkedImage = () => {
      // Get container dimensions
      const rect = container.getBoundingClientRect();
      const width = rect.width || 400;
      const height = rect.height || 600;

      if (width === 0 || height === 0) {
        // Container not yet sized, retry on next frame
        requestAnimationFrame(drawWatermarkedImage);
        return;
      }

      // Set canvas size to match container (use higher resolution for quality)
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      
      // Set canvas display size
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Load and draw the image
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        try {
          // Calculate scaling to cover canvas (fill entire canvas, may crop)
          const imgAspect = img.width / img.height;
          const canvasAspect = width / height;
          
          // Always draw to fill entire canvas
          const drawX = 0;
          const drawY = 0;
          const drawWidth = width;
          const drawHeight = height;
          
          let sourceX = 0;
          let sourceY = 0;
          let sourceWidth = img.width;
          let sourceHeight = img.height;

          if (imgAspect > canvasAspect) {
            // Image is wider - scale to fill height, crop width from center
            const scale = height / img.height;
            const scaledWidth = img.width * scale;
            // Crop horizontally to match canvas aspect
            sourceWidth = img.width * (canvasAspect / imgAspect);
            sourceX = (img.width - sourceWidth) / 2;
          } else {
            // Image is taller - scale to fill width, crop height from center
            const scale = width / img.width;
            const scaledHeight = img.height * scale;
            // Crop vertically to match canvas aspect
            sourceHeight = img.height * (imgAspect / canvasAspect);
            sourceY = (img.height - sourceHeight) / 2;
          }

          // Draw the image to fill the entire canvas (cover behavior)
          ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, drawX, drawY, drawWidth, drawHeight);

          // Draw watermark - centered
          ctx.save();
          const fontSize = Math.max(14, width * 0.22); // 20-25% of image width
          ctx.font = `${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif`;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.11)'; // White at 11% opacity
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          // Get text metrics for proper centering
          const text = 'ZODIAC MIRROR';
          const textX = width / 2;
          const textY = height / 2;
          
          ctx.fillText(text, textX, textY);
          ctx.restore();

          setImageLoaded(true);
        } catch (err) {
          console.error('Error drawing watermarked image:', err);
          setError(true);
        }
      };

      img.onerror = () => {
        console.error('Error loading image:', src);
        setError(true);
      };

      img.src = src;
    };

    // Initial draw
    requestAnimationFrame(drawWatermarkedImage);
  }, [src]);

  if (error) {
    // Fallback: return a simple div with error message
    return (
      <div className={`${className} flex items-center justify-center bg-mystic-dark text-purple-400 text-sm`}>
        Error loading image
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={fill ? 'absolute inset-0 w-full h-full' : 'relative w-full h-full'}
    >
      <canvas
        ref={canvasRef}
        className={className}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: imageLoaded ? 'block' : 'none',
        }}
        aria-label={alt}
        title={alt}
      />
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-mystic-dark">
          <div className="text-purple-400 text-sm">Loading...</div>
        </div>
      )}
    </div>
  );
}

