import { createToken } from "@/lib/jwt";
import { options } from "@/lib/noders-argon";
import { saveToken } from "@/services/token";
import { createUser, findUserByEmailOrUsername } from "@/services/user";
import { cookieOptions, REFRESH_TOKEN } from "@/utils/cookies";
import { CustomError, ValidationError } from "@/utils/CustomError";
import { validateRegistration } from "@/validators/auth";
import { hash } from "@node-rs/argon2";
import { NextFunction, Request, Response } from "express";
import { nanoid } from "nanoid";

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, username } = req.body;
  try {
    const { errors, valid } = validateRegistration({
      email,
      password,
      username,
    });
    if (!valid) {
      throw new ValidationError(errors);
    }
    const isEmailExist = await findUserByEmailOrUsername(email);
    if (isEmailExist) {
      throw new CustomError("Email already registered", 400);
    }
    const isUsernameExist = await findUserByEmailOrUsername(username);
    if (isUsernameExist) {
      throw new CustomError("Username already registered", 400);
    }
    const hashedPassword = await hash(password, options);

    const { id } = await createUser({
      email,
      password: hashedPassword,
      username,
    });

    const tokenId = nanoid(15);
    const newAccessToken = await createToken({
      type: "auth",
      userId: id,
    });
    const newRefreshToken = await createToken({
      type: "refresh",
      userId: id,
      tokenId,
    });

    await saveToken({ userId: id, value: newRefreshToken, id: tokenId });

    res.cookie(REFRESH_TOKEN, `Bearer ${newRefreshToken}`, cookieOptions);

    res.status(201).json({
      token: `Bearer ${newAccessToken}`,
    });
  } catch (err) {
    next(err);
  }
};

export default register;
