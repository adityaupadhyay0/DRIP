-- Semantic cache for AI intents
CREATE TABLE IF NOT EXISTS semantic_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  intent_query TEXT NOT NULL,
  intent_embedding vector(1536) NOT NULL,
  blueprint_response JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for vector similarity search on intents
CREATE INDEX IF NOT EXISTS idx_cache_embedding ON semantic_cache USING ivfflat (intent_embedding vector_cosine_ops) WITH (lists = 100);
