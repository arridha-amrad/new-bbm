import { verifyToken } from "@/lib/jwt";
import { removeToken } from "@/services/token";
import { getRefreshTokenFromCookie } from "@/utils/cookies";
import { NextFunction, Request, Response } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
  const currentRefToken = getRefreshTokenFromCookie(req);
  try {
    if (currentRefToken) {
      const { tokenId } = await verifyToken({
        token: currentRefToken,
        type: "refresh",
        ignoreExpiration: true,
      });
      if (tokenId) {
        await removeToken(tokenId);
      }
    }
    res.clearCookie("token");
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
