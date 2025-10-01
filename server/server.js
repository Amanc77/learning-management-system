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
import coursePurchaseRoute from "./routes/purchaseCourse.route.js";
import { razorpayWebhook } from "./controllers/purchasedCourse.controllers.js";
import courseProgressRoute from "./routes/courseProgress.routes.js";
dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.post(
  "/api/v1/purchase/webhook",
  express.raw({ type: "application/json" }),
  razorpayWebhook
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/purchase", coursePurchaseRoute);

app.use("/api/v1/progress", courseProgressRoute);

// Serve frontend build
const frontendPath = path.join(__dirname, "../client/dist");
app.use(express.static(frontendPath));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(frontendPath, "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`Global error: ${err.message}`, { stack: err.stack });
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
