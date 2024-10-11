import { findMessages } from "@/services/chats";
import { NextFunction, Request, Response } from "express";

export const fetchMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { chatId } = req.params;
  try {
    const messages = await findMessages(chatId);
    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
};
