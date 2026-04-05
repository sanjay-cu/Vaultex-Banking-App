import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import transactionsRouter from "./routes/transactions";
import authRouter from "./routes/auth";
import { connectDB } from "./db";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.use("/api/transactions", transactionsRouter);
  app.use("/api/auth", authRouter);

  connectDB();

  return app;
}
