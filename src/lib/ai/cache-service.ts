import { supabase } from '../supabase';

export async function checkSemanticCache(embedding: number[], threshold: number = 0.95) {
  const { data, error } = await supabase.rpc('match_cache', {
    query_embedding: embedding,
    match_threshold: threshold,
    match_count: 1,
  });

  if (error) {
    console.error('Semantic cache error:', error);
    return null;
  }

  return data?.[0]?.blueprint_response || null;
}

export async function saveToSemanticCache(query: string, embedding: number[], response: any) {
  const { error } = await supabase.from('semantic_cache').insert({
    intent_query: query,
    intent_embedding: embedding,
    blueprint_response: response,
  });

  if (error) {
    console.error('Failed to save to semantic cache:', error);
  }
}
