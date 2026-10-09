"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { formatBengaliDate } from "@/lib/bangla";
import { categories } from "@/lib/fallback-data";
import { Menu, X, User, LogOut, Settings } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(formatBengaliDate(new Date()));
  }, []);

  const isCategoryActive = (slug) => {
    return pathname === `/category/${slug}`;
  };

  const handleSignOut = async () => {
    await signOut();
    setProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-gray-200/50">
      <div className="container mx-auto px-4">
        {/* Top row */}
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">🛒</span>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                বাজার দর
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                {currentDate}
              </p>
            </div>
          </Link>

          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 bg-white border border-gray-200 hover:border-dhaner-shobuj/50 px-3 py-2 rounded-xl transition-colors"
                >
                  <div className="w-8 h-8 bg-dhaner-shobuj/10 rounded-full flex items-center justify-center text-dhaner-shobuj">
                    <User size={16} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">
                    {user.name}
                  </span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    <Link
                      href="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <User size={16} />
                      প্রোফাইল
                    </Link>
                    <Link
                      href="/update-profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Settings size={16} />
                      এডিট করুন
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <LogOut size={16} />
                      সাইন আউট
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-gray-700 hover:text-dhaner-shobuj font-medium text-sm px-4 py-2 transition-colors"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="bg-dhaner-shobuj hover:bg-emerald-700 text-white font-medium text-sm px-5 py-2 rounded-xl transition-colors shadow-sm"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Category nav - desktop */}
        <nav className="hidden md:flex items-center gap-1 pb-3 overflow-x-auto">
          <Link
            href="/"
            className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
              pathname === "/"
                ? "bg-dhaner-shobuj text-white"
                : "text-gray-600 hover:bg-white hover:text-gray-900"
            }`}
          >
            🏠 হোম
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                isCategoryActive(cat.slug)
                  ? "bg-dhaner-shobuj text-white"
                  : "text-gray-600 hover:bg-white hover:text-gray-900"
              }`}
            >
              {cat.icon} {cat.nameBn}
            </Link>
          ))}
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-1 mb-4">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 text-sm font-medium rounded-lg ${
                  pathname === "/"
                    ? "bg-dhaner-shobuj text-white"
                    : "text-gray-600 hover:bg-white"
                }`}
              >
                🏠 হোম
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 text-sm font-medium rounded-lg ${
                    isCategoryActive(cat.slug)
                      ? "bg-dhaner-shobuj text-white"
                      : "text-gray-600 hover:bg-white"
                  }`}
                >
                  {cat.icon} {cat.nameBn}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
              {user ? (
                <>
                  <div className="px-4 py-2 text-sm text-gray-500">
                    {user.name}
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg text-center"
                  >
                    প্রোফাইল
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-3 text-sm font-medium text-red-600 bg-red-50 rounded-lg text-center w-full"
                  >
                    সাইন আউট
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg text-center"
                  >
                    সাইন ইন
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-white bg-dhaner-shobuj rounded-lg text-center"
                  >
                    সাইন আপ
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
