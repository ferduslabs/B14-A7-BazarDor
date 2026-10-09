"use client";

import { formatBengaliDate } from "@/lib/bangla";
import { useEffect, useState } from "react";

export default function Hero() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(formatBengaliDate(new Date()));
  }, []);

  const scrollToProducts = () => {
    const el = document.getElementById("সব-পণ্য");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-8 pb-4">
      <div className="container mx-auto px-4">
        <div className="relative bg-bazar-card rounded-3xl overflow-hidden border border-gray-200/60">
          <div className="grid md:grid-cols-2 gap-6 items-center p-6 md:p-10 lg:p-12">
            <div className="relative z-10">
              <p className="inline-block text-dhaner-shobuj font-semibold text-xs bg-dhaner-shobuj/10 px-3 py-1.5 rounded-full mb-4">
                📅 {currentDate}
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-4">
                আজকের বাজারের দাম
                <br />
                এক নজরে
              </h1>
              <p className="text-sm md:text-base text-gray-600 mb-6 max-w-md leading-relaxed">
                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং
                দামের পরিবর্তনের গতিশীলতা এক জায়গায়।
              </p>
              <button
                onClick={scrollToProducts}
                className="bg-dhaner-shobuj hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 text-sm md:text-base shadow-md shadow-emerald-900/20 border-b-4 border-emerald-800 hover:border-emerald-900 active:border-b-2 active:translate-y-0.5"
              >
                সব পণ্য দেখুন
              </button>
            </div>

            <div className="relative flex justify-center md:justify-end">
              <div className="relative">
                <div className="text-7xl md:text-8xl lg:text-9xl">🧺</div>
                <div className="absolute -top-2 -right-2 text-3xl md:text-4xl animate-bounce" style={{ animationDelay: "0.1s" }}>🍎</div>
                <div className="absolute top-4 -left-4 text-2xl md:text-3xl animate-bounce" style={{ animationDelay: "0.3s" }}>🥕</div>
                <div className="absolute bottom-4 -right-4 text-2xl md:text-3xl animate-bounce" style={{ animationDelay: "0.5s" }}>🫑</div>
                <div className="absolute bottom-8 -left-6 text-3xl md:text-4xl animate-bounce" style={{ animationDelay: "0.7s" }}>🍊</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
