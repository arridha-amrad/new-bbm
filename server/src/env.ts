import dotenv from "dotenv";
import path from "path";

const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env.dev";

dotenv.config({
  path: path.resolve(envFile),
});

export const env = {
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN!,
  BASE_URL: process.env.BASE_URL!,
  PORT: process.env.PORT!,
  JWT_SECRET: process.env.JWT_SECRET!,
};
