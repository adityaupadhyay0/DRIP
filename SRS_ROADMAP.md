# DRIP — Intelligent Fashion Decision Platform
## Software Requirements Specification + Development Roadmap
**Version 1.0 | Confidential**

---

## Naming Rationale

> **DRIP** — chosen deliberately.
> "Drip" is universal Gen Z / millennial fashion slang across cultures (US, UK, India, Nigeria, Korea).
> It means style, aesthetic confidence, personal flair.
> The name works globally, is short, memorable, and domain-squattable.
> Alternative names considered: **Fitt**, **Vybe**, **Aura**, **Loom**, **Worn**.
> Recommended: **DRIP** or **Loom** (Loom feels more premium/editorial).

---

## 1. Executive Summary

DRIP is an open-source, AI-powered intelligent fashion decision platform. It is not a marketplace. It is not a social media app. It is not a search engine.

It is a **personal fashion operating system** — a system that understands who you are, what you own, what suits you, and what you should buy next — then helps you act on that with confidence.

The product sits at the intersection of:
- **Commerce aggregation** (search across Myntra, Ajio, Zara, ASOS, H&M, Amazon, etc.)
- **AI style intelligence** (aesthetic modeling, wardrobe reasoning, outfit logic)
- **Taste & inspiration** (visual discovery, look recreation, outfit building)

**Revenue model:** Affiliate commissions from retailer click-throughs. Fully free to users. Open-source core so developers can plug in their own AI keys.

**Platform:** Web-first (Next.js PWA), native apps later.

**AI core:** Claude / GPT-4V / Gemini Vision APIs — swappable by self-hosters.

---

## 2. Problem Statement

### 2.1 The Structural Failure of Fashion Ecommerce

Current fashion ecommerce is architecturally broken:

| Problem | Current State | DRIP's Solution |
|---|---|---|
| Fragmentation | 10+ platforms, no unified view | Single intelligent search layer |
| Dumb search | Keyword/tag-based, not semantic | Intent-driven natural language search |
| No personalization | Generic recommendations | Persona engine + wardrobe memory |
| Inspiration gap | Screenshots die in camera roll | Upload → shoppable outfit |
| Impulse waste | No compatibility check | Wardrobe brain vetoes bad buys |
| Identity confusion | No aesthetic modeling | Aesthetic profiling + evolution |

### 2.2 What Google Cannot Build

Google owns: generic search, indexing, merchant relationships, ads.

Google cannot easily build:
- Wardrobe memory tied to identity
- Personal aesthetic modeling
- Outfit-level reasoning ("does this complete a look?")
- Cross-platform compatibility intelligence
- Trust layer ("this brand runs small for your body type")

This is the defensible opening.

---

## 3. Product Vision

### 3.1 Core Philosophy

> Current ecommerce optimizes: **transactions.**
> DRIP optimizes: **confidence.**

Every feature must answer: *does this help the user make a better fashion decision?*

If the answer is no — it does not ship.

### 3.2 Primary Entity Architecture

This is the single most important architectural decision:

**The primary entity is NOT a product. It is an OUTFIT.**

Then: **wardrobe → aesthetic → product** (in that order).

This changes:
- How search works (outfit-first, not product-first)
- How recommendations work (does this complete a look?)
- How retention works (users return to build, not just browse)
- How monetization works (contextual multi-item affiliate baskets)

### 3.3 The Persona Engine

The UI and recommendation system adapt to each user's detected aesthetic over time. There is no fixed UI skin. The system learns:

- Aesthetic vocabulary (minimalist, streetwear, old money, Y2K, techwear, clean girl, etc.)
- Color palette preferences
- Fit language (oversized, tailored, relaxed, structured)
- Price sensitivity
- Shopping behaviour patterns
- Body fit signals (entered via multiple methods — see §6.3)

Data is collected **progressively** — not in a single onboarding dump. Each interaction (save, skip, buy, upload) teaches the persona engine.

---

## 4. User Flows

### Flow 1 — Intent Shopping (Natural Language)

```
User types:
"minimal korean oversized summer wardrobe under ₹8k"

System:
1. Parses intent → aesthetic + budget + season + fit language
2. Generates outfit blueprint (top + bottom + footwear + layer)
3. Queries aggregated catalog for each slot
4. Ranks results by: aesthetic match + price fit + availability
5. Returns: full shoppable wardrobe, not isolated products
6. Shows: total cost, individual items, store links (affiliate)
```

