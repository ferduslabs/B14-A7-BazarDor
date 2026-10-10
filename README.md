# 🛒 Bazar Dor (বাজার দর)

> Bangladesh market price tracker — daily commodity prices at a glance.

---

## 📦 Repository & Live Site

- **GitHub Repository:** [https://github.com/ferduslabs/B14-A7-BazarDor](https://github.com/ferduslabs/B14-A7-BazarDor)
- **Live Site:** [https://ferduslabs.github.io/B14-A7-BazarDor/](https://ferduslabs.github.io/B14-A7-BazarDor/)

---

## 📋 About

**Bazar Dor** is a Next.js 14 web app that tracks daily market prices of essential commodities in Bangladesh. From rice, lentils, and oil to vegetables, fish, meat, eggs, dairy, and spices — see today's prices, price changes, and market-wise comparisons all in one place.

Built with **Next.js App Router**, **Tailwind CSS**, and a **BetterAuth-style** authentication system. Fully responsive with a complete Bengali (Bangla) interface.

---

## ✨ Key Features

1. 🔥 **Live Price Tracker** — See which prices are rising and falling each day
2. 📊 **Market-wise Price Comparison** — Compare min/max prices across 8 different markets
3. 📈 **Price History** — Compare with yesterday, last week, and last month
4. 🔐 **User Authentication** — Sign up, sign in, and update your profile (email/password + Google + GitHub)
5. 🔍 **Category Browsing** — Browse 33 products across 8 categories with sort options
6. 📱 **Fully Responsive** — Works perfectly on mobile, tablet, and desktop
7. 🇧🇩 **Complete Bengali Interface** — Bengali digits, Bengali text everywhere
8. 🔄 **Sort Functionality** — Sort by price (low to high / high to low)
9. ⚡ **Skeleton Loading** — Beautiful skeleton animations while data loads
10. 🔔 **Toast Notifications** — Real-time feedback for every action
11. 🏷️ **Price Ticker** — Animated marquee showing live price updates
12. 🔒 **Protected Routes** — Product detail page requires login
13. 📸 **Profile Picture** — Upload and manage your profile photo
14. 🚀 **Static Export (SSG)** — Fast loading with pre-rendered pages

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| Next.js 14 (App Router) | UI and routing |
| React 18 | Interactive components |
| Tailwind CSS | Styling and responsiveness |
| React Hot Toast | Toast notifications |
| Lucide React | Icon library |
| Context API | Authentication state management |
| SSG (Static Export) | Fast performance, GitHub Pages deployment |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Production build
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
bazardor/
├── app/
│   ├── layout.js              # Root layout
│   ├── page.js                # Home page
│   ├── globals.css            # Global styles
│   ├── not-found.js           # 404 page
│   ├── category/
│   │   └── [slug]/
│   │       ├── page.js        # Category page (SSG)
│   │       └── CategoryClient.js
│   ├── product/
│   │   └── [slug]/
│   │       ├── page.js        # Product detail (protected)
│   │       └── ProductDetailClient.js
│   ├── signin/page.js         # Sign in
│   ├── signup/page.js         # Sign up
│   ├── profile/page.js        # Profile page
│   └── update-profile/page.js # Update profile
├── components/
│   ├── Navbar.js              # Navbar + category menu
│   ├── Footer.js              # Footer
│   ├── Hero.js                # Hero section
│   ├── ProductCard.js         # Product card
│   ├── PriceTicker.js         # Price marquee ticker
│   ├── SkeletonCard.js        # Loading skeleton
│   └── AuthGuard.js           # Protected route guard
├── lib/
│   ├── bangla.js              # Bengali digit converter
│   ├── fallback-data.js       # Fallback data (33 products)
│   ├── fetchData.js           # 3-tier API fallback
│   └── auth-context.js        # Authentication context
├── next.config.mjs
├── tailwind.config.js
└── README.md
```

---

## 📦 API Data

- **Primary API:** `https://api.api-store.workers.dev/api/bazardor`
- **Alternative API:** `https://api.abcz.workers.dev/api/bazardor`

Data loading strategy:
1. Try primary API first
2. Fall back to alternative API
3. Use local fallback data if both fail

---

## 📚 Categories

| Category | Icon | Products |
|----------|------|----------|
| Rice (চাল) | 🍚 | 4 |
| Lentils (ডাল) | 🫘 | 4 |
| Oil (তেল) | 🫙 | 3 |
| Vegetables (সবজি) | 🥬 | 5 |
| Fish (মাছ) | 🐟 | 5 |
| Meat (মাংস) | 🍗 | 4 |
| Eggs & Dairy (ডিম-দুধ) | 🥛 | 4 |
| Spices (মসলা) | 🌶️ | 4 |
| **Total** | | **33** |

---

## 🎨 Color Scheme

- **Background:** White (#ffffff)
- **Card:** Light green (#f8faf7)
- **Primary:** Emerald green (#059669)
- **Price Up:** Red (#dc2626)
- **Price Down:** Green (#16a34a)
- **Neutral:** Gray (#6b7280)

---

## 🔐 Authentication

- Register and log in with email + password
- Social login with Google and GitHub
- Protected routes (product details, profile)
- Profile update feature (name + profile picture)
- Data stored in localStorage

---

## 📄 License

ISC
