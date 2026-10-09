"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/lib/auth-context";
import { LogOut, Camera } from "lucide-react";
import toast from "react-hot-toast";

function ProfileContent() {
  const { user, updateUser, updateProfilePicture, signOut } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [name, setName] = useState(user?.name || "");
  const [loading, setLoading] = useState(false);
  const [picLoading, setPicLoading] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    toast.success("লগআউট সম্পন্ন হয়েছে");
    router.push("/");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("দয়া করে নাম লিখুন");
      return;
    }
    setLoading(true);
    try {
      await updateUser({ name: name.trim() });
      toast.success("তথ্য আপডেট হয়েছে!");
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            আমার প্রোফাইল
          </h1>
          <p className="text-gray-500 text-base md:text-lg">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-bazar-card rounded-2xl border border-gray-200/80 p-6 md:p-10 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative group">
                <div
                  onClick={handlePicClick}
                  className="w-20 h-20 md:w-24 md:h-24 bg-[#edf3ea] rounded-2xl flex items-center justify-center text-4xl md:text-5xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-dhaner-shobuj/40 transition-colors"
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
                  className="absolute bottom-0 right-0 w-8 h-8 bg-dhaner-shobuj text-white rounded-full flex items-center justify-center shadow-md hover:bg-emerald-700 transition-colors"
                  title="প্রোফাইল পিকচার পরিবর্তন করুন"
                >
                  <Camera size={15} />
                </button>
                {picLoading && (
                  <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {user.name || "ব্যবহারকারী"}
                </h2>
                <p className="text-gray-500 mt-1 text-base md:text-lg">
                  {user.email}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  প্রোফাইল পিকচার পরিবর্তন করতে ছবিতে ক্লিক করুন
                </p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold border-2 border-red-500 hover:border-red-600 px-5 py-2.5 rounded-xl transition-colors text-base"
            >
              <LogOut size={18} />
              সাইন আউট
            </button>
          </div>
        </div>

        {/* Update Info Card */}
        <div className="bg-bazar-card rounded-2xl border border-gray-200/80 p-6 md:p-10">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
            তথ্য
          </h3>
          <form onSubmit={handleUpdate} className="space-y-5">
            <div className="pl-4 md:pl-8">
              <label className="block text-base font-medium text-gray-800 mb-2">
                নাম
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-gray-800 placeholder-gray-400 text-base"
                placeholder="আপনার নাম"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-emerald-900/20 border-b-4 border-emerald-800 hover:border-emerald-900 active:border-b-2 active:translate-y-0.5 text-base"
            >
              {loading ? "লোড হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  );
}
