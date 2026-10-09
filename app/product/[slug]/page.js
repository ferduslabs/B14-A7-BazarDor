import { products } from "@/lib/fallback-data";
import ProductDetailClient from "./ProductDetailClient";
import AuthGuard from "@/components/AuthGuard";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }) {
  return (
    <AuthGuard>
      <ProductDetailClient slug={params.slug} />
    </AuthGuard>
  );
}
