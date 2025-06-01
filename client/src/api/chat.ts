import { privateAxios } from "@/lib/axios";
import { TSendMessage } from "@/validators/chat";

export const fetchChatsApi = async () => {
  const response = await privateAxios.get("/chats");
  return response.data;
};

export const fetchChatMessagesApi = async (chatId: string) => {
  return privateAxios.get(`/chats/messages/${chatId}`);
};

export const sendMessageApi = async (data: TSendMessage) => {
  return privateAxios.post("/chats/send", data);
};
