export interface CatalogProduct {
  id: string;
  source: string;
  source_id: string;
  affiliate_url: string;
  name: string;
  brand: string;
  description: string;
  category: string;
  aesthetic_tags: string[];
  fit_tags: string[];
  price: number;
  currency: string;
  images: string[];
  in_stock: boolean;
  last_updated: string;
  embedding?: number[]; // For future pgvector use
}
