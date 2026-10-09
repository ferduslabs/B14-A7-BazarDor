import Link from "next/link";
import { categories } from "@/lib/fallback-data";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🛒</span>
              <h3 className="text-xl font-bold text-gray-800">বাজার দর</h3>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              প্রয়োজনীয় পণ্যের দাম এক নজরে। সারা বাংলাদেশের বাজার থেকে
              সংগৃহীত দামের তথ্য — কিনুন বুদ্ধিমানের সাথে।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">ক্যাটাগরি</h4>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="text-sm text-gray-600 hover:text-dhaner-shobuj transition-colors"
                >
                  {cat.icon} {cat.nameBn}
                </Link>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">তথ্য</h4>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
              আসল দামের জন্য কাছের বাজারে যোগাযোগ করুন।
            </p>
            <div className="flex gap-3">
              <span className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 hover:bg-dhaner-shobuj/10 hover:text-dhaner-shobuj cursor-pointer transition-colors">
                📧
              </span>
              <span className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 hover:bg-dhaner-shobuj/10 hover:text-dhaner-shobuj cursor-pointer transition-colors">
                📱
              </span>
              <span className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 hover:bg-dhaner-shobuj/10 hover:text-dhaner-shobuj cursor-pointer transition-colors">
                💬
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} বাজার দর। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <p className="text-sm text-gray-400">
            🇧🇘 বাংলাদেশের প্রথম বাজার দর ট্র্যাকার
          </p>
        </div>
      </div>
    </footer>
  );
}
