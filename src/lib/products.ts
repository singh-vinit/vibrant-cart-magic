export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: string;
  image: string;
  badge?: "Bestseller" | "New" | "Trending";
}

export interface CategoryVisual {
  emoji: string;
  color: string;
}

export interface CategoryOption extends CategoryVisual {
  id: number;
  name: string;
  slug: string;
}

interface ApiCategory {
  id: number;
  name: string;
  slug: string;
  image: string;
}

interface ApiProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: ApiCategory;
  images: string[];
}

interface FetchProductsParams {
  title?: string;
  categoryId?: number;
  categorySlug?: string;
  priceMin?: number;
  priceMax?: number;
  limit?: number;
  offset?: number;
}

const API_BASE = "https://api.escuelajs.co/api/v1";

const categoryVisualMap: Record<string, CategoryVisual> = {
  clothes: { emoji: "👕", color: "hsl(330, 91%, 58%)" },
  electronics: { emoji: "📱", color: "hsl(262, 93%, 58%)" },
  furniture: { emoji: "🛋️", color: "hsl(200, 80%, 50%)" },
  shoes: { emoji: "👟", color: "hsl(30, 90%, 55%)" },
  misc: { emoji: "✨", color: "hsl(140, 60%, 45%)" },
};

const fallbackCategoryVisuals: CategoryVisual[] = [
  { emoji: "🛍️", color: "hsl(340, 80%, 60%)" },
  { emoji: "🎯", color: "hsl(20, 88%, 56%)" },
  { emoji: "🎁", color: "hsl(210, 75%, 52%)" },
  { emoji: "🔥", color: "hsl(12, 90%, 58%)" },
];

const toHash = (value: string): number => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
};

const formatReviews = (value: number): string => {
  if (value >= 1000) {
    const rounded = Math.round((value / 1000) * 10) / 10;
    return `${rounded}k`;
  }
  return `${value}`;
};

const deriveBrand = (title: string): string => {
  const firstWord = title
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim()
    .split(/\s+/)[0];

  return firstWord ? firstWord.slice(0, 1).toUpperCase() + firstWord.slice(1) : "Generic";
};

export const getCategoryVisual = (slug: string): CategoryVisual => {
  const normalizedSlug = slug.toLowerCase();
  const fallback = fallbackCategoryVisuals[toHash(normalizedSlug) % fallbackCategoryVisuals.length];
  return categoryVisualMap[normalizedSlug] ?? fallback;
};

const getBadge = (seed: number): Product["badge"] => {
  const mod = seed % 12;
  if (mod < 3) return "Bestseller";
  if (mod < 6) return "Trending";
  if (mod < 8) return "New";
  return undefined;
};

const mapApiProductToProduct = (apiProduct: ApiProduct): Product => {
  const seed = toHash(`${apiProduct.id}-${apiProduct.title}`);
  const markupPercent = 20 + (seed % 35);
  const originalPrice = Math.max(
    apiProduct.price + 1,
    Math.round((apiProduct.price * (100 + markupPercent)) / 100)
  );
  const discount = Math.max(1, Math.round(((originalPrice - apiProduct.price) / originalPrice) * 100));
  const rating = Math.round((3.5 + ((seed % 15) / 10)) * 10) / 10;
  const reviews = formatReviews(150 + (seed % 24000));

  return {
    id: String(apiProduct.id),
    name: apiProduct.title,
    category: apiProduct.category.name,
    categorySlug: apiProduct.category.slug,
    brand: deriveBrand(apiProduct.title),
    price: apiProduct.price,
    originalPrice,
    discount,
    rating,
    reviews,
    image: apiProduct.images[0] || apiProduct.category.image,
    badge: getBadge(seed),
  };
};

export const fetchProducts = async (params: FetchProductsParams = {}): Promise<Product[]> => {
  const query = new URLSearchParams();

  if (params.title) query.set("title", params.title);
  if (params.categoryId) query.set("categoryId", String(params.categoryId));
  if (params.categorySlug) query.set("categorySlug", params.categorySlug);
  if (typeof params.priceMin === "number") query.set("price_min", String(params.priceMin));
  if (typeof params.priceMax === "number") query.set("price_max", String(params.priceMax));
  query.set("limit", String(params.limit ?? 120));
  query.set("offset", String(params.offset ?? 0));

  const response = await fetch(`${API_BASE}/products?${query.toString()}`);
  if (!response.ok) {
    throw new Error(`Products API failed with status ${response.status}`);
  }

  const data = (await response.json()) as ApiProduct[];
  return data.map(mapApiProductToProduct);
};

export const fetchCategories = async (): Promise<CategoryOption[]> => {
  const response = await fetch(`${API_BASE}/categories`);
  if (!response.ok) {
    throw new Error(`Categories API failed with status ${response.status}`);
  }

  const data = (await response.json()) as ApiCategory[];

  return data.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    ...getCategoryVisual(category.slug),
  }));
};
