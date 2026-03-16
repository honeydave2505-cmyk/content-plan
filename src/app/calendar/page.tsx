"use client";

import Header from "@/components/Header";
import CalendarView from "@/components/CalendarView";
import { sampleContent } from "@/data/sampleContent";

export default function CalendarPage() {
  return (
    <>
      <Header
        title="Content Calendar"
        description="Visualize your content schedule at a glance"
      />
      <div className="bg-card-bg rounded-xl border border-border p-6">
        <CalendarView items={sampleContent} />
      </div>
    </>
  );
}
