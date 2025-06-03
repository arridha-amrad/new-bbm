import { privateAxios } from "@/lib/axios";
import { TSendMessage } from "@/validators/chat";

export type TFetchChatFromApi = {
  id: number;
  name: string | null;
  isGroup: boolean;
  participants: {
    id: number;
    username: string;
    imageURL: string | null;
  }[];
  message: {
    content: string;
    date: Date;
  };
};

export const fetchChatsApi = async () => {
  const response = await privateAxios.get<{ chats: TFetchChatFromApi[] }>(
    "/chats"
  );
  return response;
};

export type TFetchMessageFromApi = {
  id: number;
  chatId: number;
  content: string;
  sentAt: Date;
  userId: number;
  readers: {
    id: number;
    username: string;
    email: string;
    imageURL: string | null;
    createdAt: Date;
  }[];
};

export const fetchChatMessagesApi = async (chatId: number) => {
  return privateAxios.get<{ messages: TFetchMessageFromApi[] }>(
    `/chats/messages/${chatId}`
  );
};

export const sendMessageApi = async (data: TSendMessage) => {
  return privateAxios.post<{ message: TFetchMessageFromApi }>(
    "/chats/send",
    data
  );
};
