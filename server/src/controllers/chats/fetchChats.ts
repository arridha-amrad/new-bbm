import ChatService from "@/services/ChatService";
import { NextFunction, Request, Response } from "express";

export const fetchChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;
  const chatService = new ChatService();
  try {
    if (!userId) {
      res.sendStatus(401);
      return;
    }
    const chats = await chatService.fetchChatsByUserId(userId);
    res.status(200).json({ chats });
    return;
  } catch (err) {
    next(err);
  }
};
