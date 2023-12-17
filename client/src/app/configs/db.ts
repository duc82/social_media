import { sql } from "@vercel/postgres";
import { drizzle as drizzleNode } from "drizzle-orm/node-postgres";
import { drizzle as drizzleVercel } from "drizzle-orm/vercel-postgres";
import { Pool } from "pg";

let db: ReturnType<typeof drizzleNode>;

if (process.env.NODE_ENV === "production") {
  db = drizzleVercel(sql);
} else {
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
  });
  db = drizzleNode(pool);
}

export default db;
