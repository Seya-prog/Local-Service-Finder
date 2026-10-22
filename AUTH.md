# 🔐 AUTH.md — Authentication & Security Layers

## Overview

This project uses **Better Auth** for authentication, a self-hosted, type-safe auth solution for Next.js.

## Auth Architecture

### Server-Side (lib/auth.ts)
- Better Auth instance configured with **Vercel Postgres** via **Drizzle ORM** (`drizzleAdapter`)
- Schema defined in `db/schema.ts` (`user`, `session`, `account`, `verification`)
- Managed with Drizzle Kit migrations (`npm run db:push`, `npm run db:generate`)
- Email/password authentication enabled
- Custom `role` field on user model (`customer` | `provider`)
- Session management: 7-day expiry, daily refresh

### Client-Side (lib/auth-client.ts)
- `createAuthClient()` provides React hooks
- `useSession()` — reactive session state
- `signIn.email()` — email/password sign-in
- `signUp.email()` — registration with role
- `signOut()` — session termination

### API Route (app/api/auth/[...all]/route.ts)
- Catch-all route handler for all Better Auth endpoints
- Handles sign-in, sign-up, session, sign-out, etc.

### Route Protection (proxy.ts)
- Next.js 16 Proxy (replaces middleware.ts)
- Checks for `better-auth.session_token` cookie
- Redirects unauthenticated users from `/dashboard/*` to `/sign-in`
- Redirects authenticated users away from `/sign-in` and `/sign-up`

## Security Layers

1. **Proxy-level:** Route protection via cookie check
2. **Server-level:** `auth.api.getSession()` in Server Components
3. **Action-level:** Ownership checks in Server Actions (Phase 2)

## Session Cookie

Better Auth uses `better-auth.session_token` as the session cookie name by default.

---

*Phase 3 will add more detailed security analysis and testing results.*
