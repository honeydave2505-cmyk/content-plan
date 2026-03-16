"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ContentCard from "@/components/ContentCard";
import { sampleContent } from "@/data/sampleContent";

const STATUSES = ["all", "draft", "scheduled", "published"] as const;
const PLATFORMS = ["all", "Instagram", "Twitter", "LinkedIn", "Blog"] as const;

export default function LibraryPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = sampleContent.filter((item) => {
    if (statusFilter !== "all" && item.status !== statusFilter) return false;
    if (platformFilter !== "all" && item.platform !== platformFilter) return false;
    if (search && !item.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <Header
        title="Content Library"
        description="Browse and filter all your content"
      />

      <div className="bg-card-bg rounded-xl border border-border p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="search" className="block text-sm font-medium text-foreground/70 mb-1.5">
              Search
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search content..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            />
          </div>
          <div>
            <label htmlFor="statusFilter" className="block text-sm font-medium text-foreground/70 mb-1.5">
              Status
            </label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s === "all" ? "All Statuses" : s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="platformFilter" className="block text-sm font-medium text-foreground/70 mb-1.5">
              Platform
            </label>
            <select
              id="platformFilter"
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            >
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>{p === "all" ? "All Platforms" : p}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-foreground/50">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <p className="font-medium">No content found</p>
          <p className="text-sm mt-1">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}
