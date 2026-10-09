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
    <section className="relative pt-6 pb-2">
      <div className="container mx-auto px-4">
        <div className="relative bg-bazar-card rounded-3xl overflow-hidden border border-gray-300/70">
          <div className="grid md:grid-cols-5 gap-6 items-center p-6 md:p-10 lg:p-12">
            <div className="md:col-span-3 relative z-10">
              <p className="inline-block text-dhaner-shobuj font-semibold text-sm bg-dhaner-shobuj/10 px-4 py-1.5 rounded-full mb-5">
                {currentDate}
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 leading-tight mb-4">
                আজকের বাজারের দাম
                <br />
                এক নজরে
              </h1>
              <p className="text-sm md:text-base text-gray-500 mb-6 max-w-xl leading-relaxed">
                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের
                পরিবর্তন এক জায়গায়।
              </p>
              <button
                onClick={scrollToProducts}
                className="bg-dhaner-shobuj hover:bg-emerald-700 text-white font-semibold px-7 py-3.5 rounded-2xl transition-all duration-200 text-sm md:text-base shadow-lg shadow-emerald-900/30 border-b-4 border-emerald-800 hover:border-emerald-900 active:border-b-2 active:translate-y-0.5 active:shadow-md"
              >
                সব পণ্য দেখুন
              </button>
            </div>

            <div className="md:col-span-2 relative flex justify-center md:justify-end">
              <div className="relative">
                {/* Fruit basket illustration */}
                <div className="relative">
                  <div className="text-7xl md:text-8xl lg:text-9xl">🧺</div>
                  {/* Floating fruits */}
                  <div className="absolute -top-4 right-0 text-3xl md:text-4xl">🍎</div>
                  <div className="absolute -top-1 -right-6 text-2xl md:text-3xl">🍊</div>
                  <div className="absolute top-2 -left-4 text-2xl md:text-3xl">🥕</div>
                  <div className="absolute bottom-12 -right-2 text-2xl md:text-3xl">🫑</div>
                  <div className="absolute bottom-16 -left-6 text-3xl md:text-4xl">🍇</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
