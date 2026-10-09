import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="max-w-md mx-auto">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          ৪০৪
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">
          পেজটি পাওয়া যায়নি
        </h2>
        <p className="text-gray-500 mb-8">
          দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি বিদ্যমান নেই বা সরানো হয়েছে।
          অনুগ্রহ করে সঠিক লিঙ্ক ব্যবহার করুন।
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-dhaner-shobuj hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-lg shadow-dhaner-shobuj/20"
          >
            🏠 হোম পেজে ফিরে যান
          </Link>
          <Link
            href="/#সব-পণ্য"
            className="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-3 rounded-xl transition-colors border border-gray-200"
          >
            🛒 সব পণ্য দেখুন
          </Link>
        </div>
      </div>
    </div>
  );
}
