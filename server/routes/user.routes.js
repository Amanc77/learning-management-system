import express from "express";
import {
  userRegister,
  userLogin,
  userLogOut,
  getUserProfile,
  updateProfile,
} from "../controllers/user.controllers.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/logout", userLogOut);
router.get("/profile", getUserProfile);

router.put(
  "/profile/update",
  isAuthenticated,
  upload.single("profilePhoto"),
  updateProfile
);

export default router;