**Key difference from Google Shopping:** The output is a *wardrobe*, not a *list of shirts*.

### Flow 2 — Visual Discovery (Upload Inspiration)

```
User uploads:
Pinterest screenshot / celebrity outfit / Instagram fit

System:
1. Vision AI detects clothing graph (item type, color, texture, silhouette)
2. Classifies aesthetic
3. Identifies each item
4. Finds shoppable alternatives across aggregated catalog
5. Adapts results to: user's budget + body signals + existing wardrobe
6. Returns: "recreate this look" outfit with real buyable items
```

**Key difference:** Not just image search. It adapts to *your* context, not the celebrity's.

### Flow 3 — Smart Wardrobe

```
User uploads wardrobe (photos / manual entry / barcode scan):

System learns:
- Color palette dominance
- Fit patterns
- Unused / underused items
- Missing wardrobe essentials
- Style evolution over time

System recommends:
- Only high-compatibility purchases
- "This shirt completes 14 outfits you already own"
- "You own 6 black basics but zero statement pieces"
```

**Key outcome:** Users trust DRIP because it protects them from bad purchases.

### Flow 4 — Outfit Builder

```
User builds:
- Daily looks
- Travel capsule wardrobes
- Seasonal wardrobes
- Occasion-specific outfits

System assists:
- Suggests missing items
- Flags aesthetic clashes
- Offers alternatives within budget
- Calculates cost-per-wear logic
```

---

## 5. System Architecture

### 5.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                    DRIP Frontend                     │
│              Next.js 14 (App Router)                 │
│         PWA-capable, system dark/light toggle        │
│      Adaptive UI skin based on persona engine        │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│                  API Gateway                         │
│              (Next.js API Routes)                    │
│     Auth | Rate limiting | Session management        │
└──┬──────────────┬──────────────┬────────────────────┘
   │              │              │
┌──▼───┐    ┌────▼────┐   ┌─────▼──────┐
│ Auth │    │  AI     │   │  Catalog   │
│Service│   │Orchestr-│   │ Aggregator │
│(Next-│   │ator     │   │  Service   │
│Auth) │   │(Claude/ │   │(scrape +   │
└──────┘   │GPT-4V/  │   │affiliate   │
           │Gemini)  │   │APIs)       │
           └────┬────┘   └─────┬──────┘
                │              │
