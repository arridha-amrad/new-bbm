import { findChats } from "@/services/chats";
import { NextFunction, Request, Response } from "express";

export const fetchChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.app.locals.userId;
  const chats = await findChats(userId);
  res.status(200).json(chats);
  try {
  } catch (err) {
    next(err);
  }
};
