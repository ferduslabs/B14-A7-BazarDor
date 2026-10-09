"use client";

import { useEffect, useState } from "react";
import { products as fallbackProducts, categories as fallbackCategories } from "./fallback-data";

export function useProducts() {
  const [products, setProducts] = useState(fallbackProducts);
  const [categories, setCategories] = useState(fallbackCategories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products || fallbackProducts);
          setCategories(data.categories || fallbackCategories);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { products, categories, loading, error };
}

export function useProduct(slug) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const found = fallbackProducts.find((p) => p.slug === slug);
        setProduct(found || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (slug) load();
  }, [slug]);

  return { product, loading, error };
}

export function useCategoryProducts(categorySlug) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filtered = fallbackProducts.filter((p) => p.category === categorySlug);
    const cat = fallbackCategories.find((c) => c.slug === categorySlug);
    setProducts(filtered);
    setCategory(cat || null);
    setLoading(false);
  }, [categorySlug]);

  return { products, category, loading };
}
