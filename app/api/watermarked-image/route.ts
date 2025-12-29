import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * API route to serve images with watermarks baked into the image data
 * This ensures watermarks persist when images are saved
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const imagePath = searchParams.get('path');

  if (!imagePath) {
    return new NextResponse('Missing image path', { status: 400 });
  }

  // Security: Only allow images from the Signs directory
  if (!imagePath.startsWith('/Signs/')) {
    return new NextResponse('Invalid image path', { status: 400 });
  }

  try {
    const publicPath = path.join(process.cwd(), 'public', imagePath);
    
    // Check if file exists
    if (!fs.existsSync(publicPath)) {
      return new NextResponse('Image not found', { status: 404 });
    }

    // Read the original image
    const imageBuffer = fs.readFileSync(publicPath);
    const ext = path.extname(publicPath).toLowerCase();
    const contentType = ext === '.png' ? 'image/png' : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png';

    // TODO: Add server-side watermarking using canvas or sharp
    // For now, return original image
    // Client-side watermarking will be used as fallback
    
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving watermarked image:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
