import ChatService from "@/services/ChatService";
import { NextFunction, Request, Response } from "express";

export default async function giveReactionOnMessage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { emoji, messageId, unified } = req.body;
  const userId = req.user?.id;

  try {
    if (!userId) {
      throw new Error("Unauthorized. UserId is missing");
    }
    const chatService = new ChatService();
    const reaction = await chatService.findOneReactionOfMessage(
      userId,
      messageId,
      unified
    );
    let message = "";
    if (reaction) {
      await chatService.deleteOneReactionMessage(userId, messageId, unified);
      message = "deleted";
    } else {
      await chatService.giveReactionToMessage(
        messageId,
        userId,
        emoji,
        unified
      );
      message = "created";
    }
    res.status(201).json({ message });
    return;
  } catch (err) {
    next(err);
  }
}
