import path from "node:path";
import express from "express";
import { createServer } from "./index";

const app = createServer();
const PORT = process.env.PORT || 3000;

// Serve static frontend (React build)
const __dirname = import.meta.dirname;
const distPath = path.join(__dirname, "../spa");

app.use(express.static(distPath));

// Handle React routes (IMPORTANT FIX HERE)
app.get("/*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }

  res.sendFile(path.join(distPath, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
