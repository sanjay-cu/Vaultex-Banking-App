import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
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

  // Database Connection Middleware
  app.use(async (_req, _res, next) => {
    try {
      await connectDB();
      next();
    } catch (error) {
      console.error('CRITICAL: Database connection middleware failure:', error);
      // In serverless, we might want to try to continue, but usually it's better to fail early
      next(error); 
    }
  });

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.use("/api/transactions", transactionsRouter);
  app.use("/api/auth", authRouter);

  // Fallback 404 for API
  app.use("/api", (_req, res) => {
    res.status(404).json({ error: "API endpoint not found" });
  });

  // Global Error Handler - MUST BE LAST
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error('GLOBAL SERVER ERROR CATCH:', err);
    
    // Ensure we always return JSON
    const status = err.status || err.statusCode || 500;
    res.status(status).json({
      error: 'Server process error',
      message: err.message || 'An unexpected error occurred during request processing',
      type: err.name,
      // Only include stack in development
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  });

  return app;
}
