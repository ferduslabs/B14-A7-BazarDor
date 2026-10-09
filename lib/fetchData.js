import { products as fallbackProducts, categories as fallbackCategories } from "./fallback-data";

const MAIN_API = "https://api.api-store.workers.dev/api/bazardor";
const ALT_API = "https://api.api-store.workers.dev/api/bazardor/alt";

async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

export async function fetchAllData() {
  // Try main API
  try {
    const data = await fetchWithTimeout(MAIN_API);
    if (data && data.products && data.products.length > 0) {
      return {
        products: data.products,
        categories: data.categories || fallbackCategories,
        source: "main-api",
      };
    }
  } catch (err) {
    // fall through
  }

  // Try alternative API
  try {
    const data = await fetchWithTimeout(ALT_API);
    if (data && data.products && data.products.length > 0) {
      return {
        products: data.products,
        categories: data.categories || fallbackCategories,
        source: "alt-api",
      };
    }
  } catch (err) {
    // fall through
  }

  // Use fallback data
  return {
    products: fallbackProducts,
    categories: fallbackCategories,
    source: "fallback",
  };
}

export async function fetchProduct(slug) {
  const data = await fetchAllData();
  const product = data.products.find((p) => p.slug === slug);
  return product || null;
}

export async function fetchCategoryProducts(categorySlug) {
  const data = await fetchAllData();
  const filtered = data.products.filter((p) => p.category === categorySlug);
  return {
    products: filtered,
    category: data.categories.find((c) => c.slug === categorySlug),
    categories: data.categories,
  };
}

export async function fetchCategories() {
  const data = await fetchAllData();
  return data.categories;
}
