import { NextRequest, NextResponse } from 'next/server';
import { analyzeImageWithAI } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageBase64, mimeType } = body;

    if (!imageBase64 || !mimeType) {
      return NextResponse.json(
        { error: 'imageBase64 and mimeType are required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      // Return mock data when no API key is set (demo mode)
      return NextResponse.json({
        description:
          'A vibrant, high-energy image perfect for social media content. The composition and colors suggest a modern lifestyle brand.',
        detectedNiche: 'lifestyle',
        suggestedTopics: [
          'Behind the scenes of your day',
          'Product showcase with lifestyle context',
          'Inspirational quote pairing',
          'Tutorial or how-to content',
          'Community spotlight',
        ],
        mood: 'energetic',
        colors: ['vibrant blue', 'warm orange', 'clean white'],
      });
    }

    const result = await analyzeImageWithAI(imageBase64, mimeType);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error analyzing image:', error);
    return NextResponse.json(
      { error: 'Failed to analyze image. Please try again.' },
      { status: 500 }
    );
  }
}
