import UserService from "@/services/UserService";
import { NextFunction, Request, Response } from "express";

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const key = req.query.key as string;
  const userService = new UserService();
  try {
    const users = await userService.searchUsers(key);
    res
      .status(200)
      .json({ users: users.map((user) => userService.setUserResponse(user)) });
    return;
  } catch (err) {
    next(err);
  }
};
