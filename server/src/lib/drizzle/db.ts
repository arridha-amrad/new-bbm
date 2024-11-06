import "dotenv/config";

import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { sql } from "drizzle-orm";

const client = createClient({ url: process.env.DB_FILE_NAME! });

const db = drizzle({ client });

export const connectDb = async () => {
  try {
    await db.run(sql`SELECT 1`);
    console.log("db connection ok");
  } catch (err) {
    console.log("db connection error");
  }
};

export default db;
