'use client';

import OutfitBuilder from '@/components/outfits/OutfitBuilder';
import { Sparkles, Bookmark, History, Plus } from 'lucide-react';
import Image from 'next/image';

export default function OutfitsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter mb-2">Outfits</h1>
          <p className="text-gray-500">Design looks, manage collections, and plan your style.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-6 py-3 rounded-full font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
            <Bookmark size={20} />
            My Collections
          </button>
          <button className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-6 py-3 rounded-full font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
            <History size={20} />
            History
          </button>
        </div>
      </div>

      <div className="space-y-12">
        <section>
          <div className="flex items-center gap-2 mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">Canvas Builder</h2>
            <div className="h-px flex-grow bg-gray-100 dark:bg-gray-900" />
            <span className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded-full font-bold">BETA</span>
          </div>
          <OutfitBuilder />
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-8">Saved Looks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-square bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] overflow-hidden mb-4 border border-gray-100 dark:border-gray-900 shadow-sm group-hover:shadow-xl transition-all duration-500 relative">
                  <div className="grid grid-cols-2 h-full">
                    <div className="relative border-r border-b border-white dark:border-black">
                      <Image src={`https://picsum.photos/seed/outfit-${i}-1/300/300`} alt="Outfit item" fill className="object-cover" />
                    </div>
                    <div className="relative border-b border-white dark:border-black">
                      <Image src={`https://picsum.photos/seed/outfit-${i}-2/300/300`} alt="Outfit item" fill className="object-cover" />
                    </div>
                    <div className="relative border-r border-white dark:border-black">
                      <Image src={`https://picsum.photos/seed/outfit-${i}-3/300/300`} alt="Outfit item" fill className="object-cover" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <Plus className="text-gray-400" />
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-lg">Travel Capsule {i + 1}</h3>
                <p className="text-sm text-gray-500">4 items • Created 2 days ago</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
