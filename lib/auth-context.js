"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // BetterAuth session listener — auto-updates when auth state changes
  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await authClient.getSession();
        if (session?.data?.user) {
          setUser(session.data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const signUp = async ({ name, email, password }) => {
    const result = await authClient.signUp.email({
      name,
      email,
      password,
    });
    if (result?.data?.user) {
      setUser(result.data.user);
      return result.data.user;
    }
    if (result?.error) {
      throw new Error(result.error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
    }
    throw new Error("রেজিস্ট্রেশন ব্যর্থ হয়েছে");
  };

  const signIn = async ({ email, password }) => {
    const result = await authClient.signIn.email({
      email,
      password,
    });
    if (result?.data?.user) {
      setUser(result.data.user);
      return result.data.user;
    }
    if (result?.error) {
      throw new Error(result.error.message || "ইমেইল বা পাসওয়ার্ড ভুল");
    }
    throw new Error("ইমেইল বা পাসওয়ার্ড ভুল");
  };

  const signInWithProvider = async (provider) => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
  };

  const signOut = async () => {
    await authClient.signOut();
    setUser(null);
  };

  const updateUser = async (updates) => {
    if (!user) throw new Error("লগইন করা নেই");
    const result = await authClient.updateUser({
      name: updates.name || user.name,
    });
    if (result?.data) {
      setUser({ ...user, ...updates });
      return { ...user, ...updates };
    }
    throw new Error("আপডেট ব্যর্থ হয়েছে");
  };

  const updateProfilePicture = async (file) => {
    if (!user) throw new Error("লগইন করা নেই");
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        updateUser({ image: imageData })
          .then((u) => resolve(u))
          .catch((err) => reject(err));
      };
      reader.onerror = () => reject(new Error("ছবি পড়া যায়নি"));
      reader.readAsDataURL(file);
    });
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signInWithProvider,
    signOut,
    updateUser,
    updateProfilePicture,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
