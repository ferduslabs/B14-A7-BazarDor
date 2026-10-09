"use client";

import Link from "next/link";
import { toBn, formatUnit } from "@/lib/bangla";

export default function ProductCard({ product }) {
  const { dir, pct } = product.change;

  const changeColor =
    dir === "up"
      ? "text-price-up"
      : dir === "down"
      ? "text-price-down"
      : "text-price-flat";

  const changeBg =
    dir === "up"
      ? "bg-red-50 text-price-up border-red-100"
      : dir === "down"
      ? "bg-green-50 text-price-down border-green-100"
      : "bg-gray-50 text-price-flat border-gray-200";

  const changeIcon = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5 border border-gray-100 hover:border-dhaner-shobuj/30 group cursor-pointer h-full flex flex-col">
        <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
          {product.image}
        </div>
        <h3 className="font-semibold text-gray-800 text-lg mb-1">
          {product.nameBn}
        </h3>
        <p className="text-sm text-gray-500 mb-3">
          {formatUnit(product.unit)}
        </p>
        <div className="mt-auto">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-gray-400 mb-1">আজকের দাম</p>
              <p className="text-2xl font-bold text-gray-800">
                ৳{toBn(product.today)}
              </p>
            </div>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-md border ${changeBg}`}
            >
              <span className={changeColor}>{changeIcon}</span>{" "}
              <span className={changeColor}>{toBn(pct)}%</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
