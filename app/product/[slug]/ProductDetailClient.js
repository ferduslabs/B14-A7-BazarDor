"use client";

import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";
import { getProductBySlug, getCategoryBySlug, categories } from "@/lib/fallback-data";
import { toBn, formatUnit } from "@/lib/bangla";
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from "lucide-react";

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

  // Approximate last week and last month from change trend
  const lastWeek = Math.round(product.yesterday * (1 + (product.today - product.yesterday) / product.yesterday * 0.6));
  const lastMonth = Math.round(product.yesterday * (1 + (product.today - product.yesterday) / product.yesterday * 2.5));

  const changeColor =
    dir === "up" ? "text-price-up" : dir === "down" ? "text-price-down" : "text-price-flat";
  const changeBg =
    dir === "up"
      ? "bg-red-50 border-red-100"
      : dir === "down"
      ? "bg-green-50 border-green-100"
      : "bg-gray-50 border-gray-200";

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back link */}
      <Link
        href={`/category/${product.category}`}
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-dhaner-shobuj mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        {category?.nameBn || product.category} তে ফিরে যান
      </Link>

      {/* Product Header */}
      <div className="bg-bazar-card rounded-2xl border border-gray-200 p-6 md:p-10 mb-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-[#edf3ea] rounded-2xl flex items-center justify-center text-5xl md:text-6xl">
              {product.image}
            </div>
            <div className="flex-1 pt-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <Link
                  href={`/category/${product.category}`}
                  className="inline-flex items-center gap-1 bg-dhaner-shobuj/10 text-dhaner-shobuj text-xs font-medium px-3 py-1 rounded-full"
                >
                  {category?.icon || "📦"} {category?.nameBn || product.category}
                </Link>
                <span className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full border ${changeBg} ${changeColor}`}>
                  {dir === "up" && <TrendingUp size={12} />}
                  {dir === "down" && <TrendingDown size={12} />}
                  {dir === "flat" && <Minus size={12} />}
                  {dir === "up" ? "বাড়ছে" : dir === "down" ? "কমছে" : "অপরিবর্তিত"}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                {product.nameBn}
              </h1>
              <p className="text-gray-500 mb-4 text-sm md:text-base">{formatUnit(product.unit)}</p>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl md:text-4xl font-bold text-gray-800">
                  {toBn(product.today)} <span className="text-lg font-medium">টাকা</span>
                </span>
                <span className={`text-base font-semibold ${changeColor}`}>
                  {dir === "up" ? "▲" : dir === "down" ? "▼" : "—"} {toBn(pct)}%
                </span>
              </div>
            </div>
          </div>

          {/* Price Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
              <p className="text-xs text-green-700 mb-1">সর্বনিম্ন দাম</p>
              <p className="text-xl md:text-2xl font-bold text-green-700">
                {toBn(minPrice)} <span className="text-sm">টাকা</span>
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
              <p className="text-xs text-blue-700 mb-1">গড় দাম</p>
              <p className="text-xl md:text-2xl font-bold text-blue-700">
                {toBn(avgPrice)} <span className="text-sm">টাকা</span>
              </p>
            </div>
            <div className="bg-red-50 rounded-xl p-4 text-center border border-red-100">
              <p className="text-xs text-red-700 mb-1">সর্বোচ্চ দাম</p>
              <p className="text-xl md:text-2xl font-bold text-red-700">
                {toBn(maxPrice)} <span className="text-sm">টাকা</span>
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-gray-600 text-sm md:text-base">{product.description}</p>
        </div>

        {/* Price History */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4">দামের ইতিহাস</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">গতকাল</p>
              <p className="text-lg font-bold text-gray-800">{toBn(product.yesterday)} টাকা</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">আজ</p>
              <p className="text-lg font-bold text-dhaner-shobuj">{toBn(product.today)} টাকা</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">গত সপ্তাহে</p>
              <p className="text-lg font-bold text-gray-800">{toBn(lastWeek)} টাকা</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">গত মাসে</p>
              <p className="text-lg font-bold text-gray-800">{toBn(lastMonth)} টাকা</p>
            </div>
          </div>
        </div>
      </div>

      {/* Market-wise Prices */}
      <div className="bg-bazar-card rounded-2xl border border-gray-200 p-6 md:p-10">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
          বাজারভিত্তিক আজকের দাম
        </h2>
        {allMarkets.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    বাজারের নাম
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    বিভাগ
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                    সর্বনিম্ন
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                    সর্বোচ্চ
                  </th>
                </tr>
              </thead>
              <tbody>
                {allMarkets.map((market, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm font-medium text-gray-800">
                      🏪 {market.market}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {market.division}
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-green-600 text-right">
                      {toBn(market.min)} টাকা
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-red-600 text-right">
                      {toBn(market.max)} টাকা
                    </td>
                  </tr>
                ))}
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
      <div className="mt-10">
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
