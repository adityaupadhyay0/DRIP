import { NextResponse } from 'next/server';
import { seedCatalog } from '@/lib/catalog-service';
import { getCachedData, setCachedData } from '@/lib/redis';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  const aesthetic = searchParams.get('aesthetic')?.toLowerCase() || '';
  const category = searchParams.get('category')?.toLowerCase() || '';

  const cacheKey = `search:${query}:${aesthetic}:${category}`;

  // Try to get from cache first
  const cachedResults = await getCachedData(cacheKey);
  if (cachedResults) {
    return NextResponse.json(cachedResults);
  }

  // Generate mock catalog (5000 items)
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

  // Limit results for UI performance
  const limitedResults = filteredProducts.slice(0, 100);

  // Cache the result for 1 hour
  await setCachedData(cacheKey, limitedResults);

  return NextResponse.json(limitedResults);
}
