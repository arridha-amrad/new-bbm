import { fetchChats } from "@/controllers/chats/fetchChats";
import { fetchMessages } from "@/controllers/chats/fetchMessages";
import giveReactionOnMessage from "@/controllers/chats/giveReactionOnMessage";
import { sendMessage } from "@/controllers/chats/sendMessage";
import { protectedRoute } from "@/middleware/protectedRoute";
import { validateMessageReactionInput } from "@/middleware/validator/messageReaction.validator";
import { validateSendMessageInput } from "@/middleware/validator/sendMessage.validator";
import { Router } from "express";

const router = Router();

router.get("/", protectedRoute, fetchChats);
router.get("/messages/:chatId", protectedRoute, fetchMessages);
router.post(
  "/message/reaction/:messageId",
  validateMessageReactionInput,
  protectedRoute,
  giveReactionOnMessage
);
router.post("/send", validateSendMessageInput, protectedRoute, sendMessage);

export default router;
