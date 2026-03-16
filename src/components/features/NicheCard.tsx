"use client";

import { NicheOption } from "@/types";

interface NicheCardProps {
  niche: NicheOption;
  selected: boolean;
  onSelect: (id: string) => void;
}

export default function NicheCard({ niche, selected, onSelect }: NicheCardProps) {
  return (
    <button
      onClick={() => onSelect(niche.id)}
      className={`flex flex-col items-center gap-2 rounded-xl border-2 p-6 text-center transition hover:shadow-md ${
        selected
          ? "border-blue-500 bg-blue-50 shadow-md dark:border-blue-400 dark:bg-blue-900/20"
          : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
      }`}
    >
      <span className="text-4xl">{niche.icon}</span>
      <h3 className="text-sm font-bold text-gray-900 dark:text-white">
        {niche.label}
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {niche.description}
      </p>
    </button>
  );
}
