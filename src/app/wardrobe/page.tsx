'use client';

import WardrobeAnalytics from '@/components/wardrobe/WardrobeAnalytics';
import { Plus, Camera, ScanBarcode } from 'lucide-react';
import Image from 'next/image';

export default function WardrobePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter mb-2">My Wardrobe</h1>
          <p className="text-gray-500">Manage your collection and analyze your style.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-bold hover:opacity-80 transition-all shadow-lg">
            <Plus size={20} />
            Add Item
          </button>
          <button className="flex items-center justify-center w-12 h-12 border border-gray-200 dark:border-gray-800 rounded-full hover:bg-gray-50 dark:hover:bg-gray-900 transition-all">
            <Camera size={20} />
          </button>
          <button className="flex items-center justify-center w-12 h-12 border border-gray-200 dark:border-gray-800 rounded-full hover:bg-gray-50 dark:hover:bg-gray-900 transition-all">
            <ScanBarcode size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Wardrobe Insights</h2>
          <WardrobeAnalytics />
        </section>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">Items (14)</h2>
            <div className="flex gap-2">
              {['All', 'Tops', 'Bottoms', 'Footwear', 'Outerwear'].map(cat => (
                <button key={cat} className="text-xs font-bold px-3 py-1 rounded-full border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900">
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden relative group">
                <Image
                  src={`https://picsum.photos/seed/wardrobe-${i}/300/400`}
                  alt="Wardrobe Item"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                  <button className="bg-white text-black text-[10px] font-bold px-3 py-1.5 rounded-full">View Details</button>
                </div>
              </div>
            ))}
            <button className="aspect-[3/4] border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl flex flex-col items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:border-gray-400 transition-all">
              <Plus size={32} />
              <span className="text-xs font-bold mt-2">Add New</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
