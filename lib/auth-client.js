import { createAuthClient } from "better-auth/react";

// Client-side baseURL — browser-এ same domain use হবে
// NEXT_PUBLIC_ prefix দিয়ে environment variable expose করতে হয়
const baseURL =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL,
});
