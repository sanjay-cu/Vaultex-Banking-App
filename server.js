import path from "node:path";
import express from "express";
import { createServer } from "./server/index";

const app = createServer();
const PORT = process.env.PORT || 3000;

// Resolve directory
const __dirname = import.meta.dirname;
const distPath = path.join(__dirname, "spa");

// Serve static files (React build)
app.use(express.static(distPath));

// ✅ FIXED: wildcard route (Express v5 compatible)
app.get(/.*/, (req, res) => {
  // Skip API routes
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }

  res.sendFile(path.join(distPath, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
