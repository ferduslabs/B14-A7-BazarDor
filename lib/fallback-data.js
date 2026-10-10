export const categories = [
  { slug: "chal", name: "চাল", nameBn: "চাল", icon: "🍚" },
  { slug: "dal", name: "ডাল", nameBn: "ডাল", icon: "🫘" },
  { slug: "tel", name: "তেল", nameBn: "তেল", icon: "🫙" },
  { slug: "sobji", name: "সবজি", nameBn: "সবজি", icon: "🥬" },
  { slug: "mach", name: "মাছ", nameBn: "মাছ", icon: "🐟" },
  { slug: "mangsho", name: "মাংস", nameBn: "মাংস", icon: "🍗" },
  { slug: "dim-dui", name: "ডিম-দুধ", nameBn: "ডিম-দুধ", icon: "🥛" },
  { slug: "mosla", name: "মসলা", nameBn: "মসলা", icon: "🌶️" },
];

const markets = [
  { market: "ধানমন্ডি বাজার", division: "ঢাকা", factor: 1.12 },
  { market: "মোহাম্মদপুর বাজার", division: "ঢাকা", factor: 1.05 },
  { market: "উত্তরা বাজার", division: "ঢাকা", factor: 1.08 },
  { market: "কক্সবাজার বাজার", division: "চট্টগ্রাম", factor: 0.97 },
  { market: "সিলেট সদর বাজার", division: "সিলেট", factor: 0.94 },
  { market: "রাজশাহী বাজার", division: "রাজশাহী", factor: 0.9 },
  { market: "খুলনা বাজার", division: "খুলনা", factor: 0.93 },
  { market: "বরিশাল বাজার", division: "বরিশাল", factor: 0.96 },
];

function genMarkets(basePrice, variance = 8) {
  return markets.map((m) => {
    const marketPrice = Math.round(basePrice * m.factor);
    const min = Math.round(marketPrice * (1 - variance / 100));
    const max = Math.round(marketPrice * (1 + variance / 100));
    return {
      market: m.market,
      division: m.division,
      min: Math.max(1, min),
      max: Math.max(1, max),
    };
  });
}

function calcChange(today, yesterday) {
  const pct = Number(((today - yesterday) / yesterday * 100).toFixed(1));
  let dir = "flat";
  if (pct > 0.3) dir = "up";
  else if (pct < -0.3) dir = "down";
  return { dir, pct: Math.abs(pct) };
}

// Helper: create product with yesterday price from change pct
function makeProduct(id, slug, nameBn, image, unit, category, today, changePct) {
  const yesterday = changePct === 0
    ? today
    : Math.round(today / (1 + changePct / 100));
  const change = calcChange(today, yesterday);
  return {
    id,
    slug,
    nameBn,
    nameEn: nameBn,
    image,
    unit,
    category,
    today,
    yesterday,
    change,
    markets: genMarkets(today),
    description: `${nameBn}-এর আজকের বাজার দাম। বিভিন্ন বাজারে দাম ভিন্ন হতে পারে।`,
  };
}

export const products = [
  // ===== চাল =====
  makeProduct(1, "shornomoshi-chal", "স্বর্ণমাছি চাল", "🍚", "kg", "chal", 148, 2.1),
  makeProduct(2, "miniket-chal", "মিনিকেট চাল", "🍚", "kg", "chal", 99, -2.9),
  makeProduct(3, "nazir-chal", "নাজির চাল", "🍚", "kg", "chal", 74, 0),
  makeProduct(4, "butter-size-chal", "বাটার সাইজ চাল", "🍚", "kg", "chal", 66, 3.1),

  // ===== ডাল =====
  makeProduct(5, "mosur-dal", "মসুর ডাল", "🫘", "kg", "dal", 142, 2.9),
  makeProduct(6, "mug-dal", "মুগ ডাল", "🫘", "kg", "dal", 135, 0),
  makeProduct(7, "chhola", "ছোলা", "🫘", "kg", "dal", 120, -2.4),
  makeProduct(8, "amon-dal", "আমন ডাল (খাসারি)", "🫘", "kg", "dal", 156, 2.6),

  // ===== তেল =====
  makeProduct(9, "sorishar-tel", "সরিষার তেল", "🫙", "litre", "tel", 192, 2.1),
  makeProduct(10, "palm-tel", "পাম তেল", "🫙", "kg", "tel", 168, -2.3),
  makeProduct(11, "ghani-vanga-tel", "ঘানি ভাঙা সরিষার তেল", "🫙", "litre", "tel", 215, 2.4),

  // ===== সবজি =====
  makeProduct(12, "alu", "আলু", "🥔", "kg", "sobji", 30, -6.2),
  makeProduct(13, "peyaj", "পেঁয়াজ", "🧅", "kg", "sobji", 54, 12.5),
  makeProduct(14, "kachamorich", "কাঁচামরিচ", "🌶️", "kg", "sobji", 92, -12.4),
  makeProduct(15, "begun", "বেগুন", "🍆", "kg", "sobji", 44, 4.8),
  makeProduct(16, "dherosh", "টেড়স", "🥒", "kg", "sobji", 38, 0),

  // ===== মাছ =====
  makeProduct(17, "rui-mach", "রুই মাছ", "🐟", "kg", "mach", 46, 4.5),
  makeProduct(18, "telapia", "তেলাপিয়া", "🐟", "kg", "mach", 36, 0),
  makeProduct(19, "ilish-mach", "ইলিশ মাছ", "🐟", "kg", "mach", 1850, 3.4),
  makeProduct(20, "katla-mach", "কাতলা মাছ", "🐠", "kg", "mach", 43, -4.4),
  makeProduct(21, "chingri-mach", "চিংড়ি মাছ (খোলা)", "🦐", "kg", "mach", 330, 3.1),

  // ===== মাংস =====
  makeProduct(22, "murgir-mangsho", "মুরগির মাংস", "🍗", "kg", "mangsho", 225, -1.3),
  makeProduct(23, "gorur-mangsho", "গরুর মাংস", "🥩", "kg", "mangsho", 790, -1.2),
  makeProduct(24, "khasir-mangsho", "খাসির মাংস", "🍖", "kg", "mangsho", 1290, -3.0),
  makeProduct(25, "hanser-mangsho", "হাঁসের মাংস", "🦆", "kg", "mangsho", 285, -3.4),

  // ===== ডিম-দুধ =====
  makeProduct(26, "dim", "ডিম", "🥚", "dozen", "dim-dui", 158, 3.9),
  makeProduct(27, "dudh", "দুধ", "🥛", "litre", "dim-dui", 102, 2.0),
  makeProduct(28, "doi", "দই", "🥣", "kg", "dim-dui", 92, 0),
  makeProduct(29, "makhon", "মাখন (১০০ গ্রাম)", "🧈", "piece", "dim-dui", 145, 3.6),

  // ===== মসলা =====
  makeProduct(30, "ada", "আদা", "🫚", "kg", "mosla", 85, 9.0),
  makeProduct(31, "rosun", "রসুন", "🧄", "kg", "mosla", 125, -7.4),
  makeProduct(32, "morich-gura", "মরিচ গুঁড়া", "🌶️", "kg", "mosla", 245, -2.0),
  makeProduct(33, "dhonepata-gura", "ধনেপাতা গুঁড়া", "🌿", "kg", "mosla", 265, 0),
];

// Derived helpers
export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug) {
  return products.filter((p) => p.category === slug);
}

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug);
}

export function getTopRisers(n = 6) {
  return [...products]
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, n);
}

export function getTopFallers(n = 6) {
  return [...products]
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, n);
}
