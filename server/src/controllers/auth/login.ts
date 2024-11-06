import { createToken, verifyToken } from "@/lib/jwt";
import { options } from "@/lib/noders-argon";
import { removeToken, saveToken } from "@/services/token";
import { findUserByEmailOrUsername } from "@/services/user";
import {
  getRefreshTokenFromCookie,
  cookieOptions,
  REFRESH_TOKEN,
} from "@/utils/cookies";
import { CustomError, ValidationError } from "@/utils/CustomError";
import { validateLogin } from "@/validators/auth";
import { verify } from "@node-rs/argon2";
import { NextFunction, Request, Response } from "express";
import { nanoid } from "nanoid";

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { identity, password } = req.body;
  try {
    const currentRefToken = getRefreshTokenFromCookie(req);
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
    const { valid, errors } = validateLogin({
      identity,
      password,
    });
    if (!valid) {
      throw new ValidationError(errors);
    }
    const user = await findUserByEmailOrUsername(identity);
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    const isMatch = await verify(user.password, password, options);
    if (!isMatch) {
      throw new CustomError("password not match", 400);
    }
    const authToken = await createToken({
      type: "auth",
      userId: user.id,
    });
    const tokenId = nanoid(15);
    const refreshToken = await createToken({
      type: "refresh",
      userId: user.id,
      tokenId,
    });
    await saveToken({ userId: user.id, value: refreshToken, id: tokenId });
    // eslint-disable-next-line
    const { password: pwd, ...props } = user;
    res.cookie(REFRESH_TOKEN, `Bearer ${refreshToken}`, cookieOptions);
    res.status(200).json({
      token: `Bearer ${authToken}`,
      user: props,
    });
  } catch (err) {
    next(err);
  }
};

export default login;
