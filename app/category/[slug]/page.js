import { categories } from "@/lib/fallback-data";
import CategoryClient from "./CategoryClient";

export function generateStaticParams() {
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export default function CategoryPage({ params }) {
  return <CategoryClient slug={params.slug} />;
}
