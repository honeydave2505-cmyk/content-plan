"use client";

import { GeneratedContent } from "@/types";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface ContentPreviewProps {
  content: GeneratedContent;
}

export default function ContentPreview({ content }: ContentPreviewProps) {
  function handleCopy() {
    const text = `${content.title}\n\n${content.body}\n\n${content.hashtags.join(" ")}`;
    navigator.clipboard.writeText(text);
  }

  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {content.title}
        </h3>
        <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
          {content.platform}
        </span>
      </div>

      <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        {content.body}
      </p>

      <div className="flex flex-wrap gap-2">
        {content.hashtags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-2 pt-2">
        <Button variant="primary" size="sm" onClick={handleCopy}>
          📋 Copy
        </Button>
        <Button variant="outline" size="sm">
          📅 Schedule
        </Button>
        <Button variant="secondary" size="sm">
          💾 Save to Library
        </Button>
      </div>
    </Card>
  );
}
