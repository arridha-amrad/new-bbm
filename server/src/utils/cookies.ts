import { CookieOptions, Request } from "express";

export const REFRESH_TOKEN = "REFRESH_TOKEN";

export const cookieOptions: CookieOptions = {
  maxAge: 1000 * 60 * 60 * 24 * 365,
  httpOnly: true,
  secure: false,
};

export const getRefreshTokenFromCookie = (req: Request): string | undefined => {
  const bearerToken = req.cookies.REFRESH_TOKEN as string | undefined;
  if (typeof bearerToken === "string") {
    return bearerToken.split(" ")[1];
  }
};
