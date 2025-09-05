import express, { application } from "express";
import {
  createCheckoutSession,
  stripeWebhook,
} from "../controllers/purchasedCourse.controllers.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post(
  "/checkout/create-checkout-session",
  isAuthenticated,
  createCheckoutSession
);

router.post(
  "/webhook",
  express.raw({ type: "application / json" }),
  stripeWebhook
);

router.get("/course/:courseId/details-with-status");

export default router;
