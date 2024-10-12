import express, { Response, Request, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import UserRoutes from "@/routes/user";
import AuthRoutes from "@/routes/auth";
import ChatRoutes from "@/routes/chat";
import { CustomError, ValidationError } from "./utils/CustomError";

export const createServer = (): express.Express => {
  const app = express();
  app.use(cors({ credentials: true, origin: process.env.CLIENT_ORIGIN }));
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cookieParser());
  app.get("/api/test", (req, res) => {
    res.status(200).json({ message: "Hello World" });
  });
  app.use("/api/users", UserRoutes);
  app.use("/api/auth", AuthRoutes);
  app.use("/api/chats", ChatRoutes);
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ValidationError) {
      res.status(err.status).json(err.errors);
    }
    if (err instanceof CustomError) {
      res.status(err.status).json({ message: err.message });
    }
    console.error(err);
    res.status(500).send("Something broke!");
  });
  app.listen(5000);
  return app;
};
