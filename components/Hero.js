"use client";

export default function Hero() {
  const scrollToProducts = () => {
    const el = document.getElementById("সব-পণ্য");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-cream to-amber-50 -z-10"></div>
      <div className="absolute top-10 right-10 text-8xl opacity-10">🌾</div>
      <div className="absolute bottom-10 left-10 text-6xl opacity-10">🥬</div>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="inline-block text-dhaner-shobuj font-medium text-sm bg-dhaner-shobuj/10 px-4 py-1.5 rounded-full mb-6">
              🇧🇩 বাংলাদেশের বাজার দর
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
              প্রতিদিনের পণ্যের দাম
              <br />
              <span className="text-dhaner-shobuj">এক নজরে</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              সারা দেশের বাজার থেকে সংগৃহীত দামের তথ্য — কিনুন
              বুদ্ধিমানের সাথে। দৈনিক বাজারের দাম জানুন এবং সাশ্রয় করুন।
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={scrollToProducts}
                className="bg-dhaner-shobuj hover:bg-emerald-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-dhaner-shobuj/30 hover:shadow-dhaner-shobuj/40 hover:-translate-y-0.5"
              >
                সব পণ্য দেখুন
              </button>
              <a
                href="#আজ-দাম-বেড়েছে"
                className="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 border border-gray-200 hover:border-gray-300"
              >
                দামের তুলনা
              </a>
            </div>

            <div className="flex items-center gap-8 mt-10 pt-8 border-t border-gray-200/50">
              <div>
                <p className="text-3xl font-bold text-gray-800">৩৭+</p>
                <p className="text-sm text-gray-500">পণ্য</p>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div>
                <p className="text-3xl font-bold text-gray-800">৮</p>
                <p className="text-sm text-gray-500">ক্যাটাগরি</p>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div>
                <p className="text-3xl font-bold text-gray-800">৮+</p>
                <p className="text-sm text-gray-500">বাজার</p>
              </div>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl rotate-6 opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl -rotate-3 opacity-20"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 h-full flex flex-col justify-center">
                <div className="text-center">
                  <div className="text-7xl mb-6">🛒</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    বাজার দর
                  </h3>
                  <p className="text-gray-500 mb-6">
                    প্রতিদিনের পণ্যের দামের আপডেট
                  </p>
                  <div className="grid grid-cols-4 gap-3 text-3xl">
                    <div className="bg-emerald-50 p-3 rounded-xl">🍚</div>
                    <div className="bg-amber-50 p-3 rounded-xl">🫘</div>
                    <div className="bg-yellow-50 p-3 rounded-xl">🥬</div>
                    <div className="bg-blue-50 p-3 rounded-xl">🐟</div>
                    <div className="bg-red-50 p-3 rounded-xl">🍗</div>
                    <div className="bg-purple-50 p-3 rounded-xl">🥛</div>
                    <div className="bg-orange-50 p-3 rounded-xl">🌶️</div>
                    <div className="bg-green-50 p-3 rounded-xl">🛢️</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