┌───────────────▼──────────────▼──────────────────────┐
│                    Data Layer                        │
│   PostgreSQL (user data, wardrobe, outfits)          │
│   Redis (session cache, AI response cache)           │
│   S3-compatible storage (wardrobe images, uploads)   │
│   Vector DB - pgvector (aesthetic embeddings)        │
└─────────────────────────────────────────────────────┘
```

### 5.2 AI Orchestration Layer

The AI layer is **modular and swappable** — critical for open-source deployment.

```
AI Router
├── Vision tasks → Claude claude-sonnet-4-20250514 / GPT-4V / Gemini Vision
├── Semantic search → Embedding model (text-embedding-3-small or equivalent)
├── Aesthetic classification → Fine-tuned classifier (v1: prompt-based, v2: custom)
├── Outfit reasoning → LLM (Claude / GPT-4o)
└── Self-hosted fallback → Ollama (LLaVA for vision, Llama3 for text)
```

Config is via `.env` — users swap API keys to change provider. Open-source contributors can add new providers via a standard adapter interface.

### 5.3 Catalog Aggregation Strategy

This is the hardest infrastructure problem. Three-phase approach:

**Phase 1 (MVP):** Manually curated + affiliate network feeds
- Join: ShareASale, CJ Affiliate, Admitad, Awin
- Retailers: ASOS, H&M, Zara, Mango, Uniqlo (all have affiliate programs)
- India: Myntra Partner API, Ajio Affiliate, Amazon Associates
- Normalize all product data into DRIP's internal schema

**Phase 2 (Growth):** Automated catalog sync
- Scheduled scraping with structured data parsers
- Product feed ingestion (Google Shopping XML feeds — many retailers publish these)
- Price change webhooks

**Phase 3 (Scale):** Direct retailer partnerships + API agreements

**Internal Product Schema:**
```json
{
  "id": "drip_product_id",
  "source": "asos",
  "source_id": "retailer_sku",
  "affiliate_url": "tracked_link",
  "name": "Oversized Linen Shirt",
  "brand": "ASOS Design",
  "category": "tops/shirts",
  "aesthetic_tags": ["minimalist", "clean", "casual"],
  "fit_tags": ["oversized", "relaxed"],
  "color": { "primary": "#F5F0E8", "name": "ecru" },
  "price": { "amount": 1299, "currency": "INR" },
  "sizes": ["XS","S","M","L","XL"],
  "images": ["url1", "url2"],
  "embedding": [/* 1536-dim vector */],
  "in_stock": true,
  "last_updated": "2026-05-11T00:00:00Z"
}
```

---

## 6. Feature Specifications

### 6.1 Authentication

- Google OAuth + Apple Sign-In (NextAuth.js)
- No email/password — reduces friction, increases trust
- Guest mode: limited to 3 AI queries, no wardrobe save
- Session: JWT + refresh token, stored in httpOnly cookie

### 6.2 Persona Engine

Progressive data collection — never ask for everything at once.

**Signal sources (in order of collection):**

| Signal | When Collected | Weight |
|---|---|---|
| Aesthetic quiz (optional, 60 sec) | Post-login prompt | High |
| Saved items / outfits | Passive, ongoing | High |
| Skipped / dismissed items | Passive, ongoing | Medium |
| Search query language | Passive, ongoing | High |
| Uploaded inspiration images | On upload | Very High |
| Wardrobe uploads | When user adds wardrobe | Very High |
| Body data (see §6.3) | Optional, prompted | High |
| Purchase click-throughs | Passive, ongoing | Medium |

Persona is represented as a **vector embedding** + **structured profile object**:

```json
{
  "aesthetics": {
    "primary": "minimalist",
    "secondary": ["clean-girl", "quiet-luxury"],
    "confidence": 0.87
  },
  "color_palette": {
    "dominant": ["#F5F0E8", "#2C2C2C", "#8B7355"],
    "avoids": ["neon", "heavy-pattern"]
  },
  "fit_preferences": {
    "tops": "oversized",
    "bottoms": "straight-relaxed",
    "formality": "casual-smart"
  },
  "price_sensitivity": {
    "tops": { "sweet_spot": 800, "ceiling": 2500 },
    "footwear": { "sweet_spot": 3000, "ceiling": 8000 }
  }
}
```

### 6.3 Body Fit Personalization

Multiple input paths — user chooses their comfort level:

**Option A — Quick Fit Quiz**
Height, weight range, body shape descriptor (pear / apple / straight / hourglass / athletic), fit preference per category.

**Option B — Measurements Input**
Chest, waist, hips, inseam, shoulder width. Stored locally + encrypted.

**Option C — Photo-Based Estimation (Phase 2)**
Silhouette-only photo (no face, privacy-first). Vision AI estimates proportions. User confirms.

**Option D — Skip**
System uses only aesthetic + behavioral signals. Fit recommendations are less precise but still useful.

Body data is **never shared, never used for training without explicit consent, never visible to other users.**

### 6.4 AI Search (Intent-Driven)

Natural language input → outfit-level output.

**Query parsing pipeline:**
```
Input: "dark academic winter outfit under £150"

Parsed:
- aesthetic: dark_academic
- season: winter
- budget: £150 total
- implicit: layered, warm, formal-casual

Outfit blueprint generated:
- Outerwear slot: wool coat / structured blazer
- Top slot: turtleneck / button-down
- Bottom slot: wide-leg trousers / midi skirt
- Footwear slot: loafers / ankle boots
- Budget allocation: 40% outerwear, 25% bottom, 20% top, 15% footwear

