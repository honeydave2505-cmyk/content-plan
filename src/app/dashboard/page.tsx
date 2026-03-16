'use client';

import { useState } from 'react';
import { Sparkles, Image as ImageIcon, Target, ChevronRight, BookOpen, TrendingUp, Calendar } from 'lucide-react';
import Link from 'next/link';
import { ContentIdea, ContentPlan } from '@/types';
import { generateId, formatDate, NICHE_OPTIONS, PLATFORM_OPTIONS } from '@/lib/utils';
import ContentCard from '@/components/ContentCard';

// Simple stats for dashboard display
const stats = [
  { label: 'Content Ideas Generated', value: '2,847', icon: Sparkles, color: 'from-violet-500 to-indigo-500' },
  { label: 'Platforms Supported', value: '6', icon: Target, color: 'from-pink-500 to-rose-500' },
  { label: 'Niches Available', value: '15+', icon: BookOpen, color: 'from-amber-500 to-orange-500' },
  { label: 'Avg. Engagement Boost', value: '3.2x', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
];

const platformStats = PLATFORM_OPTIONS.map((p, i) => ({
  ...p,
  ideas: [465, 312, 289, 178, 370, 233][i] ?? 200,
}));

const sampleIdeas: ContentIdea[] = [
  {
    id: '1',
    title: 'Morning Fitness Routine That Changed My Life',
    caption: '🌅 Rise and grind! This 20-minute morning routine has completely transformed my energy levels and productivity...\n\nNo equipment needed. Just you, your mat, and the commitment to show up every single day. The results will surprise you! 💪\n\n📲 Save this for your next morning!',
    hashtags: ['fitness', 'morningroutine', 'workout', 'health', 'wellness', 'motivation', 'gym', 'fitlife', 'exercise', 'healthy'],
    platform: 'instagram',
    contentType: 'reel',
    callToAction: 'Follow for daily fitness tips!',
    bestTimeToPost: 'Mon-Wed, 6-8 AM',
    estimatedReach: '12K-35K accounts',
    engagementTips: ['Start with a relatable hook', 'Use trending workout audio', 'Show before/after energy levels'],
  },
  {
    id: '2',
    title: 'The One Meal Prep Hack Nobody Talks About',
    caption: '🥗 This meal prep strategy saves me 3 hours every week and keeps me on track all month...\n\nMost people make this mistake when planning their meals. Here\'s the simple fix that changed everything for me and my clients.\n\n✅ Drop "RECIPE" in the comments for the full guide!',
    hashtags: ['mealprep', 'nutrition', 'healthyeating', 'food', 'wellness', 'diet', 'cooking', 'health', 'weightloss', 'cleaneating'],
    platform: 'instagram',
    contentType: 'carousel',
    callToAction: 'Save this post & tag someone who needs meal prep inspo!',
    bestTimeToPost: 'Sunday, 11 AM - 1 PM',
    estimatedReach: '8K-22K accounts',
    engagementTips: ['Use before/after comparison slides', 'Include exact quantities', 'Add shopping list on last slide'],
  },
];

export default function DashboardPage() {
  const [recentPlan] = useState<ContentPlan>({
    id: generateId(),
    niche: 'fitness',
    generatedAt: new Date().toISOString(),
    ideas: sampleIdeas,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Your AI content planning hub</p>
          </div>
          <Link
            href="/content-planner"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm hover:from-violet-700 hover:to-indigo-700 shadow-lg hover:shadow-violet-500/30 transition-all"
          >
            <Sparkles size={16} />
            New Content Plan
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3`}>
              <Icon size={18} className="text-white" />
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>

          <Link
            href="/content-planner"
            className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100 hover:border-violet-300 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Sparkles size={22} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900">Generate Content</p>
              <p className="text-xs text-gray-500">AI-powered niche content</p>
            </div>
            <ChevronRight size={18} className="text-gray-400 group-hover:text-violet-500" />
          </Link>

          <Link
            href="/content-planner"
            className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-violet-200 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <ImageIcon size={22} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900">Analyze Image</p>
              <p className="text-xs text-gray-500">Upload & get AI insights</p>
            </div>
            <ChevronRight size={18} className="text-gray-400 group-hover:text-violet-500" />
          </Link>

          {/* Platform Coverage */}
          <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
              <Target size={15} className="text-violet-500" />
              Platform Coverage
            </h3>
            <div className="space-y-2.5">
              {platformStats.map(({ value, label, color, ideas }) => (
                <div key={value} className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full bg-gradient-to-r ${color}`}
                  />
                  <span className="text-sm text-gray-600 flex-1">{label}</span>
                  <span className="text-xs font-semibold text-gray-900">{ideas}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Niche Coverage */}
          <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
              <BookOpen size={15} className="text-violet-500" />
              Popular Niches
            </h3>
            <div className="flex flex-wrap gap-2">
              {NICHE_OPTIONS.slice(0, 8).map(({ value, label, emoji }) => (
                <Link
                  key={value}
                  href="/content-planner"
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-600 hover:border-violet-300 hover:bg-violet-50 transition-colors"
                >
                  <span>{emoji}</span>
                  <span>{label.split(' ')[0]}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Content */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Sample Content Preview</h2>
            <Link
              href="/content-planner"
              className="text-sm text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1"
            >
              Generate yours <ChevronRight size={14} />
            </Link>
          </div>
          <p className="text-sm text-gray-500 mb-5 flex items-center gap-2">
            <Calendar size={14} className="text-violet-500" />
            Sample fitness niche content — {formatDate(new Date())}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recentPlan.ideas.map((idea, index) => (
              <ContentCard key={idea.id} idea={idea} index={index} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/content-planner"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg"
            >
              <Sparkles size={16} />
              Create Your Content Plan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
