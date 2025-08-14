// Load environment variables
import dotenv from "dotenv";
dotenv.config();

// Imports
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import path from "path";

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Fix dirname for ES modules
const __dirname = path.resolve();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Database connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error(" Database connection failed:", err);
  });

app.use("/api/v1/user", userRoute);

// Serve frontend (React build)
app.use(express.static(path.join(__dirname, "client", "dist")));
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went  wrong");
});

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Learning Management System API");
});
// Start server
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
