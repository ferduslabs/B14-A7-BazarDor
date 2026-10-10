// BetterAuth Configuration
// Docs: https://better-auth.com
// Authentication: email/password + Google + GitHub social login
import { betterAuth } from "better-auth";

// Create BetterAuth instance with email/password + social providers
// Falls back to client-side storage for static deployment
let auth;
try {
  auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    secret: process.env.BETTER_AUTH_SECRET || "bazardor-static-deployment-secret-key",
    database: null,
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID || "google-client-id",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "google-client-secret",
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID || "github-client-id",
        clientSecret: process.env.GITHUB_CLIENT_SECRET || "github-client-secret",
      },
    },
    user: {
      additionalFields: {
        name: {
          type: "string",
          required: true,
        },
      },
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
    },
  });
} catch (err) {
  // Fallback for static deployment / client-side only
  auth = {
    api: {
      signUp: {
        emailAndPassword: async () => ({ data: null }),
      },
      signIn: {
        emailAndPassword: async () => ({ data: null }),
        social: async () => ({ data: null }),
      },
      signOut: async () => {},
      updateUser: async () => ({ data: null }),
    },
  };
}

export { auth };
export default auth;
