export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { seedCatalog } from '@/lib/catalog-service';
import { getCachedData, setCachedData } from '@/lib/redis';
import { generateEmbedding } from '@/lib/ai/embeddings';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  const aesthetic = searchParams.get('aesthetic')?.toLowerCase() || '';
  const category = searchParams.get('category')?.toLowerCase() || '';
  const fitPreference = searchParams.get('fit')?.toLowerCase() || '';

  const cacheKey = `search:${query}:${aesthetic}:${category}:${fitPreference}`;

  const cachedResults = await getCachedData(cacheKey);
  if (cachedResults) return NextResponse.json(cachedResults);

  // If query is present, attempt semantic re-ranking if supabase is available
  if (query && supabase) {
    try {
      const queryEmbedding = await generateEmbedding(query);
      const { data: products, error } = await supabase.rpc('match_products', {
        query_embedding: queryEmbedding,
        match_threshold: 0.3,
        match_count: 50,
        category_filter: category !== 'all' ? category : null,
        aesthetic_filter: aesthetic !== 'all' ? aesthetic : null
      });

      if (!error && products && products.length > 0) {
        // Boost products matching user's fit preference
        let results = products;
        if (fitPreference) {
          results = [...products].sort((a: any, b: any) => {
             const aMatch = a.fit_tags?.some((t: string) => t.toLowerCase() === fitPreference) ? 1 : 0;
             const bMatch = b.fit_tags?.some((t: string) => t.toLowerCase() === fitPreference) ? 1 : 0;
             return bMatch - aMatch;
          });
        }
        await setCachedData(cacheKey, results);
        return NextResponse.json(results);
      }
    } catch (e) {
      console.error('Semantic search fallback to mock');
    }
  }

  // Fallback to mock catalog for development/demo
  const allProducts = await seedCatalog(5000);
  let filteredProducts = allProducts;

  if (query) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  }

  if (aesthetic && aesthetic !== 'all') {
    filteredProducts = filteredProducts.filter(product =>
      product.aesthetic_tags.some(tag => tag.toLowerCase() === aesthetic)
    );
  }

  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter(product =>
      product.category.toLowerCase().includes(category)
    );
  }

  // Apply fit ranking in mock fallback too
  if (fitPreference) {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      const aMatch = a.fit_tags.some(t => t.toLowerCase() === fitPreference) ? 1 : 0;
      const bMatch = b.fit_tags.some(t => t.toLowerCase() === fitPreference) ? 1 : 0;
      return bMatch - aMatch;
    });
  }

  const limitedResults = filteredProducts.slice(0, 100);
  await setCachedData(cacheKey, limitedResults);

  return NextResponse.json(limitedResults);
}
