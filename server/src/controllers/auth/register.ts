import { createToken } from "@/lib/jwt";
import { options } from "@/lib/noders-argon";
import { saveToken } from "@/services/token";
import { createUser, findUserByEmailOrUsername } from "@/services/user";
import { setCookieOptions } from "@/utils/cookies";
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
    const data = {
      id: nanoid(15),
      email,
      password: hashedPassword,
      username,
    };
    await createUser(data);
    const tokenId = nanoid(15);
    const authToken = await createToken({
      type: "auth",
      userId: data.id,
    });
    const refToken = await createToken({
      type: "refresh",
      userId: data.id,
      tokenId,
    });
    await saveToken({ userId: data.id, value: refToken, id: tokenId });
    res
      .status(201)
      .cookie("token", `Bearer ${refToken}`, setCookieOptions)
      .json({
        token: `Bearer ${authToken}`,
      });
    return;
  } catch (err) {
    next(err);
  }
};

export default register;
