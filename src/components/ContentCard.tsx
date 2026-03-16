'use client';

import { useState } from 'react';
import {
  Copy,
  CheckCheck,
  Hash,
  Clock,
  TrendingUp,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from 'lucide-react';
import { ContentIdea } from '@/types';
import { cn } from '@/lib/utils';

const platformColors: Record<string, string> = {
  instagram: 'from-purple-500 to-pink-500',
  twitter: 'from-sky-400 to-blue-500',
  linkedin: 'from-blue-600 to-blue-700',
  youtube: 'from-red-500 to-red-600',
  tiktok: 'from-gray-800 to-black',
  facebook: 'from-blue-500 to-blue-600',
};

const platformIcons: Record<string, string> = {
  instagram: '📸',
  twitter: '🐦',
  linkedin: '💼',
  youtube: '▶️',
  tiktok: '🎵',
  facebook: '👥',
};

interface ContentCardProps {
  idea: ContentIdea;
  index: number;
}

export default function ContentCard({ idea, index }: ContentCardProps) {
  const [copied, setCopied] = useState<'caption' | 'hashtags' | null>(null);
  const [expanded, setExpanded] = useState(false);

  const copyToClipboard = async (text: string, type: 'caption' | 'hashtags') => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const colorKey = idea.platform in platformColors ? idea.platform : 'instagram';
  const gradient = platformColors[colorKey];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${gradient} p-4 text-white`}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{platformIcons[idea.platform] || '📱'}</span>
              <span className="text-xs font-semibold uppercase tracking-wide opacity-90">
                {idea.platform}
              </span>
              <span
                className={cn(
                  'px-2 py-0.5 rounded-full text-xs font-medium bg-white/20',
                )}
              >
                {idea.contentType}
              </span>
            </div>
            <h3 className="font-bold text-base leading-tight">{idea.title}</h3>
          </div>
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
            {index + 1}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {/* Caption */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Caption</p>
            <button
              onClick={() => copyToClipboard(idea.caption, 'caption')}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs text-gray-500 hover:bg-gray-100 transition-colors"
            >
              {copied === 'caption' ? (
                <>
                  <CheckCheck size={12} className="text-green-500" />
                  <span className="text-green-500">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  Copy
                </>
              )}
            </button>
          </div>
          <p className={cn('text-sm text-gray-700 leading-relaxed', !expanded && 'line-clamp-3')}>
            {idea.caption}
          </p>
          {idea.caption.length > 200 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 mt-1 text-xs text-violet-600 hover:text-violet-700 font-medium"
            >
              {expanded ? (
                <>
                  <ChevronUp size={12} /> Show less
                </>
              ) : (
                <>
                  <ChevronDown size={12} /> Read more
                </>
              )}
            </button>
          )}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-green-50 border border-green-100">
          <ExternalLink size={14} className="text-green-600 flex-shrink-0" />
          <p className="text-xs text-green-800 font-medium">{idea.callToAction}</p>
        </div>

        {/* Hashtags */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1">
              <Hash size={13} className="text-gray-400" />
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Hashtags</p>
            </div>
            <button
              onClick={() => copyToClipboard(idea.hashtags.map((h) => `#${h}`).join(' '), 'hashtags')}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs text-gray-500 hover:bg-gray-100 transition-colors"
            >
              {copied === 'hashtags' ? (
                <>
                  <CheckCheck size={12} className="text-green-500" />
                  <span className="text-green-500">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  Copy All
                </>
              )}
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {idea.hashtags.slice(0, 8).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-600 font-medium"
              >
                #{tag}
              </span>
            ))}
            {idea.hashtags.length > 8 && (
              <span className="px-2 py-1 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-500">
                +{idea.hashtags.length - 8} more
              </span>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-amber-50 border border-amber-100">
            <Clock size={13} className="text-amber-600" />
            <p className="text-xs text-amber-800">{idea.bestTimeToPost}</p>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-blue-50 border border-blue-100">
            <TrendingUp size={13} className="text-blue-600" />
            <p className="text-xs text-blue-800">{idea.estimatedReach}</p>
          </div>
        </div>

        {/* Engagement Tips */}
        {idea.engagementTips.length > 0 && (
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <Lightbulb size={13} className="text-violet-500" />
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Engagement Tips
              </p>
            </div>
            <ul className="space-y-1">
              {idea.engagementTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                  <span className="w-4 h-4 rounded-full bg-violet-100 text-violet-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
