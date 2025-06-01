import { fetchChats } from "@/controllers/chats/fetchChats";
import { fetchMessages } from "@/controllers/chats/fetchMessages";
import { send } from "@/controllers/chats/send";
import { protectedRoute } from "@/middleware/protectedRoute";
import { validateSendMessageInput } from "@/middleware/validator/sendMessage.validator";
import { Router } from "express";

const router = Router();

router.get("/", protectedRoute, fetchChats);
router.get("/messages/:chatId", protectedRoute, fetchMessages);
router.post("/send", validateSendMessageInput, protectedRoute, send);

export default router;
