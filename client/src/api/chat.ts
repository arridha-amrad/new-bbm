import { privateAxios } from "@/lib/axios";

export const fetchMyChats = async () => {
  return privateAxios.get("/chats");
};

export const fetchMessages = async (chatId: string) => {
  return privateAxios.get(`/chats/messages/${chatId}`);
};
