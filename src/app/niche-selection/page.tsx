"use client";

import { useState } from "react";
import NicheCard from "@/components/features/NicheCard";
import Button from "@/components/ui/Button";
import { NICHES } from "@/lib/niches";
import { useRouter } from "next/navigation";

export default function NicheSelectionPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  function handleContinue() {
    if (selected) {
      router.push(`/generate?niche=${selected}`);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Choose Your Niche 🎯
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Select the niche you create content for. This helps the AI generate
          highly relevant, industry-specific content.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {NICHES.map((niche) => (
          <NicheCard
            key={niche.id}
            niche={niche}
            selected={selected === niche.id}
            onSelect={setSelected}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          size="lg"
          disabled={!selected}
          onClick={handleContinue}
        >
          Continue with{" "}
          {selected
            ? NICHES.find((n) => n.id === selected)?.label
            : "a niche"}
          →
        </Button>
      </div>
    </div>
  );
}
