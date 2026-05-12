'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 py-4 px-6 flex items-center justify-between sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-md z-50">
      <Link href="/" className="text-2xl font-bold tracking-tighter">DRIP</Link>
      <div className="flex gap-6 items-center">
        <Link href="/search" className="text-sm font-medium hover:opacity-70 transition-opacity">Search</Link>
        <Link href="/wardrobe" className="text-sm font-medium hover:opacity-70 transition-opacity">Wardrobe</Link>
        <Link href="/outfits" className="text-sm font-medium hover:opacity-70 transition-opacity">Outfits</Link>
        <Link href="/profile" className="text-sm font-medium hover:opacity-70 transition-opacity">Profile</Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
