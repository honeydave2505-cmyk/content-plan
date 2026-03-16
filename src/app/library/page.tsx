"use client";

import { useState } from "react";
import ContentPreview from "@/components/features/ContentPreview";
import Button from "@/components/ui/Button";
import type { GeneratedContent } from "@/types";

/** Sample library items */
const SAMPLE_LIBRARY: GeneratedContent[] = [
  {
    id: "lib-1",
    title: "Morning Workout Motivation 💪",
    body: "Start your day strong! Here's a 20-minute routine that will fire up your metabolism and set the tone for a productive day. Consistency > intensity.",
    hashtags: ["#Fitness", "#MorningRoutine", "#WorkoutMotivation"],
    platform: "instagram",
    niche: "fitness",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "lib-2",
    title: "5-Minute Pasta Hack 🍝",
    body: "This one-pot pasta trick saves 15 minutes of cooking time and the result tastes even better. Your weeknight dinners just leveled up!",
    hashtags: ["#Foodie", "#QuickRecipe", "#CookingHack"],
    platform: "tiktok",
    niche: "food",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "lib-3",
    title: "Budget Travel: Southeast Asia 🌏",
    body: "You can explore Thailand, Vietnam, and Cambodia for under $50/day. Here's the exact breakdown of costs, accommodation tips, and must-visit spots.",
    hashtags: ["#Travel", "#BudgetTravel", "#SoutheastAsia"],
    platform: "blog",
    niche: "travel",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: "lib-4",
    title: "AI Tools Every Marketer Needs 🤖",
    body: "These 5 AI tools can automate 80% of your marketing workflow. From content creation to analytics — here's how to leverage them.",
    hashtags: ["#Tech", "#AITools", "#Marketing"],
    platform: "linkedin",
    niche: "tech",
    createdAt: new Date(Date.now() - 345600000).toISOString(),
  },
];

export default function LibraryPage() {
  const [items] = useState<GeneratedContent[]>(SAMPLE_LIBRARY);
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    filter === "all" ? items : items.filter((i) => i.niche === filter);

  const niches = Array.from(new Set(items.map((i) => i.niche)));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Content Library 📚
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Browse and manage your saved content
          </p>
        </div>
        <Button variant="outline">Export All</Button>
      </div>

      {/* Filter bar */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-full px-3 py-1 text-xs font-medium transition ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          All
        </button>
        {niches.map((n) => (
          <button
            key={n}
            onClick={() => setFilter(n)}
            className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition ${
              filter === n
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Content grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((item) => (
          <ContentPreview key={item.id} content={item} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-gray-400">
          No content found for this filter.
        </p>
      )}
    </div>
  );
}
