import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load the standard .env file
dotenv.config({ path: ".env" });

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL || process.env.DATABASE_URL || "",
  },
});
