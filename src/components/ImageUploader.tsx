'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, X, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

interface ImageUploaderProps {
  onImageAnalyzed: (analysis: {
    description: string;
    detectedNiche: string;
    suggestedTopics: string[];
    mood: string;
    colors: string[];
    imageBase64: string;
    mimeType: string;
  }) => void;
  onImageCleared?: () => void;
}

export default function ImageUploader({ onImageAnalyzed, onImageCleared }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<{
    description: string;
    detectedNiche: string;
    suggestedTopics: string[];
    mood: string;
    colors: string[];
  } | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setError(null);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);

      const base64 = dataUrl.split(',')[1];
      const mimeType = file.type;

      setAnalyzing(true);
      try {
        const response = await fetch('/api/analyze-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: base64, mimeType }),
        });

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error || 'Failed to analyze image');
        }

        const result = await response.json();
        setAnalysis(result);
        onImageAnalyzed({ ...result, imageBase64: base64, mimeType });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to analyze image');
      } finally {
        setAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  }, [onImageAnalyzed]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif'] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  const clearImage = () => {
    setPreview(null);
    setAnalysis(null);
    setError(null);
    onImageCleared?.();
  };

  return (
    <div className="space-y-4">
      {!preview ? (
        <div
          {...getRootProps()}
          className={cn(
            'relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200',
            isDragActive
              ? 'border-violet-500 bg-violet-50 scale-[1.02]'
              : 'border-gray-200 bg-gray-50 hover:border-violet-400 hover:bg-violet-50/50'
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center">
              {isDragActive ? (
                <Upload size={28} className="text-violet-600 animate-bounce" />
              ) : (
                <ImageIcon size={28} className="text-violet-500" />
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-700">
                {isDragActive ? 'Drop your image here!' : 'Upload an image for AI analysis'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Drag & drop or click to browse • JPEG, PNG, WebP, GIF up to 10MB
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium">
              <Sparkles size={14} />
              AI will detect niche & generate content ideas
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-gray-100 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Uploaded preview" className="w-full max-h-72 object-cover" />
            <button
              onClick={clearImage}
              className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 text-white hover:bg-black/80 transition-colors opacity-0 group-hover:opacity-100"
            >
              <X size={16} />
            </button>
            {analyzing && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-white">
                  <Loader2 size={32} className="animate-spin" />
                  <p className="font-medium">Analyzing image with AI...</p>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          {analysis && !analyzing && (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-violet-600" />
                <span className="font-semibold text-violet-800 text-sm">AI Analysis Complete</span>
              </div>
              <p className="text-sm text-gray-700">{analysis.description}</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-medium">
                  🎯 Niche: {analysis.detectedNiche}
                </span>
                <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium">
                  ✨ Mood: {analysis.mood}
                </span>
              </div>
              {analysis.suggestedTopics.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1.5">Suggested Topics:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.suggestedTopics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 rounded-lg bg-white border border-violet-200 text-xs text-gray-700"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {!analyzing && (
            <Button variant="outline" size="sm" onClick={clearImage} className="w-full">
              <Upload size={14} />
              Upload Different Image
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
