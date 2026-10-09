"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/lib/auth-context";
import { toBn, formatBengaliDate } from "@/lib/bangla";
import { User, Mail, Calendar, Edit, LogOut } from "lucide-react";
import toast from "react-hot-toast";

function ProfileContent() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    toast.success("লগআউট সম্পন্ন হয়েছে");
    router.push("/");
  };

  if (!user) return null;

  const joinDate = user.createdAt
    ? formatBengaliDate(new Date(user.createdAt))
    : "জানা নেই";

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          আমার প্রোফাইল
        </h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
          {/* Avatar + Name */}
          <div className="flex items-center gap-5 pb-6 border-b border-gray-100">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {user.name ? user.name.charAt(0).toUpperCase() : "👤"}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {user.name || "ব্যবহারকারী"}
              </h2>
              <p className="text-gray-500 flex items-center gap-1.5 mt-1">
                <Mail size={14} />
                {user.email}
              </p>
            </div>
          </div>

          {/* Info */}
          <div className="py-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-dhaner-shobuj">
                <User size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">নাম</p>
                <p className="font-medium text-gray-800">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">ইমেইল</p>
                <p className="font-medium text-gray-800">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">যোগদানের তারিখ</p>
                <p className="font-medium text-gray-800">{joinDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                🔐
              </div>
              <div>
                <p className="text-sm text-gray-500">লগইন পদ্ধতি</p>
                <p className="font-medium text-gray-800 capitalize">
                  {user.provider === "google"
                    ? "Google"
                    : user.provider === "github"
                    ? "GitHub"
                    : "ইমেইল ও পাসওয়ার্ড"}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100">
            <Link
              href="/update-profile"
              className="flex-1 flex items-center justify-center gap-2 bg-dhaner-shobuj hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              <Edit size={18} />
              প্রোফাইল এডিট করুন
            </Link>
            <button
              onClick={handleSignOut}
              className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-3 rounded-xl transition-colors border border-red-100"
            >
              <LogOut size={18} />
              সাইন আউট
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 text-center border border-gray-100">
            <p className="text-2xl font-bold text-dhaner-shobuj">৩৩</p>
            <p className="text-xs text-gray-500 mt-1">পণ্য দেখা হয়েছে</p>
          </div>
          <div className="bg-white rounded-xl p-5 text-center border border-gray-100">
            <p className="text-2xl font-bold text-amber-500">৮</p>
            <p className="text-xs text-gray-500 mt-1">ক্যাটাগরি</p>
          </div>
          <div className="bg-white rounded-xl p-5 text-center border border-gray-100">
            <p className="text-2xl font-bold text-blue-500">৮+</p>
            <p className="text-xs text-gray-500 mt-1">বাজার</p>
          </div>
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
