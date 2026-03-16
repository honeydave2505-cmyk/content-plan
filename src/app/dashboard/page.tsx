import StatCard from "@/components/ui/StatCard";
import Card from "@/components/ui/Card";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Your content performance at a glance
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Posts" value={42} icon="📝" trend="+12% this week" />
        <StatCard title="Scheduled" value={8} icon="📅" trend="3 for today" />
        <StatCard title="Published" value={30} icon="✅" />
        <StatCard title="Drafts" value={4} icon="📄" />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Quick Actions
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { href: "/generate", icon: "✨", label: "Generate Content" },
              { href: "/niche-selection", icon: "🎯", label: "Change Niche" },
              { href: "/calendar", icon: "📅", label: "View Calendar" },
              { href: "/library", icon: "📚", label: "Content Library" },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                <span className="text-2xl">{action.icon}</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Recent Activity
          </h3>
          <ul className="mt-4 divide-y divide-gray-100 dark:divide-gray-700">
            {[
              { text: 'Published "Fitness Motivation Monday" on Instagram', time: "2 hours ago" },
              { text: "Scheduled 3 posts for this week", time: "5 hours ago" },
              { text: "Generated new food content from uploaded image", time: "1 day ago" },
              { text: "Changed niche to Travel & Adventure", time: "2 days ago" },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 py-3">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {item.text}
                  </p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
