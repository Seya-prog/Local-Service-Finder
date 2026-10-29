# 🚀 Local Service Finder (ቅደስ)

A modern web application that connects local service providers with customers in their area. Built with Next.js 16, Better Auth, and shadcn/ui.

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Auth:** Better Auth (email/password)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Language:** TypeScript
- **Database & ORM:** Vercel Postgres + Drizzle ORM
- **Auth Database:** Drizzle adapter (PostgreSQL schema)

## 📋 Prerequisites

- Node.js v18+ 
- npm v9+

## ⚡ Getting Started

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd local-service-finder
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create a `.env.local` file in the root:
   ```env
   BETTER_AUTH_SECRET=your-secret-key-here
   BETTER_AUTH_URL=http://localhost:3000
   ```
   

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
local-service-finder/
├── app/                          # Next.js App Router pages
│   ├── api/auth/[...all]/        # Better Auth API routes
│   ├── sign-in/                  # Sign-in page
│   ├── sign-up/                  # Sign-up page
│   ├── explore/                  # Service browsing
│   │   ├── [id]/                 # Dynamic service detail
│   ├── dashboard/
│   │   ├── customer/             # Customer bookings
│   │   └── provider/             # Provider management
│   ├── layout.tsx                # Root layout (Navbar + Footer)
│   └── page.tsx                  # Landing page
├── components/
│   ├── layout/                   # Navbar, Footer
│   ├── services/                 # ServiceCard, FilterBar
│   ├── dashboard/                # Dashboard components
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── auth.ts                   # Better Auth server config
│   ├── auth-client.ts            # Better Auth client hooks
│   ├── data.ts                   # Mock database
│   ├── actions.ts                # Server Actions
│   └── utils.ts                  # Utilities
└── proxy.ts                      # Route protection (Next.js 16 proxy)
```

## 👥 Group Members

- **Seid Muhidin** — Phase 1 (Infrastructure, Auth, Public UI)
- **Abel Solomon** — Phase 2 (Dashboards, Forms, Security)
- **Sinemistre Mekonen** — Phase 3 (Polish, Docs, QA)

## 📜 License

This project is part of a capstone assignment .