"use client";

import Link from "next/link";
import { toBn, formatUnit } from "@/lib/bangla";

export default function ProductCard({ product }) {
  const { dir, pct } = product.change;

  const changeBg =
    dir === "up"
      ? "bg-red-50 text-price-up"
      : dir === "down"
      ? "bg-green-50 text-price-down"
      : "bg-gray-100 text-price-flat";

  const changeIcon = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="bg-bazar-card rounded-2xl border border-gray-200 hover:border-dhaner-shobuj/40 hover:shadow-md transition-all duration-300 p-4 group cursor-pointer h-full">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 rounded-2xl bg-white/60 flex items-center justify-center text-2xl md:text-3xl group-hover:scale-110 transition-transform duration-300">
            {product.image}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800 text-base md:text-lg leading-tight truncate">
              {product.nameBn}
            </h3>
            <p className="text-xs md:text-sm text-gray-500 mt-0.5">
              {formatUnit(product.unit)}
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between mt-4 pt-3 border-t border-gray-200/50">
          <div>
            <p className="text-xs text-gray-400 mb-1">আজকের দাম</p>
            <p className="text-xl md:text-2xl font-bold text-gray-800 leading-none">
              ৳{toBn(product.today)} <span className="text-base font-medium">টাকা</span>
            </p>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1.5 rounded-full ${changeBg} flex-shrink-0`}>
            {changeIcon} {toBn(pct)}%
          </span>
        </div>
      </div>
    </Link>
  );
}
