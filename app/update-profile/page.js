"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/lib/auth-context";
import toast from "react-hot-toast";
import { ArrowLeft, Save } from "lucide-react";

function UpdateProfileContent() {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [name, setName] = useState(user?.name || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }
    setLoading(true);
    try {
      await updateUser({ name: name.trim() });
      toast.success("প্রোফাইল আপডেট হয়েছে!");
      router.push("/profile");
    } catch (err) {
      toast.error(err.message || "আপডেট ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-md mx-auto">
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-dhaner-shobuj mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          প্রোফাইলে ফিরে যান
        </Link>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          প্রোফাইল এডিট করুন
        </h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          {/* Avatar preview */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {name ? name.charAt(0).toUpperCase() : "👤"}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                নাম
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-dhaner-shobuj/50 focus:ring-2 focus:ring-dhaner-shobuj/20 transition-all text-gray-800 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                ইমেইল
              </label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-1.5">
                ইমেইল পরিবর্তন করা যায় না
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-dhaner-shobuj hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-dhaner-shobuj/20"
            >
              <Save size={18} />
              {loading ? "সংরক্ষণ হচ্ছে..." : "পরিবর্তন সংরক্ষণ করুন"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function UpdateProfilePage() {
  return (
    <AuthGuard>
      <UpdateProfileContent />
    </AuthGuard>
  );
}
