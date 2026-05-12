'use client';

import { useDripTheme } from '@/components/theme-provider';
import { Check, Sparkles, User, Shield, LogOut } from 'lucide-react';
import FitQuiz from '@/components/profile/FitQuiz';

const SKINS = [
  { id: 'default', name: 'Default', description: 'Clean & Functional' },
  { id: 'minimalist', name: 'Minimalist', description: 'Quiet Luxury & Whitespace' },
  { id: 'streetwear', name: 'Streetwear', description: 'Bold & High Contrast' },
  { id: 'dark-academia', name: 'Dark Academia', description: 'Warm Tones & Editorial' },
  { id: 'y2k', name: 'Y2K', description: 'Bright Gradients & Playful' },
  { id: 'clean-girl', name: 'Clean Girl', description: 'Soft Neutrals & Light Spacing' },
];

export default function ProfilePage() {
  const { skin, setSkin } = useDripTheme();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center gap-6 mb-12">
        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
          <User size={40} className="text-gray-400" />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter">My Persona</h1>
          <p className="text-gray-500">Manage your aesthetic and fashion profile.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          <section>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              Adaptive UI Skin
              <span className="text-[10px] bg-black dark:bg-white text-white dark:text-black px-2 py-0.5 rounded-full uppercase tracking-tighter">AI Detected</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SKINS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSkin(s.id as any)}
                  className={`flex items-start justify-between p-6 rounded-3xl border text-left transition-all ${
                    skin === s.id
                    ? 'border-black dark:border-white ring-1 ring-black dark:ring-white bg-gray-50 dark:bg-gray-900'
                    : 'border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 bg-white dark:bg-black'
                  }`}
                >
                  <div>
                    <h3 className="font-bold mb-1">{s.name}</h3>
                    <p className="text-xs text-gray-500">{s.description}</p>
                  </div>
                  {skin === s.id && <Check className="text-black dark:text-white" size={20} />}
                </button>
              ))}
            </div>
          </section>

          <section>
             <h2 className="text-xl font-bold mb-6">Body Fit Personalization</h2>
             <FitQuiz />
          </section>

          <section className="p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-blue-500" size={20} />
              <h2 className="text-xl font-bold">Persona Intelligence</h2>
            </div>
            <p className="text-gray-500 mb-6 text-sm leading-relaxed">
              DRIP is analyzing your behavior. Your current style DNA is leaning towards <span className="font-bold text-black dark:text-white">Minimalist</span> with a hint of <span className="font-bold text-black dark:text-white">Clean Girl</span>.
            </p>
            <div className="flex gap-4">
              <button className="text-sm font-bold bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-full">
                View Aesthetic DNA
              </button>
              <button className="text-sm font-bold border border-gray-200 dark:border-gray-700 px-6 py-2 rounded-full">
                Recalibrate
              </button>
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-3xl space-y-4">
            <h3 className="font-bold flex items-center gap-2">
              <Shield size={18} />
              Privacy & Security
            </h3>
            <p className="text-xs text-gray-500">
              Your body data and measurements are encrypted and only stored locally. We never sell your data to retailers.
            </p>
            <button className="text-xs font-bold underline">Manage Data Export</button>
          </div>

          <button className="w-full flex items-center justify-center gap-2 py-4 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 rounded-2xl font-bold hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
