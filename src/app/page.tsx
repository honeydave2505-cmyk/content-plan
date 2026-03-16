import Link from "next/link";
import Header from "@/components/Header";
import StatsCard from "@/components/StatsCard";
import ContentCard from "@/components/ContentCard";
import { sampleContent } from "@/data/sampleContent";

export default function Home() {
  const drafts = sampleContent.filter((c) => c.status === "draft");
  const scheduled = sampleContent.filter((c) => c.status === "scheduled");
  const published = sampleContent.filter((c) => c.status === "published");
  const recentItems = sampleContent.slice(0, 4);

  return (
    <>
      <Header
        title="Dashboard"
        description="Overview of your content plan"
        action={
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Content
          </Link>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          label="Total Content"
          value={sampleContent.length}
          color="bg-primary/10 text-primary"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />
        <StatsCard
          label="Drafts"
          value={drafts.length}
          color="bg-yellow-100 text-yellow-600"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          }
        />
        <StatsCard
          label="Scheduled"
          value={scheduled.length}
          color="bg-blue-100 text-blue-600"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatsCard
          label="Published"
          value={published.length}
          color="bg-green-100 text-green-600"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          }
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Content</h3>
        <Link href="/library" className="text-sm text-primary hover:text-primary-dark font-medium">
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recentItems.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
