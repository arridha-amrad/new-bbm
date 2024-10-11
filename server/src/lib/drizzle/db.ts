import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  port: 3306,
  database: "messenger",
});

export const connectDb = async () => {
  try {
    await pool.getConnection();
    console.log("🔥 Connected to mysql through drizzle-orm pool connection 🔥");
  } catch (err) {
    throw err;
  }
};

const db = drizzle(pool, {
  schema,
  mode: "default",
});

export default db;
