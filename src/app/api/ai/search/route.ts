import { NextResponse } from 'next/server';
import { generateOutfitBlueprint } from '@/lib/ai/blueprint-service';
import { generateEmbedding } from '@/lib/ai/embeddings';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';

  if (!query) return NextResponse.json({ error: 'Query required' }, { status: 400 });

  try {
    // 1. Generate Outfit Blueprint (Token Optimized with Semantic Cache)
    const blueprint = await generateOutfitBlueprint(query);

    // 2. Fetch products for each slot in the blueprint
    const outfit = await Promise.all(blueprint.slots.map(async (slot) => {
      const slotEmbedding = await generateEmbedding(slot.description);

      const { data: products, error } = await supabase.rpc('match_products', {
        query_embedding: slotEmbedding,
        match_threshold: 0.5,
        match_count: 5,
        category_filter: slot.category
      });

      if (error) {
        console.error(`Search error for slot ${slot.category}:`, error);
        return { slot, products: [] };
      }

      return { slot, products };
    }));

    return NextResponse.json({ blueprint, outfit });
  } catch (error) {
    console.error('AI Search pipeline failed:', error);
    return NextResponse.json({ error: 'AI Search failed' }, { status: 500 });
  }
}
