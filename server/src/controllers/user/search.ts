import { searchUsers } from "@/services/user";
import { NextFunction, Request, Response } from "express";

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { key } = req.query;
  try {
    const users = await searchUsers(key as string);
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
