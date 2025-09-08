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
  getPublicCourseById,
  searchCourse,
  getCoursePurchaseStatus,
} from "../controllers/course.controllers.js";

const router = express.Router();

router.post("/createCourse", isAuthenticated, createCourse);
router.get("/getAllCourses", isAuthenticated, getCreatorCourses);
router.get("/publishedCourses", getPublishedCourse);
router.get("/search", searchCourse);
router.get("/getCourse/:courseId", isAuthenticated, getCourseById);
router.get("/:courseId/status", isAuthenticated, getCoursePurchaseStatus);
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
router.get("/getPublicCourseById/:courseId", getPublicCourseById);

export default router;
