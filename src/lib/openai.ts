import OpenAI from 'openai';

let openaiClient: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openaiClient;
}

export async function analyzeImageWithAI(base64Image: string, mimeType: string): Promise<{
  description: string;
  detectedNiche: string;
  suggestedTopics: string[];
  mood: string;
  colors: string[];
}> {
  const client = getOpenAIClient();

  const response = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: {
              url: `data:${mimeType};base64,${base64Image}`,
              detail: 'high',
            },
          },
          {
            type: 'text',
            text: `Analyze this image for content marketing purposes. Return a JSON object with these fields:
- description: A concise description of the image (2-3 sentences)
- detectedNiche: The primary content niche (e.g., fitness, food, travel, fashion, tech, beauty, business, education, lifestyle)
- suggestedTopics: An array of 5 specific content topics related to this image
- mood: The overall mood/vibe of the image (e.g., energetic, calm, luxurious, professional, playful)
- colors: An array of 3 dominant colors in the image (use descriptive names)

Return ONLY the JSON object, no additional text.`,
          },
        ],
      },
    ],
    max_tokens: 500,
  });

  const content = response.choices[0]?.message?.content || '{}';
  try {
    return JSON.parse(content);
  } catch {
    return {
      description: content,
      detectedNiche: 'lifestyle',
      suggestedTopics: [],
      mood: 'neutral',
      colors: [],
    };
  }
}

export async function generateContentPlanWithAI(params: {
  niche: string;
  imageAnalysis?: string;
  platforms: string[];
  contentTypes: string[];
  numberOfIdeas: number;
  targetAudience?: string;
  tone?: string;
}): Promise<Array<{
  title: string;
  caption: string;
  hashtags: string[];
  platform: string;
  contentType: string;
  callToAction: string;
  bestTimeToPost: string;
  estimatedReach: string;
  engagementTips: string[];
}>> {
  const client = getOpenAIClient();

  const imageContext = params.imageAnalysis
    ? `\nImage Analysis Context: ${params.imageAnalysis}`
    : '';

  const prompt = `You are an expert social media content strategist specializing in the ${params.niche} niche.

Generate ${params.numberOfIdeas} highly converting content ideas for the following platforms: ${params.platforms.join(', ')}.
Content types to include: ${params.contentTypes.join(', ')}.
Target audience: ${params.targetAudience || 'general audience interested in ' + params.niche}.
Tone: ${params.tone || 'engaging and authentic'}.${imageContext}

IMPORTANT: All content must be SPECIFICALLY tailored to the ${params.niche} niche. Do not generate generic content.

For each idea, return a JSON object in this exact format:
{
  "title": "Catchy content title",
  "caption": "Full engaging caption with emojis (2-3 paragraphs)",
  "hashtags": ["hashtag1", "hashtag2", ...] (10-15 niche-specific hashtags, no # symbol),
  "platform": "one of: ${params.platforms.join(', ')}",
  "contentType": "one of: ${params.contentTypes.join(', ')}",
  "callToAction": "Specific CTA for this content",
  "bestTimeToPost": "Day and time recommendation",
  "estimatedReach": "Estimated reach potential",
  "engagementTips": ["tip1", "tip2", "tip3"] (3 specific engagement boosting tips)
}

Return ONLY a JSON array of ${params.numberOfIdeas} content ideas. No additional text.`;

  const response = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are a world-class content strategist and social media expert with 10+ years of experience in the ${params.niche} industry. You create viral, high-converting content plans that drive real engagement and growth.`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 4000,
    temperature: 0.8,
  });

  const content = response.choices[0]?.message?.content || '[]';
  try {
    return JSON.parse(content);
  } catch {
    return [];
  }
}
