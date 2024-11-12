import { privateAxios } from "@/lib/axios";
import { TSendMessage } from "@/validators/chat";

export const fetchMyChats = async () => {
  return privateAxios.get("/chats");
};

export const fetchMessages = async (chatId: string) => {
  return privateAxios.get(`/chats/messages/${chatId}`);
};

export const sendMessage = async (data: TSendMessage) => {
  return privateAxios.post("/chats/send", data);
};
