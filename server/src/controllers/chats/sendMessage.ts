import { SendMessageInput } from "@/middleware/validator/sendMessage.validator";
import ChatService from "@/services/ChatService";
import { NextFunction, Request, Response } from "express";

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;
  const { content, receiverIds, sentAt, chatName, isGroup } =
    req.body as SendMessageInput;
  let { chatId } = req.body as SendMessageInput;

  const chatService = new ChatService();

  try {
    if (!userId) {
      res.status(401).json({ message: "UserId is missing" });
      return;
    }

    if (!chatId) {
      const newChat = await chatService.initChat({ isGroup, name: chatName });
      chatId = newChat.id;
      await chatService.addChatParticipants(chatId, [...receiverIds, userId]);
    }

    const message = await chatService.saveMessage(
      chatId,
      content,
      sentAt,
      userId
    );
    res.status(201).json({ message });
    return;
  } catch (err) {
    next(err);
  }
};
