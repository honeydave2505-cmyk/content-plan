"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import ImageUploader from "@/components/features/ImageUploader";
import ContentPreview from "@/components/features/ContentPreview";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { NICHES } from "@/lib/niches";
import { PLATFORMS } from "@/lib/platforms";
import { generateContent } from "@/lib/content-generator";
import type { GeneratedContent, Niche, Platform } from "@/types";

export default function GeneratePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading…</div>}>
      <GeneratePageContent />
    </Suspense>
  );
}

function GeneratePageContent() {
  const searchParams = useSearchParams();
  const initialNiche = (searchParams.get("niche") as Niche) || "lifestyle";

  const [niche, setNiche] = useState<Niche>(initialNiche);
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [tone, setTone] = useState<
    "professional" | "casual" | "humorous" | "inspirational"
  >("casual");
  const [keywords, setKeywords] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageDescription, setImageDescription] = useState("");
  const [result, setResult] = useState<GeneratedContent | null>(null);
  const [loading, setLoading] = useState(false);

  function handleImageSelect(_file: File, preview: string) {
    setImagePreview(preview);
  }

  async function handleGenerate() {
    setLoading(true);

    // In production this would POST to /api/generate which calls an AI service.
    // For now we use the local template-based generator.
    await new Promise((r) => setTimeout(r, 1200)); // simulate network delay

    const content = generateContent({
      niche,
      platform,
      tone,
      imageBase64: imagePreview ?? undefined,
      imageDescription: imageDescription || undefined,
      keywords: keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
    });

    setResult(content);
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Generate Content ✨
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Upload an image and configure your preferences — AI does the rest.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left column – inputs */}
        <div className="space-y-6">
          {/* Image upload */}
          <Card>
            <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">
              1. Upload Image
            </h3>
            <ImageUploader onImageSelect={handleImageSelect} />
            <label className="mt-3 block">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Describe the image (optional — helps AI generate better content)
              </span>
              <input
                type="text"
                value={imageDescription}
                onChange={(e) => setImageDescription(e.target.value)}
                placeholder="e.g. A sunrise over a mountain lake"
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
            </label>
          </Card>

          {/* Niche & Platform */}
          <Card>
            <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">
              2. Choose Niche &amp; Platform
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  Niche
                </span>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value as Niche)}
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                >
                  {NICHES.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.icon} {n.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  Platform
                </span>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as Platform)}
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                >
                  {PLATFORMS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.icon} {p.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </Card>

          {/* Tone & Keywords */}
          <Card>
            <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">
              3. Tone &amp; Keywords
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  Tone
                </span>
                <select
                  value={tone}
                  onChange={(e) =>
                    setTone(
                      e.target.value as
                        | "professional"
                        | "casual"
                        | "humorous"
                        | "inspirational"
                    )
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                >
                  <option value="casual">😊 Casual</option>
                  <option value="professional">💼 Professional</option>
                  <option value="humorous">😂 Humorous</option>
                  <option value="inspirational">🌟 Inspirational</option>
                </select>
              </label>

              <label className="block">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  Keywords (comma-separated)
                </span>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="e.g. motivation, morning routine"
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
              </label>
            </div>
          </Card>

          <Button
            size="lg"
            className="w-full"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "⏳ Generating…" : "✨ Generate Content"}
          </Button>
        </div>

        {/* Right column – preview */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Generated Content
          </h3>
          {result ? (
            <ContentPreview content={result} />
          ) : (
            <Card className="flex min-h-[300px] items-center justify-center text-center">
              <div>
                <span className="text-5xl">🤖</span>
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  Configure your settings and click{" "}
                  <strong>Generate Content</strong> to see AI-powered results
                  here.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
