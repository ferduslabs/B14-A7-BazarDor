"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { SkeletonGrid } from "./SkeletonCard";

export default function AuthGuard({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin?redirect=" + encodeURIComponent(window.location.pathname));
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <SkeletonGrid count={4} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          লগইন প্রয়োজন
        </h2>
        <p className="text-gray-500 mb-6">
          এই পেজটি দেখতে অনুগ্রহ করে লগইন করুন
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
