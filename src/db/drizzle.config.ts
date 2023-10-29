import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import type { Config } from "drizzle-kit";

export const FOLDER_MIGRATIONS = "src/db/migrations";

export default {
  schema: "./src/db/schema/upload/schema.ts",
  out: FOLDER_MIGRATIONS,
  driver: "better-sqlite",
  dbCredentials: {
    url: "src/db/__db__/sqlite.db",
  },
} satisfies Config;

export const dbInstance = drizzle(new Database("src/db/__db__/sqlite.db"));



