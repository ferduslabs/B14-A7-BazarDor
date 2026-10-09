// auth.js
// Auth configuration for Bazar Dor
// Uses a client-side context-based auth system with localStorage persistence
// Pattern inspired by BetterAuth for a clean API

export const authConfig = {
  basePath: "/api/auth",
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
  socialProviders: {
    google: {
      enabled: true,
      name: "Google",
    },
    github: {
      enabled: true,
      name: "GitHub",
    },
  },
  pages: {
    signIn: "/signin",
    signUp: "/signup",
    profile: "/profile",
  },
};

export default authConfig;
