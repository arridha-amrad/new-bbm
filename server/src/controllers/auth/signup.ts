import { COOKIE_OPTIONS, COOKIE_REF_TOKEN } from "@/constants";
import { SignupInput } from "@/middleware/validator/signup.validator";
import AuthService from "@/services/AuthService";
import UserService from "@/services/UserService";
import { NextFunction, Request, Response } from "express";

export default async function signupHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password, username, imageURL } = req.body as SignupInput;
  try {
    const userService = new UserService();
    const authService = new AuthService();

    const result = await userService.checkEmailAndUsernameUniqueness(
      email,
      username
    );
    if (typeof result !== "undefined") {
      const { constraint } = result;
      res.status(403).json({ message: `${constraint} has been taken` });
      return;
    }

    const user = await userService.addNewUser({
      email,
      username,
      password,
      imageURL,
    });

    const { accessToken, rawRefreshToken } =
      await authService.generateAuthToken({
        jwtVersion: user.jwtVersion,
        userId: user.id,
      });

    res.cookie(COOKIE_REF_TOKEN, rawRefreshToken, COOKIE_OPTIONS);
    res.status(201).json({
      accessToken,
      user: userService.setUserResponse(user),
    });
    return;
  } catch (err) {
    next(err);
  }
}
