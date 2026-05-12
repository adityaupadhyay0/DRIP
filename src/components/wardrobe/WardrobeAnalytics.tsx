'use client';

import { Sparkles, PieChart, Info } from 'lucide-react';

export default function WardrobeAnalytics() {
  const colors = [
    { name: 'Black', hex: '#000000', percentage: 45 },
    { name: 'Ecru', hex: '#F5F0E8', percentage: 25 },
    { name: 'Navy', hex: '#000080', percentage: 15 },
    { name: 'Sage', hex: '#9CA995', percentage: 10 },
    { name: 'Others', hex: '#E5E7EB', percentage: 5 },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <PieChart size={20} className="text-gray-400" />
              Color Distribution
            </h3>
          </div>
          <div className="flex h-12 w-full rounded-full overflow-hidden mb-8 shadow-inner">
            {colors.map((c) => (
              <div
                key={c.name}
                style={{ width: `${c.percentage}%`, backgroundColor: c.hex }}
                className="h-full first:rounded-l-full last:rounded-r-full"
                title={`${c.name}: ${c.percentage}%`}
              />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {colors.map((c) => (
              <div key={c.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.hex }} />
                <span className="text-xs font-medium">{c.name}</span>
                <span className="text-[10px] text-gray-500">{c.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-black text-white rounded-[2.5rem] relative overflow-hidden">
          <Sparkles className="absolute top-6 right-6 text-yellow-400" size={32} />
          <h3 className="text-xl font-bold mb-4">Wardrobe Gaps</h3>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            Your wardrobe is strong on basics but lacks <span className="text-white font-bold underline decoration-yellow-400 underline-offset-4">Statement Outerwear</span>.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl border border-white/10">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-[10px] font-bold">TOP</div>
              <p className="text-xs font-medium">Add a structured wool blazer</p>
            </div>
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl border border-white/10">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-[10px] font-bold">ACC</div>
              <p className="text-xs font-medium">Consider silver-toned accessories</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-3xl border border-blue-100 dark:border-blue-900/30 flex items-start gap-4">
        <Info className="text-blue-500 shrink-0" size={20} />
        <div>
          <h4 className="text-sm font-bold text-blue-900 dark:text-blue-200 mb-1">Outfit Potential</h4>
          <p className="text-xs text-blue-700 dark:text-blue-300">
            Based on your current 14 items, you can create <span className="font-bold underline">42 unique outfit combinations</span>. Add a pair of relaxed trousers to unlock 12 more.
          </p>
        </div>
      </div>
    </div>
  );
}
