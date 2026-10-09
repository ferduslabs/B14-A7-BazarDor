"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/lib/auth-context";
import toast from "react-hot-toast";
import { ArrowLeft, Save, Camera } from "lucide-react";

function UpdateProfileContent() {
  const { user, updateUser, updateProfilePicture } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [name, setName] = useState(user?.name || "");
  const [loading, setLoading] = useState(false);
  const [picLoading, setPicLoading] = useState(false);

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

  const handlePicClick = () => {
    fileInputRef.current?.click();
  };

  const handlePicChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("দয়া করে ছবির ফাইল নির্বাচন করুন");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("ছবি ২ MB-এর বেশি হতে পারবে না");
      return;
    }

    setPicLoading(true);
    try {
      await updateProfilePicture(file);
      toast.success("প্রোফাইল পিকচার আপডেট হয়েছে!");
    } catch (err) {
      toast.error(err.message || "ছবি আপডেট ব্যর্থ হয়েছে");
    } finally {
      setPicLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-10 md:py-14">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-dhaner-shobuj mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          প্রোফাইলে ফিরে যান
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
          প্রোফাইল এডিট করুন
        </h1>

        <div className="bg-bazar-card rounded-2xl border border-gray-200/80 p-6 md:p-10">
          {/* Avatar + picture upload */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div
                onClick={handlePicClick}
                className="w-28 h-28 md:w-32 md:h-32 bg-[#edf3ea] rounded-2xl flex items-center justify-center text-5xl md:text-6xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-dhaner-shobuj/40 transition-colors"
              >
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt="প্রোফাইল"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>👤</span>
                )}
              </div>
              <button
                onClick={handlePicClick}
                type="button"
                className="absolute bottom-0 right-0 w-10 h-10 bg-dhaner-shobuj text-white rounded-full flex items-center justify-center shadow-md hover:bg-emerald-700 transition-colors"
                title="প্রোফাইল পিকচার পরিবর্তন করুন"
              >
                <Camera size={18} />
              </button>
              {picLoading && (
                <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePicChange}
                className="hidden"
              />
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 -mt-6 mb-8">
            পিকচার পরিবর্তন করতে ছবিতে ক্লিক করুন
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-base font-medium text-gray-800 mb-2">
                নাম
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম"
                className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-gray-800 placeholder-gray-400 text-base"
              />
            </div>

            <div>
              <label className="block text-base font-medium text-gray-800 mb-2">
                ইমেইল
              </label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed text-base"
              />
              <p className="text-xs text-gray-400 mt-1.5">
                ইমেইল পরিবর্তন করা যায় না
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-emerald-900/20 border-b-4 border-emerald-800 hover:border-emerald-900 active:border-b-2 active:translate-y-0.5 text-base flex items-center justify-center gap-2"
            >
              <Save size={18} />
              {loading ? "সংরক্ষণ হচ্ছে..." : "আপডেট করুন"}
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
