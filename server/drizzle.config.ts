import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/drizzle/schema.ts",
  out: "./src/lib/drizzle/migrations",
  dialect: "mysql",
  dbCredentials: {
    host: "localhost",
    user: "root",
    port: 3306,
    database: "messenger",
  },
  strict: true,
  verbose: true,
} satisfies Config;
