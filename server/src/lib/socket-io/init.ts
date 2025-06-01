import { IncomingMessage, Server, ServerResponse } from "http";
import { Server as SocketIOServer } from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
  SocketUser,
  StoredSocketUser,
} from "./types";
import { formatDistanceToNowStrict } from "date-fns";
import ChatService from "@/services/ChatService";

let users: StoredSocketUser[] = [];

const add = (data: StoredSocketUser): void => {
  const index = users.findIndex((user) => user.userId === data.userId);
  if (index >= 0) {
    users[index].socketId = data.socketId;
  } else {
    users.push(data);
  }
};

const findSocketId = (userIds: number[]): string[] => {
  const result: string[] = [];
  for (const userId of userIds) {
    const user = users.find((u) => u.userId === userId);
    if (user) {
      result.push(user.socketId);
    }
  }
  return result;
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
    const chatService = new ChatService();

    socket.on("addUser", async (data: SocketUser) => {
      add({ ...data, socketId: socket.id });
      console.log({ users });
      const lastSeenRecord = await chatService.findLastSeenByUserId(
        data.userId
      );
      if (!lastSeenRecord) {
        await chatService.saveLastSeen(data.userId, new Date());
      } else {
        await chatService.updateLastSeen(lastSeenRecord.id, new Date());
      }
    });

    /**
     * To show user's last seen (like whatsapp)
     * if group chat show nothing
     * if not group chat, show lastSeen or empty string(user signup but doesn't user the app yet)
     */
    socket.on("setChat", async (receiverIds, senderId, isGroup) => {
      console.log({ receiverIds, senderId });
      const toSocketIds = findSocketId(receiverIds);
      const sender = findSocketId([senderId]);
      if (sender.length === 0) return;
      if (isGroup) return;

      if (toSocketIds.length > 0) {
        io.to(sender).emit("checkIsOlineOrLastSeen", "online");
      } else {
        const lastSeen = await chatService.findLastSeenByUserId(receiverIds[0]);
        const lastSeenAt = lastSeen
          ? formatDistanceToNowStrict(lastSeen.lastSeenAt, {
              addSuffix: true,
            })
          : "";
        io.to(sender).emit("checkIsOlineOrLastSeen", lastSeenAt);
      }
    });

    socket.on("sendMessage", async (receiverIds, message) => {
      const toSocketIds = findSocketId(receiverIds);
      if (toSocketIds.length > 0) {
        io.to(toSocketIds).emit("receiveMessage", message);
      }
    });

    socket.on("typing", (receiverIds) => {
      const toSocketIds = findSocketId(receiverIds);
      if (toSocketIds.length > 0) {
        io.to(toSocketIds).emit("typingAlert", true);
      }
    });

    socket.on("noTyping", (receiverIds) => {
      const toSocketIds = findSocketId(receiverIds);
      if (toSocketIds.length > 0) {
        io.to(toSocketIds).emit("typingAlert", false);
      }
    });

    socket.on("disconnect", async () => {
      const user = users.find((u) => u.socketId === socket.id);
      if (user) {
        await chatService.updateLastSeen(user.userId, new Date());
      }
      removeUser(socket.id);
      console.log("One user disconnect. After removing user", { users });
    });
  });
};
