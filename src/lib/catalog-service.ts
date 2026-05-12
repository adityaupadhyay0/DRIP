import { CatalogProduct } from '@/types/product';
import { v4 as uuidv4 } from 'uuid';

const BRANDS = ['ASOS Design', 'Zara', 'H&M', 'Uniqlo', 'Mango', 'Nike', 'Adidas', 'Levi\'s', 'New Balance', 'Patagonia'];
const CATEGORIES = ['tops/shirts', 'tops/t-shirts', 'bottoms/trousers', 'bottoms/jeans', 'footwear/sneakers', 'outerwear/jackets', 'accessories/bags'];
const AESTHETICS = ['minimalist', 'streetwear', 'dark academia', 'y2k', 'clean girl', 'quiet luxury', 'techwear', 'vintage'];

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

// In-memory cache for the large mock catalog to avoid re-generating on every search
let cachedCatalog: CatalogProduct[] | null = null;

export async function seedCatalog(count: number = 5000) {
  if (cachedCatalog && cachedCatalog.length >= count) {
    return cachedCatalog;
  }

  console.log(`Generating ${count} mock products...`);
  const products = Array.from({ length: count }, (_, i) => generateMockProduct(i));
  cachedCatalog = products;
  return products;
}
