import { Router } from "express";
import { register, login, profile, updateProfile, verifyEmail, resendOtp } from "./auth.controller";
import { registerValidation } from "./auth.validation";
import { loginValidation } from "./login.validation";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/verify", verifyEmail);
router.post("/resend-otp", resendOtp);
router.get("/profile", protect, profile);
router.put("/profile", protect, updateProfile);

export default router;