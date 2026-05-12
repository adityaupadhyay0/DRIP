'use client';

import { useDripTheme } from '@/components/theme-provider';
import { Check } from 'lucide-react';

const SKINS = [
  { id: 'default', name: 'Default', description: 'Clean & Functional' },
  { id: 'minimalist', name: 'Minimalist', description: 'Quiet Luxury & Whitespace' },
  { id: 'streetwear', name: 'Streetwear', description: 'Bold & High Contrast' },
  { id: 'dark-academia', name: 'Dark Academia', description: 'Warm Tones & Editorial' },
];

export default function ProfilePage() {
  const { skin, setSkin } = useDripTheme();

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-extrabold tracking-tighter mb-8">Settings</h1>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          Adaptive UI Skin
          <span className="text-[10px] bg-black dark:bg-white text-white dark:text-black px-2 py-0.5 rounded-full uppercase">AI Detected</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SKINS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSkin(s.id as any)}
              className={`flex items-start justify-between p-6 rounded-3xl border text-left transition-all ${
                skin === s.id
                ? 'border-black dark:border-white ring-1 ring-black dark:ring-white bg-gray-50 dark:bg-gray-900'
                : 'border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600'
              }`}
            >
              <div>
                <h3 className="font-bold mb-1">{s.name}</h3>
                <p className="text-sm text-gray-500">{s.description}</p>
              </div>
              {skin === s.id && <Check className="text-black dark:text-white" size={20} />}
            </button>
          ))}
        </div>
      </section>

      <section className="p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold mb-4">Persona Intelligence</h2>
        <p className="text-gray-500 mb-6">
          DRIP learns your style preferences over time. Your current profile is being optimized based on your interactions.
        </p>
        <button className="text-sm font-bold underline decoration-2 underline-offset-4">
          View My Aesthetic DNA
        </button>
      </section>
    </div>
  );
}
