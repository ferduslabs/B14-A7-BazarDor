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

export default function Home() {
  const risers = getTopRisers(6);
  const fallers = getTopFallers(6);

  return (
    <div>
      <Hero />

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Price Up Section */}
        <section id="আজ-দাম-বেড়েছে">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-price-up">▲</span> আজ দাম বেড়েছে
              </h2>
              <p className="text-gray-500 mt-1">
                যে পণ্যগুলোর দাম সবচেয়ে বেশি বেড়েছে
              </p>
            </div>
            <Link
              href="#সব-পণ্য"
              className="text-sm text-dhaner-shobuj hover:text-emerald-700 font-medium hidden sm:inline"
            >
              সব দেখুন →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {risers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {risers.length === 0 && (
              <p className="col-span-full text-center text-gray-500 py-8">
                আজ কোনো পণ্যের দাম বাড়নি
              </p>
            )}
          </div>
        </section>

        {/* Price Down Section */}
        <section id="আজ-দাম-কমেছে">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-price-down">▼</span> আজ দাম কমেছে
              </h2>
              <p className="text-gray-500 mt-1">
                যে পণ্যগুলোর দাম সবচেয়ে বেশি কমেছে
              </p>
            </div>
            <Link
              href="#সব-পণ্য"
              className="text-sm text-dhaner-shobuj hover:text-emerald-700 font-medium hidden sm:inline"
            >
              সব দেখুন →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fallers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {fallers.length === 0 && (
              <p className="col-span-full text-center text-gray-500 py-8">
                আজ কোনো পণ্যের দাম কমেনি
              </p>
            )}
          </div>
        </section>

        {/* Category quick links */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            ক্যাটাগরি অনুযায়ী দেখুন
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="bg-white rounded-xl p-4 text-center border border-gray-100 hover:border-dhaner-shobuj/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <p className="text-sm font-medium text-gray-700">
                  {cat.nameBn}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* All Products */}
        <section id="সব-পণ্য">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              সব পণ্য
            </h2>
            <p className="text-gray-500 mt-1">
              সব পণ্যের আজকের বাজার দাম এক জায়গায়
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
