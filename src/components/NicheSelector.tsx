'use client';

import { useState } from 'react';
import { Check, Search } from 'lucide-react';
import { NICHE_OPTIONS } from '@/lib/utils';
import { cn } from '@/lib/utils';
import Input from '@/components/ui/Input';

interface NicheSelectorProps {
  selectedNiche: string;
  customNiche: string;
  onNicheChange: (niche: string) => void;
  onCustomNicheChange: (value: string) => void;
}

export default function NicheSelector({
  selectedNiche,
  customNiche,
  onNicheChange,
  onCustomNicheChange,
}: NicheSelectorProps) {
  const [search, setSearch] = useState('');

  const filtered = NICHE_OPTIONS.filter((n) =>
    n.label.toLowerCase().includes(search.toLowerCase())
  );

  const selected = NICHE_OPTIONS.find((n) => n.value === selectedNiche);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
        <input
          type="text"
          placeholder="Search niche..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
        {filtered.map(({ value, label, emoji }) => (
          <button
            key={value}
            onClick={() => onNicheChange(value)}
            className={cn(
              'flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150 text-left',
              selectedNiche === value
                ? 'border-violet-500 bg-violet-50 text-violet-700 shadow-sm'
                : 'border-gray-200 bg-white text-gray-700 hover:border-violet-300 hover:bg-violet-50/50'
            )}
          >
            <span className="text-base">{emoji}</span>
            <span className="flex-1 truncate">{label}</span>
            {selectedNiche === value && (
              <Check size={14} className="text-violet-600 flex-shrink-0" />
            )}
          </button>
        ))}
      </div>

      {selectedNiche === 'custom' && (
        <Input
          label="Describe your custom niche"
          placeholder="e.g., sustainable pet care, vintage gaming, urban gardening..."
          value={customNiche}
          onChange={(e) => onCustomNicheChange(e.target.value)}
        />
      )}

      {selected && selectedNiche !== 'custom' && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100">
          <span className="text-lg">{selected.emoji}</span>
          <div>
            <p className="text-sm font-semibold text-violet-800">Selected: {selected.label}</p>
            <p className="text-xs text-violet-600">AI will generate content tailored to this niche</p>
          </div>
        </div>
      )}
    </div>
  );
}
