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
      <div className="bg-bazar-card rounded-2xl border border-gray-200/60 hover:border-dhaner-shobuj/40 hover:shadow-md transition-all duration-300 p-4 group cursor-pointer h-full">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              {product.image}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-base leading-tight">
                {product.nameBn}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {formatUnit(product.unit)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between mt-3 pt-3 border-t border-gray-200/50">
          <div>
            <p className="text-[10px] text-gray-400 mb-0.5">আজকের দাম</p>
            <p className="text-lg font-bold text-gray-800 leading-tight">
              ৳{toBn(product.today)}
            </p>
          </div>
          <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${changeBg}`}>
            {changeIcon} {toBn(pct)}%
          </span>
        </div>
      </div>
    </Link>
  );
}
