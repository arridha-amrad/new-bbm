import { messages, users } from "../drizzle/schema";

type User = typeof users.$inferSelect;
type Message = typeof messages.$inferSelect;

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  receiveMessage: (data: typeof messages.$inferSelect) => void;
  typingAlert: (data: Typing) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  addUser: (data: SocketUser) => void;
  sendMessage: (data: SendMessage) => void;
  typing: (data: Typing) => void;
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
  userId: string;
}

export interface SendMessage {
  userId: string;
  text: string;
  chatId: string | null;
  toUserId: string;
  sentAt: Date;
}

export type ReceiveMessage = Omit<SendMessage, "toId">;

export type Sender = Omit<User, "password" | "createdAt" | "updatedAt">;

export type StoredSocketUser = SocketUser & { socketId: string };
