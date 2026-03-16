'use client';

import { useState } from 'react';
import { Sparkles, Settings2, Target, Users, Wand2 } from 'lucide-react';
import { Platform, ContentType, ContentIdea } from '@/types';
import { PLATFORM_OPTIONS, CONTENT_TYPE_OPTIONS, TONE_OPTIONS, generateId } from '@/lib/utils';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

interface AIContentGeneratorProps {
  niche: string;
  imageAnalysis?: string;
  onContentGenerated: (ideas: ContentIdea[]) => void;
}

export default function AIContentGenerator({
  niche,
  imageAnalysis,
  onContentGenerated,
}: AIContentGeneratorProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['instagram', 'twitter']);
  const [selectedTypes, setSelectedTypes] = useState<ContentType[]>(['post', 'reel']);
  const [numberOfIdeas, setNumberOfIdeas] = useState(6);
  const [targetAudience, setTargetAudience] = useState('');
  const [tone, setTone] = useState('engaging and authentic');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const toggleType = (type: ContentType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleGenerate = async () => {
    if (!niche) {
      setError('Please select a niche first');
      return;
    }
    if (selectedPlatforms.length === 0) {
      setError('Please select at least one platform');
      return;
    }
    if (selectedTypes.length === 0) {
      setError('Please select at least one content type');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          niche,
          imageAnalysis,
          platforms: selectedPlatforms,
          contentTypes: selectedTypes,
          numberOfIdeas,
          targetAudience,
          tone,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to generate content');
      }

      const data = await response.json();
      const ideasWithIds: ContentIdea[] = data.ideas.map((idea: Omit<ContentIdea, 'id'>) => ({
        ...idea,
        id: generateId(),
      }));
      onContentGenerated(ideasWithIds);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Platforms */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Target size={16} className="text-violet-600" />
          <p className="text-sm font-semibold text-gray-700">Target Platforms</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {PLATFORM_OPTIONS.map(({ value, label, color }) => (
            <button
              key={value}
              onClick={() => togglePlatform(value as Platform)}
              className={cn(
                'px-3 py-2 rounded-xl border text-sm font-medium transition-all duration-150',
                selectedPlatforms.includes(value as Platform)
                  ? `bg-gradient-to-r ${color} text-white border-transparent shadow-sm`
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Types */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Settings2 size={16} className="text-violet-600" />
          <p className="text-sm font-semibold text-gray-700">Content Types</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {CONTENT_TYPE_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => toggleType(value as ContentType)}
              className={cn(
                'px-3 py-2 rounded-xl border text-sm font-medium transition-all duration-150',
                selectedTypes.includes(value as ContentType)
                  ? 'border-violet-500 bg-violet-50 text-violet-700 shadow-sm'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-violet-300'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Number of Ideas */}
      <div>
        <label className="text-sm font-semibold text-gray-700 block mb-2">
          Number of Ideas: {numberOfIdeas}
        </label>
        <input
          type="range"
          min={3}
          max={12}
          value={numberOfIdeas}
          onChange={(e) => setNumberOfIdeas(Number(e.target.value))}
          className="w-full accent-violet-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>3</span>
          <span>12</span>
        </div>
      </div>

      {/* Target Audience */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Users size={16} className="text-violet-600" />
          <p className="text-sm font-semibold text-gray-700">Target Audience (optional)</p>
        </div>
        <input
          type="text"
          placeholder="e.g., women 25-35 interested in fitness, young professionals..."
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      {/* Tone */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Wand2 size={16} className="text-violet-600" />
          <p className="text-sm font-semibold text-gray-700">Content Tone</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {TONE_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setTone(value)}
              className={cn(
                'px-3 py-2 rounded-xl border text-sm font-medium transition-all duration-150',
                tone === value
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-indigo-300'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <Button
        onClick={handleGenerate}
        loading={loading}
        size="lg"
        className="w-full"
      >
        <Sparkles size={18} />
        {loading ? 'Generating Your Content Plan...' : `Generate ${numberOfIdeas} Content Ideas`}
      </Button>

      {loading && (
        <p className="text-center text-sm text-gray-500 animate-pulse">
          🤖 AI is crafting niche-specific content for you...
        </p>
      )}
    </div>
  );
}
