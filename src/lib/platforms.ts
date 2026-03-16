import { Platform } from "@/types";

export interface PlatformMeta {
  id: Platform;
  label: string;
  icon: string;
  maxLength: number; // approximate character limit
}

export const PLATFORMS: PlatformMeta[] = [
  { id: "instagram", label: "Instagram", icon: "📸", maxLength: 2200 },
  { id: "twitter", label: "Twitter / X", icon: "🐦", maxLength: 280 },
  { id: "linkedin", label: "LinkedIn", icon: "💼", maxLength: 3000 },
  { id: "facebook", label: "Facebook", icon: "📘", maxLength: 63206 },
  { id: "tiktok", label: "TikTok", icon: "🎵", maxLength: 2200 },
  { id: "youtube", label: "YouTube", icon: "▶️", maxLength: 5000 },
  { id: "blog", label: "Blog Post", icon: "📝", maxLength: 50000 },
];
