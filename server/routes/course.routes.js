import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import {
  createCourse,
  editCourse,
  getCreatorCourses,
  getCourseById,
  deleteCourse,
  createLecture,
  getCourseLecture,
  updateLecture,
  removeLecture,
  getLectureById,
  togglePublicCourse,
  getPublishedCourse,
} from "../controllers/course.controllers.js";

const router = express.Router();

// Create course
router.post("/createCourse", isAuthenticated, createCourse);

// Get all creator courses
router.get("/getAllCourses", isAuthenticated, getCreatorCourses);
router.get("/publishedCourses", getPublishedCourse);

// Get course by ID
router.get("/getCourse/:courseId", isAuthenticated, getCourseById);

// Edit course
router.put(
  "/editCourse/:courseId",
  isAuthenticated,
  upload.single("courseThumbnail"),
  editCourse
);
router.delete("/deleteCourse/:courseId", isAuthenticated, deleteCourse);

router.post("/:courseId/createLecture", isAuthenticated, createLecture);

router.get("/:courseId/getCourseLecture", isAuthenticated, getCourseLecture);

router.put(
  "/:courseId/updateLecture/:lectureId",
  isAuthenticated,
  updateLecture
);

router.delete("/removeLecture/:lectureId", isAuthenticated, removeLecture);

router.get("/getLectureById/:lectureId", isAuthenticated, getLectureById);
router.put("/:courseId", isAuthenticated, togglePublicCourse);
export default router;
