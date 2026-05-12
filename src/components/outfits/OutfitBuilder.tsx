'use client';

import { useState } from 'react';
import { Plus, Sparkles, Save, RotateCcw, LayoutGrid } from 'lucide-react';

export default function OutfitBuilder() {
  const [slots, setSlots] = useState([
    { id: 'top', name: 'Top', item: null },
    { id: 'bottom', name: 'Bottom', item: null },
    { id: 'footwear', name: 'Footwear', item: null },
    { id: 'outerwear', name: 'Outerwear', item: null },
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Canvas */}
      <div className="lg:col-span-8">
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[3rem] p-12 min-h-[600px] relative">
          <div className="grid grid-cols-2 gap-8 h-full">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className="aspect-[3/4] border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-[2rem] flex flex-col items-center justify-center relative group hover:border-black dark:hover:border-white transition-all bg-white dark:bg-black shadow-sm"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Plus size={24} className="text-gray-400" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{slot.name}</p>
                </div>
                <button className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" aria-label={`Add ${slot.name}`} />
              </div>
            ))}
          </div>

          <div className="absolute bottom-8 right-8 flex gap-3">
             <button className="bg-black dark:bg-white text-white dark:text-black p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 font-bold px-6">
               <Sparkles size={20} />
               AI Complete
             </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="lg:col-span-4 space-y-8">
        <div className="p-8 border border-gray-200 dark:border-gray-800 rounded-[2rem] bg-white dark:bg-black shadow-sm">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <LayoutGrid size={20} />
            Builder Controls
          </h3>

          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-bold">
              <span>Save Outfit</span>
              <Save size={18} />
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-2xl border border-gray-100 dark:border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-bold">
              <span>Clear Canvas</span>
              <RotateCcw size={18} />
            </button>
          </div>
        </div>

        <div className="p-8 bg-blue-50 dark:bg-blue-900/20 rounded-[2rem] border border-blue-100 dark:border-blue-900/30">
          <h4 className="text-sm font-bold mb-2">Style Suggestion</h4>
          <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
            Try pairing these items with a <span className="font-bold">minimalist leather bag</span> to complete the Quiet Luxury aesthetic.
          </p>
        </div>
      </div>
    </div>
  );
}
