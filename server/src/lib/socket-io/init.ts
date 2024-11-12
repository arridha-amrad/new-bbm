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
    socket.on("sendMessage", async (message, receiverId) => {
      const toSocketId = findSocketId(receiverId);
      if (toSocketId) {
        io.to([toSocketId, socket.id]).emit("receiveMessage", message);
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
