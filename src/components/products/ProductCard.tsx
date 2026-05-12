'use client';

import { CatalogProduct } from '@/types/product';
import Image from 'next/image';

interface ProductCardProps {
  product: CatalogProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleAffiliateClick = async () => {
    try {
      await fetch('/api/affiliate/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          retailer: product.brand
        }),
      });
    } catch (error) {
      console.error('Failed to track affiliate click');
    }
  };

  return (
    <div className="group border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900">
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-white/90 dark:bg-black/90 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-gray-200 dark:border-gray-800">
            {product.brand}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-sm font-semibold truncate flex-grow mr-2">{product.name}</h3>
          <p className="text-sm font-bold">₹{product.price.toLocaleString()}</p>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 capitalize">{product.category.replace('/', ' ')}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {product.aesthetic_tags.map(tag => (
            <span key={tag} className="text-[9px] bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-gray-600 dark:text-gray-400">
              #{tag.replace(' ', '')}
            </span>
          ))}
        </div>
        <a
          href={product.affiliate_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleAffiliateClick}
          className="block w-full text-center bg-black dark:bg-white text-white dark:text-black text-xs font-bold py-2.5 rounded-lg hover:opacity-80 transition-opacity"
        >
          View on {product.source === 'mock_seed' ? 'Retailer' : product.source}
        </a>
      </div>
    </div>
  );
}
