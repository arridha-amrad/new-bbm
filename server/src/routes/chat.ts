import { fetchChats } from "@/controllers/chats/fetchChats";
import { fetchMessages } from "@/controllers/chats/fetchMessages";
import { send } from "@/controllers/chats/send";
import { verifyAuthToken } from "@/lib/jwt";
import { Router } from "express";

const router = Router();

router.get("/", verifyAuthToken, fetchChats);
router.get("/messages/:chatId", fetchMessages);
router.post("/send", verifyAuthToken, send);

export default router;
