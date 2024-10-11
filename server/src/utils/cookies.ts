import { CookieOptions, Request } from "express";

export const setCookieOptions: CookieOptions = {
  maxAge: 1000 * 60 * 60 * 24 * 365,
  httpOnly: true,
  secure: false,
};

export const getRefreshTokenFromCookie = (req: Request): string | undefined => {
  const bearerToken = req.cookies.token as string | undefined;
  if (typeof bearerToken === "string") {
    return bearerToken.split(" ")[1];
  }
};
