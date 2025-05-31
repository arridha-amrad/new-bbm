import { CookieOptions } from "express";

export const JWT_VERSION_LENGTH = 10;
export const COOKIE_REF_TOKEN = "rtc";
export const COOKIE_OPTIONS: CookieOptions = {
  sameSite: "lax",
  maxAge: 1000 * 60 * 60 * 24 * 7,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};
