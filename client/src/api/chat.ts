import { privateAxios } from "@/lib/axios";
import { TSendMessage } from "@/validators/chat";

export const fetchChatsApi = async () => {
  return privateAxios.get("/chats");
};

export const fetchChatMessagesApi = async (chatId: string) => {
  return privateAxios.get(`/chats/messages/${chatId}`);
};

export const sendMessageApi = async (data: TSendMessage) => {
  return privateAxios.post("/chats/send", data);
};
