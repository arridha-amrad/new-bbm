import { createChat, newParticipants, saveMessage } from "@/services/chats";
import { NextFunction, Request, Response } from "express";

export const send = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.app.locals.userId;
  const { content, chatName, receiverUserId } = req.body;
  let { chatId } = req.body;
  try {
    console.log(req.body);

    // if (chatId === "") {
    //   const newChat = await createChat({
    //     id: chatId,
    //     name: chatName,
    //   });
    //   chatId = newChat.id;
    //   await newParticipants([
    //     {
    //       chatId,
    //       userId,
    //     },
    //     {
    //       chatId,
    //       userId: receiverUserId,
    //     },
    //   ]);
    // }
    // const message = await saveMessage({ content, userId, chatId });
    res.status(201).json({ message: "ok" });
  } catch (err) {
    next(err);
  }
};
