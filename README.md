# Bazar Dor (বাজার দর)

> বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দৈনিক বাজার দর — এক জায়গায়।

Bazar Dor is a Next.js 14 web application for tracking daily market prices of
essential commodities in Bangladesh. Users can browse products by category,
compare prices across markets, and create an account to view product details.
The whole interface is in Bengali (Bangla).

---

## Features

1. Daily price tracker with up/down price indicators
2. Price comparison across multiple markets
3. 33 products organized in 8 categories
4. Sort products by price (low to high / high to low)
5. User sign up and sign in with email and password
6. Social login with Google and GitHub
7. Profile page and profile update (name + picture)
8. Protected pages (login is required to view them)
9. Fully responsive design for mobile, tablet and desktop
10. Skeleton loading, toast notifications and an animated price ticker

---

## Technologies Used

| Technology | What it is used for |
|------------|---------------------|
| Next.js 14 (App Router) | Pages, routing and server-side API routes |
| React 18 | Interactive UI components |
| JavaScript | Programming language |
| Tailwind CSS + DaisyUI | Styling |
| Better Auth | Authentication (email/password, Google, GitHub) |
| MongoDB Atlas | Cloud database where users and sessions are stored |
| React Hot Toast | Pop-up notifications |
| Lucide React | Icons |
| Context API | Sharing the logged-in user across the app |

---

## How to Run This Project

1. Install [Node.js](https://nodejs.org) (version 18 or later).
2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a file named `.env.local` in the project root and add the following
   environment variables:

   ```bash
   BETTER_AUTH_SECRET="any-long-random-secret"
   BETTER_AUTH_URL="http://localhost:3000"
   MONGODB_URI="your-mongodb-atlas-connection-string"
   GOOGLE_CLIENT_ID="your-google-oauth-client-id"
   GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"
   GITHUB_CLIENT_ID="your-github-oauth-client-id"
   GITHUB_CLIENT_SECRET="your-github-oauth-client-secret"
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000` in your browser.

Other useful commands:

```bash
npm run build   # create a production build
npm run start   # run the production build
```

---

## Authentication and Database

Authentication is handled by **Better Auth**.

- When a user signs up, their account is saved in **MongoDB Atlas** (a cloud
  MongoDB database), not in the browser.
- Better Auth automatically creates and manages these database collections:
  - `user` — registered users (name, email, password hash, image)
  - `session` — active login sessions
  - `account` — linked Google/GitHub login accounts
  - `verification` — email verification records
- After login, the user stays logged in using a secure session cookie.
- Server-side route protection is done with Next.js middleware, and protected
  pages are also checked on the client with an auth guard component.

Key files:

| File | Responsibility |
|------|----------------|
| `lib/auth.js` | Server-side Better Auth configuration and MongoDB connection |
| `lib/auth-client.js` | Client-side auth helper used by the browser |
| `lib/auth-context.js` | React context: sign up, sign in, sign out, current user |
| `app/api/auth/[...all]/route.js` | Auth API endpoint (handles all Better Auth requests) |
| `middleware.js` | Redirects guests away from protected pages |
| `components/AuthGuard.js` | Client-side guard for protected pages |

---

## Project Structure

```
bazardor/
├── app/
│   ├── layout.js                  # Root layout
│   ├── page.js                    # Home page
│   ├── globals.css                # Global styles
│   ├── not-found.js               # 404 page
│   ├── icon.svg                   # Site favicon
│   ├── api/auth/[...all]/route.js # Better Auth API handler
│   ├── category/[slug]/           # Category listing page
│   ├── product/[slug]/            # Product detail page (protected)
│   ├── signin/page.js             # Sign in page
│   ├── signup/page.js             # Sign up page
│   ├── profile/page.js            # Profile page (protected)
│   └── update-profile/page.js     # Edit profile page (protected)
├── components/
│   ├── Navbar.js                  # Top navigation bar
│   ├── Footer.js                  # Footer
│   ├── Hero.js                    # Hero section
│   ├── ProductCard.js             # Product card
│   ├── PriceTicker.js             # Animated price ticker
│   ├── SkeletonCard.js            # Loading skeleton
│   └── AuthGuard.js               # Login guard wrapper
├── lib/
│   ├── bangla.js                  # Bengali digit/date helpers
│   ├── fallback-data.js           # Local backup data (33 products)
│   ├── fetchData.js               # API requests with backup fallback
│   ├── auth.js                    # Better Auth server config
│   ├── auth-client.js             # Better Auth client
│   └── auth-context.js            # Auth context provider and useAuth hook
├── public/
│   └── logo.svg                   # Site logo
├── middleware.js                  # Server-side protected routes
├── next.config.mjs
├── tailwind.config.js
└── package.json
```

---

## Categories

| Category (English) | Bengali | Products |
|--------------------|--------|----------|
| Rice | চাল | 4 |
| Lentils | ডাল | 4 |
| Oil | তেল | 3 |
| Vegetables | সবজি | 5 |
| Fish | মাছ | 5 |
| Meat | মাংস | 4 |
| Eggs & Dairy | ডিম-দুধ | 4 |
| Spices | মসলা | 4 |
| **Total** | | **33** |

---

## Color Scheme

- Background: White `#ffffff`
- Card: Light green `#f8faf7`
- Primary: Emerald green `#059669`
- Price up: Red `#dc2626`
- Price down: Green `#16a34a`

---

## License

ISC
