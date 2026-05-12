-- Match products by vector similarity
CREATE OR REPLACE FUNCTION match_products (
  query_embedding vector(1536),
  match_threshold float,
  match_count int,
  category_filter text DEFAULT NULL,
  aesthetic_filter text DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  brand TEXT,
  price DECIMAL,
  category TEXT,
  aesthetic_tags TEXT[],
  images TEXT[],
  affiliate_url TEXT,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.name,
    p.brand,
    p.price,
    p.category,
    p.aesthetic_tags,
    p.images,
    p.affiliate_url,
    1 - (p.embedding <=> query_embedding) AS similarity
  FROM catalog_products p
  WHERE
    (1 - (p.embedding <=> query_embedding) > match_threshold)
    AND (category_filter IS NULL OR p.category ILIKE '%' || category_filter || '%')
    AND (aesthetic_filter IS NULL OR aesthetic_filter = ANY(p.aesthetic_tags))
  ORDER BY p.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
