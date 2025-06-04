import AuthRoutes from "@/routes/auth.routes";
import ChatRoutes from "@/routes/chat.routes";
import UserRoutes from "@/routes/user.routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { env } from "./env";

export const createServer = (): express.Express => {
  const app = express();
  app.use(cors({ credentials: true, origin: [env.CLIENT_ORIGIN, env.CLIENT_ORIGIN2] }));
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cookieParser());
  app.use("/api/users", UserRoutes);
  app.use("/api/auth", AuthRoutes);
  app.use("/api/chats", ChatRoutes);
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).send(err.message);
  });
  return app;
};
