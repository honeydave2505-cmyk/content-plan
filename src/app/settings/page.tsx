import Card from "@/components/ui/Card";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings ⚙️
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Configure your ContentAI preferences
        </p>
      </div>

      {/* AI Configuration */}
      <Card>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          AI Configuration
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Connect your AI provider to enable intelligent content generation.
        </p>
        <div className="mt-4 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              AI Provider
            </span>
            <select className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white">
              <option>OpenAI (GPT-4 Vision)</option>
              <option>Google Gemini</option>
              <option>Anthropic Claude</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              API Key
            </span>
            <input
              type="password"
              placeholder="sk-..."
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </label>
        </div>
      </Card>

      {/* Default Preferences */}
      <Card>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Default Preferences
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Default Niche
            </span>
            <select className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white">
              <option>Fitness & Gym</option>
              <option>Food & Recipes</option>
              <option>Travel & Adventure</option>
              <option>Technology</option>
              <option>Lifestyle & Wellness</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Default Platform
            </span>
            <select className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white">
              <option>Instagram</option>
              <option>Twitter / X</option>
              <option>LinkedIn</option>
              <option>TikTok</option>
              <option>Blog</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Default Tone
            </span>
            <select className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white">
              <option>Casual</option>
              <option>Professional</option>
              <option>Humorous</option>
              <option>Inspirational</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Language
            </span>
            <select className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>Hindi</option>
            </select>
          </label>
        </div>
      </Card>

      {/* Scheduling */}
      <Card>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Scheduling
        </h3>
        <div className="mt-4 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Time Zone
            </span>
            <select className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white">
              <option>UTC</option>
              <option>America/New_York (EST)</option>
              <option>America/Los_Angeles (PST)</option>
              <option>Asia/Kolkata (IST)</option>
              <option>Europe/London (GMT)</option>
            </select>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Send email reminders for scheduled posts
            </span>
          </label>
        </div>
      </Card>
    </div>
  );
}
