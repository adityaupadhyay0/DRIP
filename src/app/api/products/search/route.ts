import { NextResponse } from 'next/server';
import { seedCatalog } from '@/lib/catalog-service';
import { getCachedData, setCachedData } from '@/lib/redis';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  const cacheKey = `search:${query}`;

  // Try to get from cache first
  const cachedResults = await getCachedData(cacheKey);
  if (cachedResults) {
    return NextResponse.json(cachedResults);
  }

  // For Phase 1 MVP, we use the mock seeder and filter in-memory
  const allProducts = await seedCatalog(200);

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.brand.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query) ||
    product.aesthetic_tags.some(tag => tag.toLowerCase().includes(query))
  );

  // Cache the result for 1 hour
  await setCachedData(cacheKey, filteredProducts);

  return NextResponse.json(filteredProducts);
}
