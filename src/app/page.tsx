import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <span className="text-6xl">✨</span>
      <h1 className="mt-6 text-4xl font-extrabold text-gray-900 dark:text-white">
        Welcome to <span className="text-blue-600">ContentAI</span>
      </h1>
      <p className="mt-4 max-w-lg text-lg text-gray-600 dark:text-gray-300">
        Generate high-converting, niche-specific content from images using AI.
        Plan, schedule, and manage your social media content in one place.
      </p>

      <div className="mt-8 flex gap-4">
        <Link
          href="/dashboard"
          className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Go to Dashboard
        </Link>
        <Link
          href="/generate"
          className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Generate Content
        </Link>
      </div>

      {/* Feature highlights */}
      <div className="mt-16 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
        {[
          {
            icon: "🖼️",
            title: "Image to Content",
            desc: "Upload any image and our AI generates platform-ready captions, posts, and articles.",
          },
          {
            icon: "🎯",
            title: "Niche-Specific",
            desc: "Select your niche and get content tailored to your audience and industry.",
          },
          {
            icon: "📅",
            title: "Smart Scheduling",
            desc: "Plan your content calendar, schedule posts, and never miss a publishing date.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-gray-200 bg-white p-6 text-left dark:border-gray-700 dark:bg-gray-800"
          >
            <span className="text-3xl">{f.icon}</span>
            <h3 className="mt-3 font-bold text-gray-900 dark:text-white">
              {f.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
