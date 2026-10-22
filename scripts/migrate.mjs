// Drizzle database migration helper for Vercel Postgres
import { execSync } from "node:child_process"

console.log("🚀 Running Drizzle migrations for Vercel Postgres...")
try {
  execSync("npx drizzle-kit push", { stdio: "inherit" })
  console.log("✅ Vercel Postgres schema updated successfully.")
} catch (err) {
  console.error("❌ Migration failed. Ensure POSTGRES_URL or DATABASE_URL is set in .env.local", err)
  process.exit(1)
}
