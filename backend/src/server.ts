import app from "./app.js";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import mongoose from "mongoose";

const startServer = async () => {
  await connectDB();

  const server = app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });

  let isShuttingDown = false;

  const shutdown = (signal: string) => {
    if (isShuttingDown) return;
    isShuttingDown = true;
    console.log(`${signal} received. Shutting down server...`);

    server.close(async () => {
      await mongoose.connection.close();
      console.log("HTTP server and MongoDB connection closed");
      process.exit(0);
    });

    setTimeout(() => process.exit(1), 10_000).unref();
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));

  process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    shutdown("uncaughtException");
  });

  process.on("unhandledRejection", (error) => {
    console.error("Unhandled Rejection:", error);
    shutdown("unhandledRejection");
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
