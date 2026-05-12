-- Add persona_profile to users (if not handled by NextAuth automatically)
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS persona_profile JSONB;
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS body_profile JSONB;

-- Wardrobe Items table
CREATE TABLE IF NOT EXISTS public.wardrobe_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT,
    subcategory TEXT,
    brand TEXT,
    color_primary TEXT,
    color_hex TEXT,
    image_url TEXT,
    embedding vector(1536),
    aesthetic_tags TEXT[],
    fit_tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.wardrobe_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own wardrobe items"
    ON public.wardrobe_items
    FOR ALL
    USING (auth.uid() = user_id);

-- Match wardrobe items RPC
CREATE OR REPLACE FUNCTION match_wardrobe_items (
  query_embedding vector(1536),
  match_threshold float,
  match_count int,
  p_user_id uuid
)
RETURNS TABLE (
  id uuid,
  name text,
  image_url text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    wi.id,
    wi.name,
    wi.image_url,
    1 - (wi.embedding <=> query_embedding) AS similarity
  FROM public.wardrobe_items wi
  WHERE wi.user_id = p_user_id
    AND 1 - (wi.embedding <=> query_embedding) > match_threshold
  ORDER BY wi.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
