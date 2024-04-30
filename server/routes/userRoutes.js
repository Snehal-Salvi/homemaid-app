import express from "express";
import { forgotPassword, loginUser, logoutUser, registerUser, resetPassword, updateUserProfile } from "../controllers/userController.js";

const router = express.Router();

// Route to login user
router.route("/login").post(loginUser);

// Route to register user
router.route("/register").post(registerUser);

// Route to update user profile
router.route("/update").put(updateUserProfile);

// Route to logout user
router.route("/logout").get(logoutUser);

// Route to request password reset
router.route("/forgot-password").post(forgotPassword);

// Route to reset password using token
router.route("/reset-password/:resetToken").patch(resetPassword);

export default router;
