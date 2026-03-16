"use client";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-6 backdrop-blur dark:border-gray-700 dark:bg-gray-900/80">
      <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
        Content Planner
      </h1>
      <div className="flex items-center gap-4">
        <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
          + New Content
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-700 dark:bg-gray-700 dark:text-gray-200">
          U
        </div>
      </div>
    </header>
  );
}
