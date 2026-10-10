"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "bazardor_auth_user";
const USERS_DB_KEY = "bazardor_users_db";
const SEED_KEY = "bazardor_seeded_v1";

function generateId() {
  return "user_" + Math.random().toString(36).substring(2, 10);
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

function seedDemoAccounts() {
  if (typeof window === "undefined") return;
  try {
    if (localStorage.getItem(SEED_KEY)) return;
    const existing = localStorage.getItem(USERS_DB_KEY);
    const users = existing ? JSON.parse(existing) : [];
    // Pre-seeded admin account
    const adminExists = users.find((u) => u.email === "ferdushassanprince@gmail.com");
    if (!adminExists) {
      users.push({
        id: "user_admin001",
        name: "ফেরদৌস হাসান",
        email: "ferdushassanprince@gmail.com",
        password: hashPassword("12345678"),
        provider: "email",
        createdAt: new Date().toISOString(),
        image: null,
      });
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
    }
    localStorage.setItem(SEED_KEY, "true");
  } catch {
    // ignore
  }
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

function getUsersDB() {
  if (typeof window === "undefined") return [];
  seedDemoAccounts();
  try {
    const stored = localStorage.getItem(USERS_DB_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveUsersDB(users) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
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
