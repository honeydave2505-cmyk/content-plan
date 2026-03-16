"use client";

import { useState } from "react";
import type { ContentItem } from "./ContentCard";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const statusDot: Record<string, string> = {
  draft: "bg-yellow-400",
  scheduled: "bg-blue-400",
  published: "bg-green-400",
};

interface CalendarViewProps {
  items: ContentItem[];
}

export default function CalendarView({ items }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getItemsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return items.filter((item) => item.date === dateStr);
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} className="h-28 bg-card-bg/50 rounded-lg" />);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dayItems = getItemsForDay(day);
    const isToday =
      day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

    cells.push(
      <div
        key={day}
        className={`h-28 bg-card-bg rounded-lg border p-2 hover:border-primary/50 transition-colors ${
          isToday ? "border-primary ring-1 ring-primary/30" : "border-border"
        }`}
      >
        <span
          className={`text-sm font-medium ${
            isToday
              ? "bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center"
              : "text-foreground/70"
          }`}
        >
          {day}
        </span>
        <div className="mt-1 space-y-1 overflow-hidden">
          {dayItems.slice(0, 2).map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-1 text-xs truncate"
              title={item.title}
            >
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusDot[item.status]}`} />
              <span className="truncate">{item.title}</span>
            </div>
          ))}
          {dayItems.length > 2 && (
            <span className="text-xs text-primary">+{dayItems.length - 2} more</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">
          {MONTHS[month]} {year}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="p-2 rounded-lg hover:bg-card-bg border border-border transition-colors"
            aria-label="Previous month"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-card-bg border border-border transition-colors"
            aria-label="Next month"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAYS.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-foreground/50 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">{cells}</div>

      <div className="flex items-center gap-4 mt-4 text-xs text-foreground/60">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-yellow-400" /> Draft
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-400" /> Scheduled
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400" /> Published
        </span>
      </div>
    </div>
  );
}
