-- RPC for matching semantic cache
CREATE OR REPLACE FUNCTION match_cache (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  blueprint_response JSONB,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    sc.blueprint_response,
    1 - (sc.intent_embedding <=> query_embedding) AS similarity
  FROM semantic_cache sc
  WHERE 1 - (sc.intent_embedding <=> query_embedding) > match_threshold
  ORDER BY sc.intent_embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
