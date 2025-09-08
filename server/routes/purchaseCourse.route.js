import express from "express";

import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  createCheckoutSession,
  getAllPurchasedCourse,
  getCourseDetailWithPurchaseStatus,
  getCoursePurchaseStatus,
  verifyPayment,
} from "../controllers/purchasedCourse.controllers.js";

const router = express.Router();

router.post("/create-checkout-session", isAuthenticated, createCheckoutSession);
router.post("/verify-payment", isAuthenticated, verifyPayment);
router.get(
  "/course/:courseId/details-with-status",
  isAuthenticated,
  getCourseDetailWithPurchaseStatus
);
router.get("/purchased", isAuthenticated, getAllPurchasedCourse);
router.get(
  "/course/:courseId/status",
  isAuthenticated,
  getCoursePurchaseStatus
);

export default router;