Catalog query: each slot queried independently, results ranked by aesthetic embedding similarity
```

### 6.5 Visual Inspiration Upload

Accepts: JPEG, PNG, WebP, HEIC. Max 10MB.

**Pipeline:**
1. Image → Vision AI → clothing item detection
2. Each item classified: category + color + silhouette + aesthetic tags
3. Aesthetic fingerprint of full outfit extracted
4. Catalog search per item (embedding similarity + filter)
5. Results adapted to user's persona (budget, body, existing wardrobe)
6. Presented as: "Recreate this look" outfit board

### 6.6 Smart Wardrobe

Users build their wardrobe via:
- Photo upload (vision AI auto-classifies)
- Manual entry (category + color + brand)
- Barcode / tag scan (Phase 2)

**Wardrobe analytics shown:**
- Color distribution map
- Aesthetic coherence score
- Cost-per-wear tracking (if purchase prices entered)
- "Wardrobe gaps" — what's missing for more complete outfit options
- Outfit potential — "your current wardrobe can build X unique outfits"

### 6.7 Outfit Builder

Canvas-style interface. Users:
- Drag items from wardrobe or catalog
- Build and save complete looks
- Tag with: occasion, season, mood
- Share looks (optional, not social-media-first)

AI assist button: "Complete this outfit" — fills empty slots with catalog suggestions matching the aesthetic of items already on the canvas.

### 6.8 Affiliate & Commerce Layer

- All product links are affiliate-tracked
- Click-through → retailer site → purchase tracked via affiliate network
- DRIP never handles: payments, inventory, returns, shipping
- Commission rates vary by retailer (typically 4–15% of sale value)
- Revenue dashboard for founder (internal only at v1)

**Disclosure:** All affiliate relationships clearly disclosed in UI ("We may earn a commission").

---

## 7. Adaptive UI System

The UI adapts to the user's detected aesthetic profile. Not just color themes — actual component style shifts.

| Aesthetic Detected | UI Expression |
|---|---|
| Minimalist / Quiet Luxury | High whitespace, serif type, muted palette, no borders |
| Streetwear / Hypebeast | Bold type, high contrast, grid-heavy, saturated accents |
| Dark Academia | Warm dark tones, editorial serif, parchment textures |
| Y2K / Maximalist | Bright gradients, playful rounded type, dense layout |
| Clean Girl | Soft neutrals, rounded UI, light and airy spacing |
| Default (unknown) | Clean functional — utility-first, no style imposed |

System dark/light toggle is always available regardless of aesthetic skin.

Tech implementation: CSS custom properties + Tailwind themes + per-user theme object stored in session.

---

## 8. Open Source Architecture

DRIP ships as open source (MIT or Apache 2.0 license).

**What is open-sourced:**
- Full frontend (Next.js)
- Full backend (API routes, services)
- AI adapter interface (swap providers)
- Persona engine logic
- Outfit reasoning prompts

**What self-hosters provide:**
- Their own AI API keys (Claude, OpenAI, Gemini)
- Their own database (Postgres)
- Their own affiliate network credentials
- Their own S3-compatible storage

**Config file structure:**
```env
# AI Provider (pick one or many)
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-...

# Alternatively
AI_PROVIDER=openai
OPENAI_API_KEY=sk-...

# Or self-hosted
AI_PROVIDER=ollama
OLLAMA_BASE_URL=http://localhost:11434

# Database
DATABASE_URL=postgresql://...

# Storage
S3_BUCKET=...
S3_ENDPOINT=...

# Auth
GOOGLE_CLIENT_ID=...
APPLE_CLIENT_ID=...

# Affiliate
AWIN_API_KEY=...
CJ_API_KEY=...
```

---

## 9. Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| Frontend | Next.js 14 (App Router) | SSR + SSG + API routes in one, best DX for solo dev |
| Styling | Tailwind CSS + CSS vars | Adaptive theming, fast iteration |
| State | Zustand + React Query | Lightweight, no Redux overhead |
| Auth | NextAuth.js v5 | Google + Apple out of the box |
| Database | PostgreSQL (Supabase or self-hosted) | Relational + pgvector for embeddings |
| Cache | Redis (Upstash or self-hosted) | AI response caching, session |
| Storage | Cloudflare R2 / S3 | Wardrobe image storage |
| AI | Claude API (primary) + provider adapter | Swappable for open-source |
| Embeddings | OpenAI text-embedding-3-small | Best cost/quality for semantic search |
| Vector search | pgvector (Postgres extension) | Keeps stack simple, no separate vector DB |
| Deployment | Vercel (hosted) / Docker (self-hosted) | One-command deploy for both paths |
| CI/CD | GitHub Actions | Automated test + deploy |
| Analytics | Plausible (privacy-first) | No Google Analytics, open source compatible |

---

## 10. Data Model (Core Entities)

```
User
├── id, email, name, avatar
├── auth_provider (google | apple)
├── persona_profile (JSON)
├── body_profile (JSON, encrypted)
├── created_at, updated_at

