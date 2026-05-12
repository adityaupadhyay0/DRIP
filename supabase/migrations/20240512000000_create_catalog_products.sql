-- Enable pgvector if available
CREATE EXTENSION IF NOT EXISTS vector;

-- Create CatalogProduct table
CREATE TABLE IF NOT EXISTS catalog_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL,
  source_id TEXT NOT NULL,
  affiliate_url TEXT NOT NULL,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  aesthetic_tags TEXT[] DEFAULT '{}',
  fit_tags TEXT[] DEFAULT '{}',
  price DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  images TEXT[] DEFAULT '{}',
  in_stock BOOLEAN DEFAULT true,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  embedding vector(1536), -- Assuming OpenAI text-embedding-3-small

  -- Full-text search index
  search_vector tsvector GENERATED ALWAYS AS (
    to_tsvector('english', name || ' ' || brand || ' ' || COALESCE(description, ''))
  ) STORED
);

-- Index for full-text search
CREATE INDEX IF NOT EXISTS idx_products_search ON catalog_products USING GIN (search_vector);

-- Unique constraint to prevent duplicate ingestion from same source
CREATE UNIQUE INDEX IF NOT EXISTS idx_products_source_id ON catalog_products (source, source_id);
