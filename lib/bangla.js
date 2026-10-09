const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBn(num) {
  if (num === null || num === undefined) return "";
  const str = String(num);
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char >= "0" && char <= "9") {
      result += bnDigits[parseInt(char, 10)];
    } else {
      result += char;
    }
  }
  return result;
}

export function getBengaliMonth(date) {
  const months = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];
  return months[date.getMonth()];
}

export function getBengaliDay(date) {
  const days = [
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
    "শনিবার",
  ];
  return days[date.getDay()];
}

export function formatBengaliDate(date) {
  const day = getBengaliDay(date);
  const month = getBengaliMonth(date);
  return `${day}, ${toBn(date.getDate())} ${month} ${toBn(date.getFullYear())}`;
}

export function formatUnit(unit) {
  const unitMap = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    pcs: "প্রতি পিস",
  };
  return unitMap[unit] || `প্রতি ${unit}`;
}
