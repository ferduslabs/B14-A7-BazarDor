import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { SkeletonGrid } from "@/components/SkeletonCard";
import {
  products,
  getTopRisers,
  getTopFallers,
  categories,
} from "@/lib/fallback-data";
import Link from "next/link";
import { toBn } from "@/lib/bangla";

export default function Home() {
  const risers = getTopRisers(6);
  const fallers = getTopFallers(6);

  return (
    <div className="min-h-screen">
      <Hero />

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Price Up Section */}
        <section id="আজ-দাম-বেড়েছে">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 flex items-center gap-2 mb-5">
            <span className="text-price-up text-base md:text-lg">▲</span> আজ দাম বেড়েছে
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
            {risers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Price Down Section */}
        <section id="আজ-দাম-কমেছে">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 flex items-center gap-2 mb-5">
            <span className="text-price-down text-base md:text-lg">▼</span> আজ দাম কমেছে
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
            {fallers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* All Products */}
        <section id="সব-পণ্য">
          <div className="mb-5">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
              সব পণ্য
            </h2>
            <p className="text-sm md:text-base text-gray-500 mt-1">
              মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
