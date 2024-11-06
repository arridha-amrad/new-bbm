import { createToken, verifyToken } from "@/lib/jwt";
import {
  deleteTokenById,
  deleteTokensByUserId,
  findToken,
  saveToken,
} from "@/services/token";
import { findUserById } from "@/services/user";
import {
  getRefreshTokenFromCookie,
  cookieOptions,
  REFRESH_TOKEN,
} from "@/utils/cookies";
import { CustomError } from "@/utils/CustomError";
import { NextFunction, Request, Response } from "express";
import { nanoid } from "nanoid";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getRefreshTokenFromCookie(req);
    if (!token) {
      throw new CustomError("ref token was not included", 404);
    }
    const { userId, type, tokenId } = await verifyToken({
      token,
      type: "refresh",
    });
    if (type !== "refresh" || !tokenId) {
      throw new CustomError("token invalid", 400);
    }
    const storedToken = await findToken(tokenId);
    // reuse token detected
    if (!storedToken) {
      await deleteTokensByUserId(userId);
      throw new CustomError("reuse token detected", 400);
    }
    await deleteTokenById(storedToken.id);
    const user = await findUserById(userId);
    if (user === null) {
      throw new CustomError("Unknown token", 400);
    }
    const newTokenId = nanoid(15);
    const newRefreshToken = await createToken({
      type: "refresh",
      userId: user.id,
      tokenId: newTokenId,
    });
    const newAccessToken = await createToken({
      type: "auth",
      userId: user.id,
    });
    await saveToken({
      userId: user.id,
      value: newRefreshToken,
      id: newTokenId,
    });
    res.cookie(REFRESH_TOKEN, `Bearer ${newRefreshToken}`, cookieOptions);
    res.status(200).json({ token: `Bearer ${newAccessToken}` });
  } catch (err) {
    next(err);
  }
};
