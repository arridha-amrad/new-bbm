import ChatService from "@/services/ChatService";
import { NextFunction, Request, Response } from "express";

export const fetchMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const chatService = new ChatService();
  const { chatId } = req.params;

  try {
    const messages = await chatService.fetchMessagesByChatId(Number(chatId));
    res.status(200).json({ messages });
    return;
  } catch (err) {
    next(err);
  }
};
