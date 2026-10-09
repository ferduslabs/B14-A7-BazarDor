"use client";

import { toBn } from "@/lib/bangla";

export default function PriceTicker({ products }) {
  const tickerItems = [...products, ...products];

  return (
    <div className="bg-bazar-card border-y border-gray-200/60 overflow-hidden py-2">
      <div className="flex animate-marquee whitespace-nowrap">
        {tickerItems.map((product, idx) => {
          const { dir, pct } = product.change;
          const color =
            dir === "up"
              ? "text-price-up"
              : dir === "down"
              ? "text-price-down"
              : "text-price-flat";
          const icon = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
          return (
            <div
              key={`${product.id}-${idx}`}
              className="flex items-center gap-2 px-5 text-xs"
            >
              <span className="text-base">{product.image}</span>
              <span className="font-medium text-gray-700">
                {product.nameBn}
              </span>
              <span className="text-gray-500">
                ৳{toBn(product.today)}/একক
              </span>
              <span className={`font-semibold ${color}`}>
                {icon} {toBn(pct)}%
              </span>
              <span className="text-gray-300 mx-1">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
