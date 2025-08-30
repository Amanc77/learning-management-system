import express from "express";
import { Course } from "../models/course.model.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { createCourse } from "../controllers/course.controllers.js";

const router = express.Router();

router.post("/", isAuthenticated, Course);
router.post("/createCourse", isAuthenticated, createCourse);

export default router;
