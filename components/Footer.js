import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200/60 mt-16 bg-bazar-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 text-center md:text-left">
          <div>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">বাজার দর</span> — প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">
              সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
