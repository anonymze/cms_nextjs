import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { FOLDER_MIGRATIONS, dbInstance } from "./drizzle.config";

migrate(dbInstance, { migrationsFolder: FOLDER_MIGRATIONS });

// process.exit(0);
