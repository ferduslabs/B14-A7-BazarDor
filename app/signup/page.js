"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import toast from "react-hot-toast";

function SignUpContent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp, signInWithProvider, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (user) {
      router.push(redirect);
    }
  }, [user, router, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error("দয়া করে সব ঘর পূরণ করুন");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড মিলছে না");
      return;
    }
    if (password.length < 6) {
      toast.error("পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে");
      return;
    }
    setLoading(true);
    try {
      await signUp({ name, email, password });
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে! স্বাগতম!");
      router.push(redirect);
    } catch (err) {
      toast.error(err.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    try {
      await signInWithProvider(provider);
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে!");
      router.push(redirect);
    } catch (err) {
      toast.error(err.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            সাইন আপ
          </h1>
          <p className="text-gray-500">
            নতুন অ্যাকাউন্ট তৈরি করুন
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="আপনার ইমেইল"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-dhaner-shobuj/50 focus:ring-2 focus:ring-dhaner-shobuj/20 transition-all text-gray-800 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                পাসওয়ার্ড
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="আপনার পাসওয়ার্ড"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-dhaner-shobuj/50 focus:ring-2 focus:ring-dhaner-shobuj/20 transition-all text-gray-800 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="পাসওয়ার্ড পুনরায় লিখুন"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-dhaner-shobuj/50 focus:ring-2 focus:ring-dhaner-shobuj/20 transition-all text-gray-800 placeholder-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-dhaner-shobuj hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-dhaner-shobuj/20"
            >
              {loading ? "লোড হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-400">অথবা</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handleSocialLogin("google")}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl transition-colors disabled:opacity-50"
            >
              <span>🔵</span>
              Google দিয়ে সাইন আপ
            </button>
            <button
              onClick={() => handleSocialLogin("github")}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-50"
            >
              <span>⚫</span>
              GitHub দিয়ে সাইন আপ
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Link
              href={`/signin?redirect=${encodeURIComponent(redirect)}`}
              className="text-dhaner-shobuj hover:text-emerald-700 font-medium"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-16 text-center text-gray-500">লোড হচ্ছে...</div>}>
      <SignUpContent />
    </Suspense>
  );
}
