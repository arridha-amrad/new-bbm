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
import db from "../drizzle/db";
import { lastSeen } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { formatDistanceToNowStrict } from "date-fns";

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
    socket.on("addUser", async (data: SocketUser) => {
      add({ ...data, socketId: socket.id });
      console.log({ users });
      const [lastSeenData] = await db
        .select()
        .from(lastSeen)
        .where(eq(lastSeen.userId, data.userId));
      if (!lastSeenData) {
        await db.insert(lastSeen).values({ userId: data.userId });
      } else {
        await db
          .update(lastSeen)
          .set({ lastSeenAt: new Date().toISOString() })
          .where(eq(lastSeen.userId, data.userId));
      }
    });
    socket.on("setChat", async (receiverId, senderId) => {
      console.log({ receiverId, senderId });
      const toSocketId = findSocketId(receiverId);
      const sender = findSocketId(senderId);
      if (!sender) return;
      if (toSocketId) {
        io.to([sender]).emit("checkIsOlineOrLastSeen", "online");
      } else {
        const status = await db
          .select()
          .from(lastSeen)
          .where(eq(lastSeen.userId, receiverId));
        let date: string | null = null;

        if (status.length > 0) {
          console.log({ status });
          date = status[0].lastSeenAt;
        }
        const lastSeenAt = date
          ? formatDistanceToNowStrict(date, {
              addSuffix: true,
            })
          : "";
        io.to([sender]).emit("checkIsOlineOrLastSeen", lastSeenAt);
      }
    });
    socket.on("sendMessage", async (message, receiverId) => {
      const toSocketId = findSocketId(receiverId);
      if (toSocketId) {
        io.to([toSocketId]).emit("receiveMessage", message);
      }
    });
    socket.on("typing", (receiverId) => {
      const toSocketId = findSocketId(receiverId);
      if (toSocketId) {
        io.to([toSocketId]).emit("typingAlert", true);
      }
    });
    socket.on("noTyping", (receiverId) => {
      const toSocketId = findSocketId(receiverId);
      if (toSocketId) {
        io.to([toSocketId]).emit("typingAlert", false);
      }
    });
    socket.on("disconnect", async () => {
      const user = users.find((u) => u.socketId === socket.id);
      if (user) {
        await db
          .update(lastSeen)
          .set({
            lastSeenAt: new Date().toISOString(),
          })
          .where(eq(lastSeen.userId, user.userId));
      }
      removeUser(socket.id);
      console.log("disconnect");
      console.log({ users });
    });
  });
};
