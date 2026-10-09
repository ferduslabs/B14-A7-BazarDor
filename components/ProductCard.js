"use client";

import Link from "next/link";
import { toBn, formatUnit } from "@/lib/bangla";

export default function ProductCard({ product, size = "normal" }) {
  const { dir, pct } = product.change;

  const changeBg =
    dir === "up"
      ? "bg-red-100 text-red-600"
      : dir === "down"
      ? "bg-green-100 text-green-600"
      : "bg-gray-100 text-gray-600";

  const changeIcon = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";

  // size variants
  const iconSize = size === "small" ? "w-12 h-12 text-2xl rounded-xl" : "w-[60px] h-[60px] text-[30px] rounded-2xl";
  const iconBg = "bg-[#edf3ea]";
  const nameSize = size === "small" ? "text-base md:text-lg" : "text-lg md:text-xl";
  const unitSize = size === "small" ? "text-xs md:text-sm" : "text-sm md:text-base";
  const priceSize = size === "small" ? "text-xl md:text-2xl" : "text-2xl md:text-3xl";
  const badgeSize = size === "small" ? "text-xs px-2.5 py-1" : "text-sm md:text-base px-3.5 py-1.5";
  const cardPadding = size === "small" ? "p-4 md:p-5" : "p-5 md:p-6";

  return (
    <Link href={`/product/${product.slug}`}>
      <div className={`bg-bazar-card rounded-2xl border border-gray-300/70 hover:border-dhaner-shobuj/40 hover:shadow-sm transition-all duration-200 ${cardPadding} group cursor-pointer h-full`}>
        <div className="flex items-start gap-3 md:gap-4">
          <div className={`${iconSize} ${iconBg} flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}>
            {product.image}
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <h3 className={`font-semibold text-gray-800 ${nameSize} leading-tight truncate`}>
              {product.nameBn}
            </h3>
            <p className={`text-gray-500 mt-0.5 ${unitSize}`}>
              {formatUnit(product.unit)}
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between mt-4 md:mt-5 pt-3 border-t border-gray-200/60">
          <div>
            <p className="text-sm text-gray-500 mb-1 font-medium">আজকের দাম</p>
            <p className={`font-bold text-gray-800 leading-none ${priceSize}`}>
              {toBn(product.today)} <span className="text-base font-medium">টাকা</span>
            </p>
          </div>
          <span className={`font-semibold rounded-full ${changeBg} ${badgeSize} flex-shrink-0`}>
            {changeIcon} {toBn(pct)}%
          </span>
        </div>
      </div>
    </Link>
  );
}