WardrobeItem
├── id, user_id
├── category, subcategory
├── color_primary, color_hex
├── brand, name
├── fit_tags[], aesthetic_tags[]
├── image_url
├── purchase_price, purchase_date
├── embedding (vector 1536)

Outfit
├── id, user_id
├── name, occasion, season
├── items[] → WardrobeItem or CatalogProduct
├── aesthetic_tags[]
├── thumbnail_url
├── is_public (default false)

CatalogProduct
├── id, source, source_id
├── affiliate_url, commission_rate
├── name, brand, description
├── category, aesthetic_tags[], fit_tags[]
├── price, currency
├── images[]
├── embedding (vector 1536)
├── in_stock, last_updated

SavedItem
├── id, user_id
├── product_id OR outfit_id
├── saved_at, notes

AffiliateClick
├── id, user_id (nullable for guests)
├── product_id, retailer
├── clicked_at, session_id
```

---

## 11. Privacy & Data Philosophy

- User data belongs to the user. Full export available (GDPR-compliant JSON export).
- Social signals (saves, skips, searches) used to improve **that user's** persona engine only.
- Anonymised aggregate data (e.g. "oversized shirts trending this week") may be used for catalog prioritisation.
- No data sold to third parties. Ever.
- Body data encrypted at rest (AES-256). Never used for training without explicit opt-in consent.
- Open-source means users can audit exactly what is stored and how.
- Analytics: privacy-first (Plausible, no fingerprinting, no cross-site tracking).

---

## 12. Development Roadmap

### Phase 0 — Foundation (Weeks 1–3)

**Goal:** Working skeleton. Nothing AI yet.

- [x] Initialize Next.js 14 repo with TypeScript + Tailwind
- [x] Set up Supabase (Postgres + Auth + Storage)
- [x] Implement Google + Apple OAuth (NextAuth.js)
- [x] Basic routing: `/`, `/search`, `/wardrobe`, `/outfits`, `/profile`
- [x] Design system: tokens, typography, dark/light toggle
- [ ] Deploy to Vercel (CI/CD pipeline live)
- [x] Set up GitHub repo (public, MIT license, README)

**Deliverable:** Authenticated shell app, deployable, no AI.

---

### Phase 1 — Catalog Layer (Weeks 4–7)

**Goal:** Real shoppable products in the system.

- [x] Join affiliate networks: ShareASale, Awin, CJ, Amazon Associates, Myntra Partner (Simulated for Phase 1)
- [x] Build product ingestion pipeline (feed parser + normalizer)
- [x] Seed catalog: 5,000+ products across 10 retailers (Mock seeded for Phase 1)
- [x] Internal product schema + Postgres tables
- [x] Basic keyword search (In-memory for Phase 1, SQL schema ready)
- [x] Product cards UI + affiliate link click-tracking
- [x] Redis caching for product queries

**Deliverable:** Working product search with real affiliate links.

---

### Phase 2 — AI Core (Weeks 8–14)

**Goal:** The intelligence layer. This is the core product.

- [x] AI provider adapter (Claude primary, OpenAI fallback, Ollama self-host)
- [x] Intent search: NL query → outfit blueprint → catalog query → ranked results
- [x] Aesthetic classification system (prompt-based v1, embedding-based v2)
- [x] Visual inspiration upload: image → clothing graph → catalog matches
- [x] Persona engine v1: collect signals, build profile, influence results
- [x] Wardrobe upload: photo → vision AI → auto-classified item
- [ ] Outfit compatibility scoring (does this item match this wardrobe?)
- [x] pgvector setup + product embeddings indexed
- [x] Semantic search (embedding similarity over keyword)

**Deliverable:** All 4 core flows functional (intent search, visual upload, smart wardrobe, outfit builder).

---

### Phase 3 — Adaptive UI + Persona Engine (Weeks 15–19)

**Goal:** The product feels personal.

- [x] Aesthetic detection from behaviour signals
- [x] Adaptive UI theme system (6 aesthetic skins)
- [ ] Persona dashboard (user can see + edit their detected profile)
- [ ] Body fit input (quiz + measurements + optional photo — Phase 2 only quiz + measurements)
- [ ] Fit-adapted results (size/fit signals influence catalog ranking)
- [ ] Wardrobe analytics dashboard (color map, gap analysis, outfit potential)
- [ ] Outfit builder canvas (drag + drop, AI complete)
- [ ] Save / collection system

**Deliverable:** The app feels like it knows you after 10 minutes of use.

---

### Phase 4 — Polish + Open Source Launch (Weeks 20–24)

**Goal:** Production-quality. Community-ready.

- [ ] Performance audit (Core Web Vitals, image optimization)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Full GDPR compliance (data export, deletion, consent flows)
- [ ] Self-hosted Docker deployment (docker-compose.yml)
- [ ] Contributor documentation (CONTRIBUTING.md, architecture docs)
- [ ] API documentation (OpenAPI spec)
- [ ] Affiliate revenue dashboard (founder-only internal view)
- [ ] Open source launch: Product Hunt + Hacker News + GitHub

**Deliverable:** Public v1.0 launch. GitHub stars begin accumulating.

---

### Phase 5 — Growth Layer (Month 7–9)

**Goal:** Retention + word-of-mouth.

- [ ] Outfit sharing (optional, public link — not a feed)
- [ ] "Recreate this look" shareable cards (social-optimized image export)
- [ ] Price drop alerts (affiliate price tracking)
- [ ] Seasonal wardrobe planning (AI-generated capsule suggestions)
- [ ] Weekly "for you" digest (email, opt-in)
- [ ] Native mobile app (React Native — shared logic with web)

---

### Phase 6 — Scale + Intelligence (Month 10–12)

**Goal:** The moat deepens.

- [ ] Fine-tuned aesthetic classifier (custom model trained on curated dataset)
- [ ] Brand trust signals (community-sourced fit accuracy, material quality)
- [ ] Cost-per-wear analytics (full lifecycle view)
- [ ] Wardrobe resale integration (Depop / Vinted / eBay affiliate)
- [ ] Collaborative wardrobe features (couples, friends — shared outfit planning)
- [ ] Trend intelligence layer (aggregate signals → "oversized blazers rising")
- [ ] Direct retailer API partnerships

---

## 13. MVP Success Metrics

The MVP succeeds if, within 60 days of launch:

| Metric | Target |
|---|---|
| Users who return 3+ times in first week | > 30% |
| Avg AI queries per session | > 3 |
| Wardrobe upload rate | > 20% of signed-up users |
| Affiliate click-through rate | > 8% of product views |
| GitHub stars (open source signal) | > 500 |
| Session duration | > 6 minutes |

If users repeatedly return to build outfits and get recommendations — the core thesis is validated.

---

## 14. Risks & Mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| AI API costs spiral with scale | Medium | Aggressive response caching, prompt optimization, open-source users pay their own API costs |
| Affiliate programs change terms | Medium | Multi-network diversification, never rely on single network |
| Catalog data goes stale | High | Automated freshness checks, stock status polling |
| Taste abstraction is harder than expected | High | v1 uses LLM prompting, not custom models — iterate on quality before scale |
| Low wardrobe upload adoption | Medium | Make it instantly valuable — show "you can build X outfits" immediately on first upload |
| Google launches something similar | Low-Medium | Wardrobe memory + open source community = defensible moat |

---

## 15. Open Questions (To Resolve Before Phase 2)

1. **Primary aesthetic taxonomy** — finalize the initial set of ~20 aesthetic labels the system understands at launch.
2. **Catalog seeding strategy** — which 10 retailers to prioritize for initial 5,000-product seed?
3. **AI prompt library** — outfit reasoning prompts need to be battle-tested before launch. Build an internal eval set.
4. **Mobile breakpoint strategy** — web-first, but must be excellent on mobile browser (PWA). Define breakpoints early.
5. **Contributor onboarding** — for open source to work, the architecture must be approachable. Document decisions as you make them, not after.

---

*Document version 1.0 | Built with DRIP SRS framework | May 2026*
*This document is a living spec — update it as decisions are made.*
