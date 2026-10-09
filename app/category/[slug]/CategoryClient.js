"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SkeletonCard, { SkeletonGrid } from "@/components/SkeletonCard";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/fallback-data";
import { toBn } from "@/lib/bangla";
import { ChevronDown } from "lucide-react";

export default function CategoryClient({ slug }) {
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");
  const [sortOpen, setSortOpen] = useState(false);

  const category = getCategoryBySlug(slug);
  let products = category ? getProductsByCategory(slug) : [];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [slug]);

  // Sort products
  const sortedProducts = [...products];
  if (sortBy === "price-low") {
    sortedProducts.sort((a, b) => a.today - b.today);
  } else if (sortBy === "price-high") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  const sortLabel =
    sortBy === "default"
      ? "ডিফল্ট"
      : sortBy === "price-low"
      ? "দাম: কম থেকে বেশি"
      : "দাম: বেশি থেকে কম";

  // Invalid category
  if (!category) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          ক্যাটাগরি পাওয়া যায়নি
        </h2>
        <p className="text-gray-500 mb-6">
          এই ক্যাটাগরিটি আমাদের তালিকায় নেই
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

  // Empty state
  if (!loading && sortedProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">{category.icon}</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {category.nameBn} - কোনো পণ্য নেই
        </h2>
        <p className="text-gray-500 mb-6">
          এই ক্যাটাগরিতে এখনো কোনো পণ্য যোগ করা হয়নি
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
    <div className="container mx-auto px-4 py-8 md:py-10">
      {/* Category Header Card */}
      <div className="bg-bazar-card rounded-2xl border border-gray-200/80 p-6 md:p-8 mb-5">
        <div className="flex items-center gap-4 md:gap-5">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-[#edf3ea] rounded-2xl flex items-center justify-center text-3xl md:text-4xl">
            {category.icon}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {category.nameBn}
            </h1>
            <p className="text-gray-500 mt-1 text-sm md:text-base">
              {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </div>

      {/* Sort Bar */}
      <div className="bg-bazar-card rounded-2xl border border-gray-200/80 p-4 md:p-5 mb-5">
        <div className="flex items-center justify-between">
          <span className="text-sm md:text-base font-medium text-gray-500">
            সাজান
          </span>
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 rounded-xl text-sm md:text-base font-medium text-gray-700 transition-colors"
            >
              {sortLabel}
              <ChevronDown size={16} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-40">
                <button
                  onClick={() => { setSortBy("default"); setSortOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 ${
                    sortBy === "default" ? "text-dhaner-shobuj font-semibold" : "text-gray-700"
                  }`}
                >
                  ডিফল্ট
                </button>
                <button
                  onClick={() => { setSortBy("price-low"); setSortOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 ${
                    sortBy === "price-low" ? "text-dhaner-shobuj font-semibold" : "text-gray-700"
                  }`}
                >
                  দাম: কম থেকে বেশি
                </button>
                <button
                  onClick={() => { setSortBy("price-high"); setSortOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 ${
                    sortBy === "price-high" ? "text-dhaner-shobuj font-semibold" : "text-gray-700"
                  }`}
                >
                  দাম: বেশি থেকে কম
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product count */}
      <p className="text-sm text-gray-500 mb-4">
        মোট {toBn(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Products grid */}
      {loading ? (
        <SkeletonGrid count={products.length || 4} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
