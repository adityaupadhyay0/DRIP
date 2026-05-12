import { CatalogProduct } from '@/types/product';
import { v4 as uuidv4 } from 'uuid';

// Mock data generator for Phase 1
const BRANDS = ['ASOS Design', 'Zara', 'H&M', 'Uniqlo', 'Mango', 'Nike', 'Adidas', 'Levi\'s'];
const CATEGORIES = ['tops/shirts', 'tops/t-shirts', 'bottoms/trousers', 'bottoms/jeans', 'footwear/sneakers', 'outerwear/jackets'];
const AESTHETICS = ['minimalist', 'streetwear', 'dark academia', 'y2k', 'clean girl', 'quiet luxury'];

export function generateMockProduct(id: number): CatalogProduct {
  const brand = BRANDS[id % BRANDS.length];
  const category = CATEGORIES[id % CATEGORIES.length];
  const aesthetic = AESTHETICS[id % AESTHETICS.length];

  return {
    id: uuidv4(),
    source: 'mock_seed',
    source_id: `sku_${id}`,
    affiliate_url: `https://example.com/product/${id}?affid=drip`,
    name: `${aesthetic.charAt(0).toUpperCase() + aesthetic.slice(1)} ${category.split('/')[1]}`,
    brand: brand,
    description: `A high-quality ${aesthetic} ${category.split('/')[1]} from ${brand}. Perfect for any occasion.`,
    category: category,
    aesthetic_tags: [aesthetic],
    fit_tags: ['regular', id % 2 === 0 ? 'relaxed' : 'slim'],
    price: Math.floor(Math.random() * 5000) + 500,
    currency: 'INR',
    images: [`https://picsum.photos/seed/${id}/400/600`],
    in_stock: true,
    last_updated: new Date().toISOString()
  };
}

export async function seedCatalog(count: number = 100) {
  const products = Array.from({ length: count }, (_, i) => generateMockProduct(i));
  console.log(`Generated ${products.length} mock products for catalog.`);
  return products;
}
