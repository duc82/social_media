import { defineConfig } from "drizzle-kit";

const POSTGRES_URL = process.env.POSTGRES_URL;

if (!POSTGRES_URL) {
  throw new Error("Please provide POSTGRES_URL in .env");
}

export default defineConfig({
  schema: "./src/app/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: POSTGRES_URL,
  },
});
