import { aiProvider } from './claude';
import { generateEmbedding } from './embeddings';
import { checkSemanticCache, saveToSemanticCache } from './cache-service';

export interface OutfitBlueprint {
  aesthetic: string;
  season: string;
  budget_allocation: Record<string, number>;
  slots: {
    category: string;
    description: string;
    weight: number;
  }[];
  logic: string;
}

const BLUEPRINT_PROMPT = `
You are a high-end fashion AI. Parse the user's intent into a structured "Outfit Blueprint".
Return ONLY valid JSON.

Schema:
{
  "aesthetic": "string",
  "season": "string",
  "budget_allocation": { "tops": number, "bottoms": number, ... },
  "slots": [
    { "category": "string", "description": "string", "weight": number }
  ],
  "logic": "brief explanation of why this outfit works"
}

User Intent: `;

export async function generateOutfitBlueprint(query: string): Promise<OutfitBlueprint> {
  // 1. Generate embedding for query
  const embedding = await generateEmbedding(query);

  // 2. Check semantic cache
  const cached = await checkSemanticCache(embedding);
  if (cached) {
    console.log('Semantic cache hit for intent:', query);
    return cached as OutfitBlueprint;
  }

  // 3. Call LLM if no cache hit
  const response = await aiProvider.generateText(`${BLUEPRINT_PROMPT} "${query}"`);

  try {
    // Attempt to parse JSON from response
    const jsonStr = response.text.match(/\{[\s\S]*\}/)?.[0] || response.text;
    const blueprint = JSON.parse(jsonStr);

    // 4. Save to cache
    await saveToSemanticCache(query, embedding, blueprint);

    return blueprint;
  } catch (error) {
    console.error('Failed to parse blueprint JSON:', response.text);
    throw new Error('Invalid blueprint generated');
  }
}
