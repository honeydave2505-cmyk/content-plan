import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export const NICHE_OPTIONS = [
  { value: 'fitness', label: 'Fitness & Wellness', emoji: '💪' },
  { value: 'food', label: 'Food & Cooking', emoji: '🍳' },
  { value: 'travel', label: 'Travel & Adventure', emoji: '✈️' },
  { value: 'fashion', label: 'Fashion & Style', emoji: '👗' },
  { value: 'tech', label: 'Technology', emoji: '💻' },
  { value: 'beauty', label: 'Beauty & Skincare', emoji: '💄' },
  { value: 'business', label: 'Business & Entrepreneurship', emoji: '💼' },
  { value: 'education', label: 'Education & Learning', emoji: '📚' },
  { value: 'entertainment', label: 'Entertainment', emoji: '🎬' },
  { value: 'health', label: 'Health & Nutrition', emoji: '🥗' },
  { value: 'lifestyle', label: 'Lifestyle', emoji: '🌿' },
  { value: 'music', label: 'Music', emoji: '🎵' },
  { value: 'photography', label: 'Photography', emoji: '📸' },
  { value: 'sports', label: 'Sports', emoji: '⚽' },
  { value: 'custom', label: 'Custom Niche', emoji: '✨' },
];

export const PLATFORM_OPTIONS = [
  { value: 'instagram', label: 'Instagram', color: 'from-purple-500 to-pink-500' },
  { value: 'twitter', label: 'Twitter/X', color: 'from-sky-400 to-blue-500' },
  { value: 'linkedin', label: 'LinkedIn', color: 'from-blue-600 to-blue-700' },
  { value: 'youtube', label: 'YouTube', color: 'from-red-500 to-red-600' },
  { value: 'tiktok', label: 'TikTok', color: 'from-gray-800 to-black' },
  { value: 'facebook', label: 'Facebook', color: 'from-blue-500 to-blue-600' },
];

export const CONTENT_TYPE_OPTIONS = [
  { value: 'post', label: 'Post' },
  { value: 'story', label: 'Story' },
  { value: 'reel', label: 'Reel/Short' },
  { value: 'thread', label: 'Thread' },
  { value: 'article', label: 'Article' },
  { value: 'video', label: 'Video' },
  { value: 'carousel', label: 'Carousel' },
];

export const TONE_OPTIONS = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual & Fun' },
  { value: 'inspirational', label: 'Inspirational' },
  { value: 'educational', label: 'Educational' },
  { value: 'humorous', label: 'Humorous' },
  { value: 'storytelling', label: 'Storytelling' },
];
