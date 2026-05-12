# DRIP System Architecture

DRIP is built with a modular, service-oriented architecture using Next.js 14.

## Core Services

### 1. Catalog Aggregator (`src/lib/catalog-service.ts`)
Handles product ingestion, normalization, and search. Supports 5,000+ items with hybrid keyword/semantic search.

### 2. AI Orchestrator (`src/lib/ai/`)
- **Adapter Interface**: Abstract provider layer to support multiple LLMs.
- **Claude Provider**: Primary LLM for intent parsing and vision tasks.
- **Semantic Cache**: Supabase pgvector-backed cache to minimize token usage.
- **Embedding Service**: OpenAI-powered vector generation.

### 3. Persona Engine (`src/lib/persona-service.ts`)
Tracks user interactions (saves, skips) to build a style DNA profile. Dynamically updates the UI skin.

## Data Layer
- **PostgreSQL**: Primary relational storage.
- **pgvector**: For semantic search and intent caching.
- **Redis**: For high-speed search result caching.

## Deployment
- **Frontend**: Vercel (recommended) or Docker.
- **Database**: Supabase.
- **Cache**: Upstash Redis or self-hosted.
