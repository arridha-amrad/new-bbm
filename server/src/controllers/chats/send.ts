import { newChat, newParticipants, saveMessage } from "@/services/chats";
import { NextFunction, Request, Response } from "express";
import { nanoid } from "nanoid";

export const send = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.app.locals.userId;
  const { content, chatName, receiverUserId } = req.body;
  let { chatId } = req.body;
  try {
    if (chatId === "") {
      chatId = nanoid(15);
      await newChat({
        id: chatId,
        name: chatName,
      });
      await newParticipants([
        {
          chatId,
          userId,
        },
        {
          chatId,
          userId: receiverUserId,
        },
      ]);
    }
    const message = await saveMessage({ content, userId, chatId });
    res.status(201).json({ message });
  } catch (err) {
    next(err);
  }
};
