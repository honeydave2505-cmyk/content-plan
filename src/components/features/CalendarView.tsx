"use client";

import { CalendarEvent } from "@/types";
import Card from "@/components/ui/Card";

/** Simple 7-day calendar strip for the content planner */
export default function CalendarView({ events }: { events: CalendarEvent[] }) {
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  function eventsForDate(date: Date) {
    const iso = date.toISOString().split("T")[0];
    return events.filter((e) => e.date.startsWith(iso));
  }

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="grid grid-cols-7 gap-3">
      {days.map((day) => {
        const dayEvents = eventsForDate(day);
        const isToday = day.toDateString() === today.toDateString();

        return (
          <Card
            key={day.toISOString()}
            className={`min-h-[140px] ${isToday ? "ring-2 ring-blue-500" : ""}`}
          >
            <p
              className={`text-xs font-semibold ${
                isToday
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {dayNames[day.getDay()]}
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {day.getDate()}
            </p>

            <div className="mt-2 space-y-1">
              {dayEvents.length === 0 && (
                <p className="text-[10px] text-gray-400">No posts</p>
              )}
              {dayEvents.map((ev) => (
                <div
                  key={ev.id}
                  className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                    ev.status === "published"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                      : ev.status === "scheduled"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  {ev.title}
                </div>
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
