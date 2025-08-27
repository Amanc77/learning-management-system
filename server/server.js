import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();

// CORS setup - very important for cookies to work cross-origin
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5174",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());
connectDB();

// Routes
app.use("/api/v1/user", userRoute);

// Serve frontend production if needed
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "Client", "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Client", "dist", "index.html"));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
