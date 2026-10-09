import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PriceTicker from "@/components/PriceTicker";
import { AuthProvider } from "@/lib/auth-context";
import { Toaster } from "react-hot-toast";
import { products } from "@/lib/fallback-data";

export const metadata = {
  title: "বাজার দর — প্রতিদিনের পণ্যের দাম এক নজরে",
  description:
    "বাংলাদেশের বাজার দর — সারা দেশের বাজার থেকে সংগৃহীত দামের তথ্য। চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ, মসলার দাম জানুন।",
  keywords: [
    "বাজার দর",
    "bazar dor",
    "বাজারের দাম",
    "মার্কেট প্রাইস",
    "বাংলাদেশ বাজার",
  ],
  openGraph: {
    title: "বাজার দর — প্রতিদিনের পণ্যের দাম এক নজরে",
    description:
      "বাংলাদেশের বাজার দর — সারা দেশের বাজার থেকে সংগৃহীত দামের তথ্য।",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className="min-h-screen flex flex-col bg-bazar-bg">
        <AuthProvider>
          {/* Sticky header: navbar + ticker stay on top */}
          <div className="sticky top-0 z-50 bg-bazar-bg/95 backdrop-blur-sm border-b border-gray-200/60">
            <Navbar />
            <PriceTicker products={products} />
          </div>
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#fff",
                color: "#1f2937",
                borderRadius: "12px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                fontSize: "14px",
              },
              success: {
                style: {
                  border: "1px solid #10b981",
                },
              },
              error: {
                style: {
                  border: "1px solid #ef4444",
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
