import express from "express";
import {
  userLogin,
  userLogOut,
  userRegister,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/logout").get(userLogOut);

export default router;
