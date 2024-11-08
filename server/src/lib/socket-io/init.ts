import { IncomingMessage, Server, ServerResponse } from "http";
import { Server as SocketIOServer } from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  SendMessage,
  ServerToClientEvents,
  SocketData,
  SocketUser,
  StoredSocketUser,
} from "./types";
import { newChat, newParticipants, saveMessage } from "@/services/chats";
import { nanoid } from "nanoid";

let users: StoredSocketUser[] = [];

const add = (data: StoredSocketUser): void => {
  const index = users.findIndex((user) => user.userId === data.userId);
  if (index >= 0) {
    users[index].socketId = data.socketId;
  } else {
    users.push(data);
  }
};

const findSocketId = (userId: string): string | undefined => {
  return users.find((user) => user.userId === userId)?.socketId;
};

const removeUser = (socketId: string): void => {
  const remainingUser = users.filter((user) => user.socketId !== socketId);
  users = remainingUser;
};

export const initSocket = (
  httpServer: Server<typeof IncomingMessage, typeof ServerResponse>
): void => {
  const io = new SocketIOServer<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer, {
    cors: {
      origin: process.env.CLIENT_ORIGIN,
    },
  });

  io.on("connection", (socket) => {
    socket.on("addUser", (data: SocketUser) => {
      add({ ...data, socketId: socket.id });
      console.log({ users });
    });
    socket.on("sendMessage", async (data: SendMessage) => {
      let newChatId = data.chatId;
      if (!newChatId) {
        newChatId = nanoid(15);
        await newChat({ id: newChatId });
        await newParticipants([
          {
            chatId: newChatId,
            userId: data.userId,
          },
          {
            chatId: newChatId,
            userId: data.toUserId,
          },
        ]);
      }
      const newMessage = await saveMessage({
        chatId: newChatId,
        content: data.text,
        userId: data.userId,
      });
      const toSocketId = findSocketId(data.toUserId);
      if (toSocketId) {
        io.to([toSocketId, socket.id]).emit("receiveMessage", newMessage);
      }
    });
    socket.on("typing", (data) => {
      const toSocketId = findSocketId(data.toId);
      if (toSocketId !== undefined) {
        io.to(toSocketId).emit("typingAlert", data);
      }
    });
    socket.on("disconnect", () => {
      removeUser(socket.id);
      console.log("disconnect");
      console.log({ users });
    });
  });
};
