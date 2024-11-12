import { createChat, newParticipants, saveMessage } from "@/services/chats";
import { NextFunction, Request, Response } from "express";

export const send = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.app.locals.userId;
  const { content, receiverId } = req.body;
  let { chatId } = req.body;
  try {
    console.log(req.body);
    if (chatId === null) {
      const newChat = await createChat();
      chatId = newChat.id;
      await newParticipants([
        {
          chatId,
          userId,
        },
        {
          chatId,
          userId: receiverId,
        },
      ]);
    }
    const message = await saveMessage({ content, userId, chatId });
    res.status(201).json({ message });
  } catch (err) {
    next(err);
  }
};
