import { NextResponse } from 'next/server';
import { aiProvider } from '@/lib/ai/claude';
import { generateEmbedding } from '@/lib/ai/embeddings';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { imageUrl } = await request.json();

    // 1. Vision AI: Extract Clothing Graph
    const visionResponse = await aiProvider.analyzeImage(imageUrl, `
      Detect all clothing items in this image.
      For each item, return: category, color, silhouette, and aesthetic tags.
      Format as JSON: { "items": [{ "category": "...", "description": "...", "tags": [...] }] }
    `);

    // Mocking vision parsing for Phase 2 demo
    const mockItems = [
      { category: 'tops', description: 'minimalist oversized ecru shirt', tags: ['minimalist', 'clean'] },
      { category: 'bottoms', description: 'straight leg raw denim jeans', tags: ['streetwear', 'classic'] }
    ];

    // 2. Find shoppable alternatives for each detected item
    const matches = await Promise.all(mockItems.map(async (item) => {
      const embedding = await generateEmbedding(item.description);
      const { data: products } = await supabase.rpc('match_products', {
        query_embedding: embedding,
        match_threshold: 0.4,
        match_count: 4,
        category_filter: item.category
      });
      return { item, matches: products || [] };
    }));

    return NextResponse.json({ matches });
  } catch (error) {
    return NextResponse.json({ error: 'Vision task failed' }, { status: 500 });
  }
}
