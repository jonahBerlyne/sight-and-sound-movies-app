import express from "express";
import { validRegister } from "../middleware/validator";
import { activateAccount, forgotPassword, login, loginText, logout, refreshToken, registerUser, verifyText } from "../controllers/authController";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/register", validRegister, registerUser);
router.post("/activate", activateAccount);
router.post("/login", login);

router.get("/logout", auth, logout);
router.get("/refresh_token", refreshToken);

router.post("/login_text", loginText);
router.post("/verify_text", verifyText);
router.post("/forgot_password", forgotPassword);

export default router;