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
          <div className="grid md:grid-cols-5 gap-6 items-center p-6 md:p-10 lg:px-12 lg:py-10">
            <div className="md:col-span-3 relative z-10">
              <p className="inline-block text-dhaner-shobuj font-semibold text-sm md:text-base bg-dhaner-shobuj/10 px-4 py-1.5 rounded-full mb-5">
                {currentDate}
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-800 leading-tight mb-4 md:mb-6">
                আজকের বাজারের দাম
                <br />
                এক নজরে
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-gray-500 mb-6 md:mb-8 max-w-xl leading-relaxed">
                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের
                পরিবর্তন এক জায়গায়।
              </p>
              <button
                onClick={scrollToProducts}
                className="bg-dhaner-shobuj hover:bg-emerald-700 text-white font-bold px-7 md:px-8 py-3.5 md:py-4 rounded-2xl transition-all duration-200 text-sm md:text-base shadow-lg shadow-emerald-900/40 border-b-4 border-emerald-800 hover:border-emerald-900 active:border-b-2 active:translate-y-0.5 active:shadow-md"
              >
                সব পণ্য দেখুন
              </button>
            </div>

            <div className="md:col-span-2 relative flex justify-center md:justify-end">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72">
                {/* Fruit Basket Illustration */}
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Shadow */}
                  <ellipse cx="100" cy="185" rx="70" ry="10" fill="#d1d5db" opacity="0.4" />

                  {/* Basket body */}
                  <rect x="45" y="115" width="110" height="65" rx="8" fill="#c2410c" />
                  <rect x="45" y="115" width="110" height="12" rx="4" fill="#92400e" />

                  {/* Basket vertical lines */}
                  <line x1="60" y1="127" x2="60" y2="180" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
                  <line x1="85" y1="127" x2="85" y2="180" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
                  <line x1="110" y1="127" x2="110" y2="180" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
                  <line x1="135" y1="127" x2="135" y2="180" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />

                  {/* Basket handle */}
                  <path d="M 70 115 Q 100 85 130 115" stroke="#92400e" strokeWidth="5" fill="none" strokeLinecap="round" />

                  {/* Apple (red) */}
                  <circle cx="75" cy="90" r="22" fill="#ef4444" />
                  <ellipse cx="68" cy="82" rx="6" ry="8" fill="#fca5a5" opacity="0.5" />
                  <path d="M 75 68 Q 78 60 85 58" stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                  {/* Grapes (purple) */}
                  <circle cx="50" cy="100" r="14" fill="#a855f7" />
                  <path d="M 50 86 Q 52 78 58 75" stroke="#16a34a" strokeWidth="2" fill="none" strokeLinecap="round" />

                  {/* Green fruit */}
                  <circle cx="125" cy="75" r="25" fill="#22c55e" />
                  <ellipse cx="118" cy="67" rx="7" ry="10" fill="#86efac" opacity="0.5" />
                  <path d="M 125 50 Q 128 40 138 38" stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <path d="M 138 38 Q 145 42 148 50" stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                  {/* Orange 1 */}
                  <circle cx="100" cy="100" r="16" fill="#f97316" />
                  <path d="M 100 84 Q 102 78 107 76" stroke="#16a34a" strokeWidth="2" fill="none" strokeLinecap="round" />

                  {/* Orange 2 */}
                  <circle cx="155" cy="100" r="15" fill="#fb923c" />
                  <path d="M 155 85 Q 157 79 162 77" stroke="#16a34a" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
