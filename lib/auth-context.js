"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "bazardor_auth_user";

function generateId() {
  return "user_" + Math.random().toString(36).substring(2, 10);
}

function getStoredUser() {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (err) {
    return null;
  }
  return null;
}

function setStoredUser(user) {
  if (typeof window === "undefined") return;
  if (user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function hashPassword(password) {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return String(hash);
}

function getUsersDB() {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("bazardor_users_db");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveUsersDB(users) {
  if (typeof window === "undefined") return;
  localStorage.setItem("bazardor_users_db", JSON.stringify(users));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) {
      setUser(stored);
    }
    setLoading(false);
  }, []);

  const signUp = async ({ name, email, password }) => {
    const users = getUsersDB();
    const existing = users.find((u) => u.email === email.toLowerCase());
    if (existing) {
      throw new Error("এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট রয়েছে");
    }
    const newUser = {
      id: generateId(),
      name,
      email: email.toLowerCase(),
      password: hashPassword(password),
      provider: "email",
      createdAt: new Date().toISOString(),
      image: null,
    };
    users.push(newUser);
    saveUsersDB(users);
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    setStoredUser(userWithoutPassword);
    return userWithoutPassword;
  };

  const signIn = async ({ email, password }) => {
    const users = getUsersDB();
    const found = users.find((u) => u.email === email.toLowerCase());
    if (!found) {
      throw new Error("ইমেইল বা পাসওয়ার্ড ভুল");
    }
    if (found.password !== hashPassword(password)) {
      throw new Error("ইমেইল বা পাসওয়ার্ড ভুল");
    }
    const { password: _, ...userWithoutPassword } = found;
    setUser(userWithoutPassword);
    setStoredUser(userWithoutPassword);
    return userWithoutPassword;
  };

  const signInWithProvider = async (provider) => {
    const providerName = provider === "google" ? "Google" : "GitHub";
    const mockEmail = `demo@${provider}.com`;
    const users = getUsersDB();
    let found = users.find((u) => u.email === mockEmail);

    if (!found) {
      found = {
        id: generateId(),
        name: `${providerName} ব্যবহারকারী`,
        email: mockEmail,
        password: null,
        provider,
        createdAt: new Date().toISOString(),
        image: provider === "google" ? "🔵" : "⚫",
      };
      users.push(found);
      saveUsersDB(users);
    }

    const { password: _, ...userWithoutPassword } = found;
    setUser(userWithoutPassword);
    setStoredUser(userWithoutPassword);
    return userWithoutPassword;
  };

  const signOut = async () => {
    setUser(null);
    setStoredUser(null);
  };

  const updateUser = async (updates) => {
    if (!user) throw new Error("লগইন করা নেই");
    const updated = { ...user, ...updates };
    setUser(updated);
    setStoredUser(updated);

    const users = getUsersDB();
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updates };
      saveUsersDB(users);
    }
    return updated;
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
