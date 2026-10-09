"use client";

import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";
import { getProductBySlug, getCategoryBySlug, categories } from "@/lib/fallback-data";
import { toBn, formatUnit } from "@/lib/bangla";

export default function ProductDetailClient({ slug }) {
  const product = getProductBySlug(slug);
  const category = product ? getCategoryBySlug(product.category) : null;

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          পণ্যটি পাওয়া যায়নি
        </h2>
        <p className="text-gray-500 mb-6">
          এই পণ্যটি আমাদের তালিকায় নেই
        </p>
        <Link
          href="/"
          className="inline-block bg-dhaner-shobuj text-white font-semibold px-6 py-2.5 rounded-xl"
        >
          হোমে ফিরে যান
        </Link>
      </div>
    );
  }

  const { dir, pct } = product.change;
  const allMarkets = product.markets || [];
  const minPrice = allMarkets.length > 0 ? Math.min(...allMarkets.map((m) => m.min)) : product.today;
  const maxPrice = allMarkets.length > 0 ? Math.max(...allMarkets.map((m) => m.max)) : product.today;
  const avgPrice = allMarkets.length > 0
    ? Math.round(allMarkets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / allMarkets.length)
    : product.today;

  // Find which market has min and max
  const minMarket = allMarkets.length > 0 ? allMarkets.reduce((min, m) => m.min < min.min ? m : min) : null;
  const maxMarket = allMarkets.length > 0 ? allMarkets.reduce((max, m) => m.max > max.max ? m : max) : null;

  const changeColor = dir === "up" ? "text-price-up" : dir === "down" ? "text-price-down" : "text-price-flat";
  const changeIcon = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-5">
        <Link href="/" className="hover:text-dhaner-shobuj transition-colors">
          হোম
        </Link>
        <span className="text-gray-400">›</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-dhaner-shobuj transition-colors"
        >
          {category?.nameBn || product.category}
        </Link>
        <span className="text-gray-400">›</span>
        <span className="text-gray-800 font-medium">{product.nameBn}</span>
      </nav>

      {/* Product Summary Card */}
      <div className="bg-bazar-card rounded-2xl border border-gray-200/80 p-6 md:p-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex items-start gap-4 md:gap-5">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#edf3ea] rounded-2xl flex items-center justify-center text-4xl md:text-5xl flex-shrink-0">
              {product.image}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1.5">
                {product.nameBn}
              </h1>
              <p className="text-gray-500 text-sm md:text-base mb-2">
                {formatUnit(product.unit)} · {category?.nameBn || product.category}
              </p>
              <p className="text-gray-600 text-sm md:text-base">
                {product.description}
              </p>
            </div>
          </div>

          {/* Price Badge */}
          <div className="bg-[#edf3ea] rounded-2xl p-4 md:p-5 text-center flex-shrink-0">
            <p className="text-sm text-gray-600 font-medium mb-1">আজকের দাম</p>
            <p className="text-3xl md:text-4xl font-bold text-gray-800">
              {toBn(product.today)}
            </p>
            <p className="text-sm text-gray-600 mt-0.5">
              টাকা / {formatUnit(product.unit).replace("প্রতি ", "")}
            </p>
            <p className={`text-base font-semibold mt-2 ${changeColor}`}>
              {changeIcon} {toBn(pct)}%
            </p>
          </div>
        </div>
      </div>

      {/* Price Summary + Market Table Card */}
      <div className="bg-bazar-card rounded-2xl border border-gray-200/80 p-6 md:p-8">
        {/* Price Summary */}
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-5">
          দামের সারসংক্ষেপ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#f0f7f0] rounded-2xl p-5 text-center border border-green-100">
            <p className="text-sm text-gray-600 mb-1">সর্বনিম্ন দাম</p>
            <p className="text-2xl md:text-3xl font-bold text-green-600 mb-1">
              {toBn(minPrice)} টাকা
            </p>
            <p className="text-xs text-gray-500">
              {minMarket ? `সবচেয়ে কম দামের বাজার` : "—"}
            </p>
          </div>
          <div className="bg-[#fef2f2] rounded-2xl p-5 text-center border border-red-100">
            <p className="text-sm text-gray-600 mb-1">সর্বোচ্চ দাম</p>
            <p className="text-2xl md:text-3xl font-bold text-red-600 mb-1">
              {toBn(maxPrice)} টাকা
            </p>
            <p className="text-xs text-gray-500">
              {maxMarket ? `সবচেয়ে বেশি দামের বাজার` : "—"}
            </p>
          </div>
          <div className="bg-[#f0f7f0] rounded-2xl p-5 text-center border border-green-100">
            <p className="text-sm text-gray-600 mb-1">গড় দাম</p>
            <p className="text-2xl md:text-3xl font-bold text-green-600 mb-1">
              {toBn(avgPrice)} টাকা
            </p>
            <p className="text-xs text-gray-500">
              {formatUnit(product.unit)}-এর হিসাবে
            </p>
          </div>
        </div>

        {/* Market-wise Prices Table */}
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
          বাজারভিত্তিক আজকের দাম
        </h3>
        {allMarkets.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f0f4ee] border-b border-gray-200">
                  <th className="text-left py-3 px-4 md:px-5 text-sm font-semibold text-gray-700">
                    বাজার
                  </th>
                  <th className="text-left py-3 px-4 md:px-5 text-sm font-semibold text-gray-700">
                    বিভাগ
                  </th>
                  <th className="text-right py-3 px-4 md:px-5 text-sm font-semibold text-gray-700">
                    সর্বনিম্ন
                  </th>
                  <th className="text-right py-3 px-4 md:px-5 text-sm font-semibold text-gray-700">
                    সর্বোচ্চ
                  </th>
                  <th className="text-right py-3 px-4 md:px-5 text-sm font-semibold text-gray-700">
                    গড়
                  </th>
                </tr>
              </thead>
              <tbody>
                {allMarkets.map((market, idx) => {
                  const avg = Math.round((market.min + market.max) / 2);
                  return (
                    <tr
                      key={idx}
                      className={`border-b border-gray-100 last:border-b-0 ${
                        idx % 2 === 1 ? "bg-[#f4f7f1]" : ""
                      }`}
                    >
                      <td className="py-3 px-4 md:px-5 text-sm font-medium text-gray-800">
                        {market.market}
                      </td>
                      <td className="py-3 px-4 md:px-5 text-sm text-gray-600">
                        {market.division}
                      </td>
                      <td className="py-3 px-4 md:px-5 text-sm font-semibold text-green-600 text-right">
                        {toBn(market.min)} টাকা
                      </td>
                      <td className="py-3 px-4 md:px-5 text-sm font-semibold text-red-600 text-right">
                        {toBn(market.max)} টাকা
                      </td>
                      <td className="py-3 px-4 md:px-5 text-sm font-semibold text-gray-800 text-right">
                        {toBn(avg)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            কোনো বাজারের তথ্য পাওয়া যায়নি
          </p>
        )}
      </div>

      {/* Related Categories */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          আরও ক্যাটাগরি দেখুন
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories
            .filter((c) => c.slug !== product.category)
            .slice(0, 6)
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
