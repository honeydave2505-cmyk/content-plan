export type Niche =
  | 'fitness'
  | 'food'
  | 'travel'
  | 'fashion'
  | 'tech'
  | 'beauty'
  | 'business'
  | 'education'
  | 'entertainment'
  | 'health'
  | 'lifestyle'
  | 'music'
  | 'photography'
  | 'sports'
  | 'custom';

export type Platform = 'instagram' | 'twitter' | 'linkedin' | 'youtube' | 'tiktok' | 'facebook';

export type ContentType = 'post' | 'story' | 'reel' | 'thread' | 'article' | 'video' | 'carousel';

export interface ContentIdea {
  id: string;
  title: string;
  caption: string;
  hashtags: string[];
  platform: Platform;
  contentType: ContentType;
  callToAction: string;
  bestTimeToPost: string;
  estimatedReach: string;
  engagementTips: string[];
}

export interface ContentPlan {
  id: string;
  niche: string;
  imageAnalysis?: string;
  generatedAt: string;
  ideas: ContentIdea[];
}

export interface ImageAnalysisResult {
  description: string;
  detectedNiche: string;
  suggestedTopics: string[];
  mood: string;
  colors: string[];
}

export interface GenerateContentRequest {
  niche: string;
  imageAnalysis?: string;
  platforms: Platform[];
  contentTypes: ContentType[];
  numberOfIdeas: number;
  targetAudience?: string;
  tone?: string;
}
