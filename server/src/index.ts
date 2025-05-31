import "dotenv/config";

import { createServer as serverInit } from "http";
import { createServer } from "@/app";
import { initSocket } from "@/lib/socket-io/init";
import { connectDb } from "./lib/prisma";

const port = 5000;

const startServer = async (): Promise<void> => {
  const app = createServer();
  const httpServer = serverInit(app);
  initSocket(httpServer);
  await connectDb();
  httpServer.listen(port);
};

startServer()
  .then(async () => {
    console.log(`🔥 Server running at: http://localhost:${port} 🔥`);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
