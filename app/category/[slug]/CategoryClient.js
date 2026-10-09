"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { SkeletonGrid } from "@/components/SkeletonCard";
import { categories, getProductsByCategory, getCategoryBySlug } from "@/lib/fallback-data";
import Link from "next/link";
import { toBn } from "@/lib/bangla";
import { ArrowUpDown } from "lucide-react";

export default function CategoryClient({ slug }) {
  const [sortBy, setSortBy] = useState("default");

  const category = getCategoryBySlug(slug);
  const allProducts = getProductsByCategory(slug);

  const sortedProducts = useMemo(() => {
    const products = [...allProducts];
    switch (sortBy) {
      case "price-asc":
        return products.sort((a, b) => a.today - b.today);
      case "price-desc":
        return products.sort((a, b) => b.today - a.today);
      default:
        return products;
    }
  }, [allProducts, sortBy]);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🤔</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          ক্যাটাগরি পাওয়া যায়নি
        </h2>
        <p className="text-gray-500 mb-6">
          এই ক্যাটাগরিটি বিদ্যমান নেই
        </p>
        <Link
          href="/"
          className="inline-block bg-dhaner-shobuj text-white font-semibold px-6 py-2.5 rounded-xl"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl md:text-4xl">{category.icon}</span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {category.nameBn}
          </h1>
        </div>
        <p className="text-sm text-gray-500">
          {toBn(sortedProducts.length)}টি পণ্যের আজকের বাজার দাম
        </p>
      </div>

      {/* Sort + Grid */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div className="text-sm text-gray-600">
          মোট <span className="font-semibold">{toBn(sortedProducts.length)}</span>টি পণ্য
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">সাজান:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-bazar-card border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-dhaner-shobuj/50 cursor-pointer"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-asc">দাম: কম থেকে বেশি</option>
            <option value="price-desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📦</div>
          <p className="text-gray-500">এই ক্যাটাগরিতে কোনো পণ্য নেই</p>
        </div>
      )}

      {/* Other categories */}
      <div className="mt-12 pt-8 border-t border-gray-200/60">
        <h3 className="text-base font-semibold text-gray-800 mb-4">
          অন্যান্য ক্যাটাগরি
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories
            .filter((c) => c.slug !== slug)
            .map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="bg-bazar-card border border-gray-200 hover:border-dhaner-shobuj/30 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-dhaner-shobuj transition-colors"
              >
                {cat.icon} {cat.nameBn}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
