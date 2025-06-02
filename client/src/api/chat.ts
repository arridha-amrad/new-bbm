import { privateAxios } from "@/lib/axios";
import { TSendMessage } from "@/validators/chat";

export const fetchChatsApi = async () => {
  const response = await privateAxios.get("/chats");
  return response;
};

export const fetchChatMessagesApi = async (chatId: number) => {
  return privateAxios.get(`/chats/messages/${chatId}`);
};

export const sendMessageApi = async (data: TSendMessage) => {
  return privateAxios.post("/chats/send", data);
};
