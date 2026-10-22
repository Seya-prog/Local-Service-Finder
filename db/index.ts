import { sql } from "@vercel/postgres"
import { drizzle } from "drizzle-orm/vercel-postgres"
import * as schema from "./schema"

// Drizzle instance configured with Vercel Postgres
export const db = drizzle(sql, { schema })

export * from "./schema"
