'use client';

import { useState } from 'react';
import { Sparkles, Image as ImageIcon, Target, Download, RefreshCw, ChevronRight } from 'lucide-react';
import ImageUploader from '@/components/ImageUploader';
import NicheSelector from '@/components/NicheSelector';
import AIContentGenerator from '@/components/AIContentGenerator';
import ContentCard from '@/components/ContentCard';
import { ContentIdea } from '@/types';
import { NICHE_OPTIONS, formatDate } from '@/lib/utils';

type Step = 'setup' | 'results';

export default function ContentPlannerPage() {
  const [step, setStep] = useState<Step>('setup');
  const [activeTab, setActiveTab] = useState<'image' | 'niche' | 'generate'>('image');
  const [selectedNiche, setSelectedNiche] = useState('');
  const [customNiche, setCustomNiche] = useState('');
  const [imageAnalysis, setImageAnalysis] = useState<{
    description: string;
    detectedNiche: string;
    suggestedTopics: string[];
    mood: string;
    colors: string[];
  } | null>(null);
  const [generatedIdeas, setGeneratedIdeas] = useState<ContentIdea[]>([]);

  const effectiveNiche =
    selectedNiche === 'custom' ? customNiche : selectedNiche;

  const nicheLabel =
    NICHE_OPTIONS.find((n) => n.value === selectedNiche)?.label || selectedNiche;

  const handleImageAnalyzed = (result: {
    description: string;
    detectedNiche: string;
    suggestedTopics: string[];
    mood: string;
    colors: string[];
  }) => {
    setImageAnalysis(result);
    // Auto-select detected niche
    const detected = NICHE_OPTIONS.find(
      (n) => n.value === result.detectedNiche.toLowerCase()
    );
    if (detected) setSelectedNiche(detected.value);
    setActiveTab('niche');
  };

  const handleContentGenerated = (ideas: ContentIdea[]) => {
    setGeneratedIdeas(ideas);
    setStep('results');
  };

  const handleReset = () => {
    setStep('setup');
    setActiveTab('image');
    setGeneratedIdeas([]);
    setImageAnalysis(null);
    setSelectedNiche('');
    setCustomNiche('');
  };

  const downloadPlan = () => {
    const content = generatedIdeas
      .map(
        (idea, i) =>
          `--- CONTENT IDEA ${i + 1} ---\nPlatform: ${idea.platform}\nType: ${idea.contentType}\nTitle: ${idea.title}\n\nCaption:\n${idea.caption}\n\nHashtags:\n${idea.hashtags.map((h) => `#${h}`).join(' ')}\n\nCall to Action: ${idea.callToAction}\nBest Time to Post: ${idea.bestTimeToPost}\nEstimated Reach: ${idea.estimatedReach}\n\nEngagement Tips:\n${idea.engagementTips.map((t, j) => `${j + 1}. ${t}`).join('\n')}\n`
      )
      .join('\n\n');

    const blob = new Blob([`CONTENT PLAN - ${nicheLabel}\nGenerated: ${formatDate(new Date())}\n\n${content}`], {
      type: 'text/plain',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `content-plan-${effectiveNiche}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'image', label: 'Upload Image', icon: ImageIcon, description: 'Optional AI boost' },
    { id: 'niche', label: 'Select Niche', icon: Target, description: 'Required' },
    { id: 'generate', label: 'Generate', icon: Sparkles, description: 'Configure & create' },
  ];

  if (step === 'results') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Results Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-green-600 font-medium">Content Plan Ready!</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">
              {nicheLabel} Content Plan
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {generatedIdeas.length} niche-specific ideas • {formatDate(new Date())}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={downloadPlan}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <Download size={15} />
              Download Plan
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg"
            >
              <RefreshCw size={15} />
              New Plan
            </button>
          </div>
        </div>

        {/* Image Analysis Banner */}
        {imageAnalysis && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100 flex items-start gap-3">
            <Sparkles size={18} className="text-violet-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-violet-800">AI Image Context Applied</p>
              <p className="text-xs text-violet-600 mt-0.5">{imageAnalysis.description}</p>
            </div>
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {generatedIdeas.map((idea, index) => (
            <ContentCard key={idea.id} idea={idea} index={index} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-violet-300 text-violet-700 font-semibold text-sm hover:bg-violet-50 transition-colors"
          >
            <RefreshCw size={16} />
            Generate Another Plan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-sm font-medium mb-4">
          <Sparkles size={14} />
          AI Content Planner
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
          Build Your Content Plan
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Upload an image for AI context, select your niche, and generate a complete content strategy
          tailored to your brand.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-100" />
        {tabs.map(({ id, label, icon: Icon, description }, index) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as typeof activeTab)}
            className="flex flex-col items-center gap-2 relative z-10"
          >
            <div
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                activeTab === id
                  ? 'border-violet-600 bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                  : index < tabs.findIndex((t) => t.id === activeTab)
                  ? 'border-green-500 bg-green-500 text-white'
                  : 'border-gray-200 bg-white text-gray-400'
              }`}
            >
              <Icon size={16} />
            </div>
            <div className="text-center">
              <p
                className={`text-xs font-semibold ${
                  activeTab === id ? 'text-violet-700' : 'text-gray-500'
                }`}
              >
                {label}
              </p>
              <p className="text-[10px] text-gray-400">{description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Image Upload Tab */}
        {activeTab === 'image' && (
          <div className="p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Upload an Image</h2>
              <p className="text-sm text-gray-500">
                Optional but recommended — AI analyzes your image to detect niche and generate more
                relevant content ideas.
              </p>
            </div>
            <ImageUploader
              onImageAnalyzed={handleImageAnalyzed}
              onImageCleared={() => setImageAnalysis(null)}
            />
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveTab('niche')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
              >
                {imageAnalysis ? 'Continue to Niche' : 'Skip & Select Niche'}
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Niche Selection Tab */}
        {activeTab === 'niche' && (
          <div className="p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Select Your Niche</h2>
              <p className="text-sm text-gray-500">
                Choose your content niche — all AI-generated content will be specifically tailored to
                this niche only.
              </p>
            </div>
            <NicheSelector
              selectedNiche={selectedNiche}
              customNiche={customNiche}
              onNicheChange={setSelectedNiche}
              onCustomNicheChange={setCustomNiche}
            />
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => setActiveTab('image')}
                className="text-sm text-gray-500 hover:text-gray-700 font-medium"
              >
                ← Back
              </button>
              <button
                onClick={() => setActiveTab('generate')}
                disabled={!effectiveNiche}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Generate
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Generate Tab */}
        {activeTab === 'generate' && (
          <div className="p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Configure & Generate</h2>
              <p className="text-sm text-gray-500">
                Customize your content plan settings and let AI generate niche-specific ideas for you.
              </p>
              {effectiveNiche && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-violet-50 border border-violet-100 text-sm text-violet-700 font-medium">
                  <Target size={13} />
                  Niche: {nicheLabel || effectiveNiche}
                  {imageAnalysis && (
                    <>
                      <span className="text-violet-300">|</span>
                      <Sparkles size={12} />
                      <span className="text-xs">Image context active</span>
                    </>
                  )}
                </div>
              )}
            </div>
            {!effectiveNiche ? (
              <div className="text-center py-10">
                <Target size={40} className="text-gray-200 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No niche selected</p>
                <p className="text-sm text-gray-400 mt-1 mb-4">
                  Please go back and select a niche first
                </p>
                <button
                  onClick={() => setActiveTab('niche')}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
                >
                  ← Select Niche
                </button>
              </div>
            ) : (
              <AIContentGenerator
                niche={effectiveNiche}
                imageAnalysis={
                  imageAnalysis
                    ? `Description: ${imageAnalysis.description}. Mood: ${imageAnalysis.mood}. Suggested topics: ${imageAnalysis.suggestedTopics.join(', ')}`
                    : undefined
                }
                onContentGenerated={handleContentGenerated}
              />
            )}
            {effectiveNiche && (
              <div className="mt-4">
                <button
                  onClick={() => setActiveTab('niche')}
                  className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                >
                  ← Back to Niche
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
