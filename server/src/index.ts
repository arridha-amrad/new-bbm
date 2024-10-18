import "dotenv/config";

import { createServer as serverInit } from "http";
import { createServer } from "@/app";
import { connectDb } from "@/lib/drizzle/db";
import { initSocket } from "@/lib/socket-io/init";

const port = 5000;

const startServer = async (): Promise<void> => {
  const app = createServer();
  const httpServer = serverInit(app);
  initSocket(httpServer);
  httpServer.listen(port);
  await connectDb();
};

startServer()
  .then(async () => {
    console.log(`🔥 Server running at: http://localhost:${port} 🔥`);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
