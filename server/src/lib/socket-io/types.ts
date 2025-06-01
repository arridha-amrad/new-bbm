import { Prisma } from "@prisma/client";

type Message = Pick<Prisma.MessageSelect, "chatId" | "content" | "sentAt" | "userId">

export interface ServerToClientEvents {
  receiveMessage: (message: Message) => void;
  checkIsOlineOrLastSeen: (data: string) => void;
  typingAlert: (data: boolean) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  addUser: (data: SocketUser) => void;
  sendMessage: (receiverIds: number[], message: Message) => void;
  setChat: (receiverIds: number[], senderId: number, isGroup: boolean) => void;
  typing: (receiverIds: number[], senderId: number) => void;
  noTyping: (receiverIds: number[], senderId: number) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface Typing {
  toId: string;
  roomId: string;
}

export interface SocketData {
  name: string;
  age: number;
}

export interface SocketUser {
  username: string;
  userId: number;
}

export type StoredSocketUser = SocketUser & { socketId: string };
