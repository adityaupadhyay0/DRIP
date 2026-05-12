'use client';

import { useState, useEffect } from 'react';
import { CatalogProduct } from '@/types/product';
import ProductCard from '@/components/products/ProductCard';
import { Search as SearchIcon, Loader2 } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (searchQuery: string = '') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts(query);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col items-center mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">Find your next look</h1>
        <p className="text-gray-500 max-w-xl mb-8">
          Search across 10+ major retailers with DRIP&apos;s intelligent catalog aggregator.
        </p>

        <form onSubmit={handleSearch} className="relative w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search for minimalist shirts, Y2K jeans, etc..."
            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black dark:bg-white text-white dark:text-black px-4 py-1.5 rounded-xl text-sm font-bold hover:opacity-80"
          >
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="animate-spin text-gray-400 mb-4" size={40} />
          <p className="text-gray-500 font-medium">Scanning catalogs...</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-end mb-6 border-b border-gray-100 dark:border-gray-900 pb-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">
              {products.length} Results Found
            </h2>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl font-semibold mb-2">No products found</p>
              <p className="text-gray-500">Try adjusting your search terms or aesthetic.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
