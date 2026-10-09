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
          <div className="grid md:grid-cols-5 gap-6 items-center p-6 md:p-10 lg:px-14 lg:py-12">
            <div className="md:col-span-3 relative z-10">
              <p className="inline-block text-dhaner-shobuj font-semibold text-sm md:text-base bg-dhaner-shobuj/10 px-4 py-1.5 rounded-full mb-5">
                {currentDate}
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 leading-tight mb-4 md:mb-5">
                আজকের বাজারের দাম এক নজরে
              </h1>
              <p className="text-sm md:text-base text-gray-500 mb-6 md:mb-8 max-w-xl leading-relaxed">
                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের
                পরিবর্তন এক জায়গায়।
              </p>
              <button
                onClick={scrollToProducts}
                className="bg-dhaner-shobuj hover:bg-emerald-700 text-white font-semibold px-7 md:px-9 py-3.5 md:py-4 rounded-2xl transition-all duration-200 text-sm md:text-base shadow-md shadow-emerald-900/30 border-b-4 border-emerald-800 hover:border-emerald-900 active:border-b-2 active:translate-y-0.5 active:shadow-sm"
              >
                সব পণ্য দেখুন
              </button>
            </div>

            <div className="md:col-span-2 relative flex justify-center md:justify-end">
              <div className="relative w-48 h-40 sm:w-56 sm:h-48 md:w-64 md:h-56 lg:w-72 lg:h-64">
                <svg viewBox="0 0 320 280" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                  {/* ছায়া */}
                  <ellipse cx="160" cy="255" rx="110" ry="14" fill="#e5e7eb" opacity="0.6"/>
                  {/* ঝুড়ি */}
                  <path d="M60 170 L70 240 Q75 252 90 252 L230 252 Q245 252 250 240 L260 170 Z" fill="#c05621"/>
                  <rect x="55" y="158" width="210" height="22" rx="6" fill="#92400e"/>
                  {/* ঝুড়ির কাঠির লাইন */}
                  <line x1="95" y1="180" x2="100" y2="252" stroke="#7c2d12" strokeWidth="4" strokeLinecap="round"/>
                  <line x1="135" y1="180" x2="138" y2="252" stroke="#7c2d12" strokeWidth="4" strokeLinecap="round"/>
                  <line x1="175" y1="180" x2="178" y2="252" stroke="#7c2d12" strokeWidth="4" strokeLinecap="round"/>
                  <line x1="215" y1="180" x2="218" y2="252" stroke="#7c2d12" strokeWidth="4" strokeLinecap="round"/>
                  <line x1="245" y1="180" x2="248" y2="252" stroke="#7c2d12" strokeWidth="4" strokeLinecap="round"/>

                  {/* ফল ১: বেগুনি জাম */}
                  <circle cx="100" cy="140" r="26" fill="#8b5cf6"/>
                  <path d="M100 114 Q96 108 92 112" stroke="#6d28d9" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  <ellipse cx="90" cy="132" rx="6" ry="9" fill="#a78bfa" opacity="0.5"/>

                  {/* ফল ২: লাল আপেল */}
                  <circle cx="145" cy="125" r="34" fill="#ef4444"/>
                  <path d="M145 91 Q138 82 132 86" stroke="#7f1d1d" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  <ellipse cx="128" cy="115" rx="8" ry="14" fill="#fca5a5" opacity="0.5"/>
                  <path d="M145 91 Q155 82 162 88" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round"/>

                  {/* ফল ৩: কমলা */}
                  <circle cx="200" cy="135" r="22" fill="#f97316"/>
                  <path d="M200 113 Q204 107 210 110" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  <ellipse cx="190" cy="128" rx="5" ry="8" fill="#fdba74" opacity="0.6"/>

                  {/* ফল ৪: বড় সবুজ */}
                  <circle cx="235" cy="110" r="36" fill="#22c55e"/>
                  <path d="M235 74 Q230 64 222 62" stroke="#166534" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  <path d="M235 74 Q248 62 258 68" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  <ellipse cx="218" cy="100" rx="9" ry="16" fill="#86efac" opacity="0.5"/>

                  {/* ফল ৫: কমলা ২ */}
                  <circle cx="275" cy="135" r="22" fill="#f59e0b"/>
                  <path d="M275 113 Q280 107 286 111" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  <ellipse cx="266" cy="128" rx="5" ry="8" fill="#fcd34d" opacity="0.6"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
