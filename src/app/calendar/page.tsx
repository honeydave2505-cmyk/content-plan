"use client";

import { useState } from "react";
import CalendarView from "@/components/features/CalendarView";
import Button from "@/components/ui/Button";
import type { CalendarEvent } from "@/types";

/** Sample events to demonstrate the calendar UI */
const SAMPLE_EVENTS: CalendarEvent[] = (() => {
  const today = new Date();
  const iso = (offset: number) => {
    const d = new Date(today);
    d.setDate(today.getDate() + offset);
    return d.toISOString().split("T")[0];
  };

  return [
    {
      id: "1",
      contentId: "c1",
      title: "Fitness Monday 💪",
      date: iso(0),
      platform: "instagram",
      status: "published",
    },
    {
      id: "2",
      contentId: "c2",
      title: "Recipe Reel 🍳",
      date: iso(1),
      platform: "tiktok",
      status: "scheduled",
    },
    {
      id: "3",
      contentId: "c3",
      title: "Tech Review 💻",
      date: iso(2),
      platform: "youtube",
      status: "scheduled",
    },
    {
      id: "4",
      contentId: "c4",
      title: "Travel Thread ✈️",
      date: iso(3),
      platform: "twitter",
      status: "draft",
    },
    {
      id: "5",
      contentId: "c5",
      title: "Finance Tips 💰",
      date: iso(5),
      platform: "linkedin",
      status: "scheduled",
    },
  ];
})();

export default function CalendarPage() {
  const [events] = useState<CalendarEvent[]>(SAMPLE_EVENTS);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Content Calendar 📅
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Plan and schedule your content for the week
          </p>
        </div>
        <Button>+ Schedule Post</Button>
      </div>

      <CalendarView events={events} />

      {/* Legend */}
      <div className="flex gap-6 text-xs">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm bg-green-200" />{" "}
          Published
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm bg-yellow-200" />{" "}
          Scheduled
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm bg-gray-200" />{" "}
          Draft
        </span>
      </div>
    </div>
  );
}
