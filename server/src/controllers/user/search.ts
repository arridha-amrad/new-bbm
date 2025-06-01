import { SearchUserInput } from "@/middleware/validator/searchUser.validator";
import UserService from "@/services/UserService";
import { NextFunction, Request, Response } from "express";

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { key } = req.body as SearchUserInput;
  const userService = new UserService()
  try {
    const users = await userService.searchUsers(key)
    res.status(200).json({ users });
    return
  } catch (err) {
    next(err);
  }
};
