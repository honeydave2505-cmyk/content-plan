/** Supported content niches */
export type Niche =
  | "fitness"
  | "food"
  | "travel"
  | "fashion"
  | "tech"
  | "business"
  | "education"
  | "lifestyle"
  | "health"
  | "finance";

/** Metadata for a niche option shown in the selection UI */
export interface NicheOption {
  id: Niche;
  label: string;
  description: string;
  icon: string; // emoji
}

/** Platforms the generated content can target */
export type Platform =
  | "instagram"
  | "twitter"
  | "linkedin"
  | "facebook"
  | "tiktok"
  | "youtube"
  | "blog";

/** A single piece of generated content */
export interface GeneratedContent {
  id: string;
  title: string;
  body: string;
  hashtags: string[];
  platform: Platform;
  niche: Niche;
  imageUrl?: string;
  createdAt: string;
  scheduledFor?: string;
}

/** Calendar event representing a scheduled post */
export interface CalendarEvent {
  id: string;
  contentId: string;
  title: string;
  date: string; // ISO date
  platform: Platform;
  status: "draft" | "scheduled" | "published";
}

/** Request body for the content generation API */
export interface GenerateRequest {
  niche: Niche;
  platform: Platform;
  imageBase64?: string;
  imageDescription?: string;
  tone?: "professional" | "casual" | "humorous" | "inspirational";
  keywords?: string[];
}

/** Response from the content generation API */
export interface GenerateResponse {
  content: GeneratedContent;
}

/** Dashboard analytics summary */
export interface AnalyticsSummary {
  totalPosts: number;
  scheduledPosts: number;
  publishedPosts: number;
  drafts: number;
  topPlatform: Platform;
  topNiche: Niche;
}
