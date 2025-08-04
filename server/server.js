require("dotenv").config();

const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

const cors = require("cors");

cors({
  origin: process.env.CLINT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
});

app.use(express.json());

//database connection

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

app.get("/", (req, res) => {
  res.send("Welcome to the Learning Management System API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
