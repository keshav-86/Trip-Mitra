import { Router } from "express";
import { register, login, profile } from "./auth.controller";
import { registerValidation } from "./auth.validation";
import { loginValidation } from "./login.validation";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.get("/profile", protect, profile);

export default router;