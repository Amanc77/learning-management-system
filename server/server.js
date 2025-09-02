import dotenv from "dotenv";
import path from "path";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js";
import courseRoute from "./routes/course.routes.js";
import mediaRoute from "./routes/media.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

// Middleware setup
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/media", mediaRoute);

// Serve frontend build
const frontendPath = path.join(__dirname, "../client/dist");
app.use(express.static(frontendPath));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(frontendPath, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
