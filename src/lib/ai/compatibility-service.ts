import { supabase } from "@/lib/supabase";
import { getEmbeddings } from "./embeddings";

/**
 * Service to calculate how well a new item fits into a user's existing wardrobe.
 */
export class CompatibilityService {
  /**
   * Calculates a compatibility score (0-1) between a product and a user's wardrobe.
   * Logic:
   * 1. Get product embedding.
   * 2. Find average similarity to top 5 most similar items in wardrobe.
   * 3. Return weighted score.
   */
  static async calculateCompatibility(userId: string, productEmbedding: number[]): Promise<number> {
    const { data, error } = await supabase.rpc("match_wardrobe_items", {
      query_embedding: productEmbedding,
      match_threshold: 0.5,
      match_count: 5,
      p_user_id: userId
    });

    if (error || !data || data.length === 0) {
      return 0.5; // Neutral score if wardrobe is empty or error
    }

    const avgSimilarity = data.reduce((acc: number, item: any) => acc + item.similarity, 0) / data.length;

    // Normalize and boost slightly if there are many matches
    return Math.min(1, avgSimilarity * 1.1);
  }

  static async getProductCompatibility(userId: string, productId: string): Promise<number> {
    // 1. Get product embedding
    const { data: product } = await supabase
      .from("products")
      .select("embedding")
      .eq("id", productId)
      .single();

    if (!product?.embedding) return 0.5;

    return this.calculateCompatibility(userId, product.embedding);
  }
}
