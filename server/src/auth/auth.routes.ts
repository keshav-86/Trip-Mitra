import { Router } from "express";
import { register, login } from "./auth.controller";
import { registerValidation } from "./auth.validation";
import { loginValidation } from "./login.validation";

const router = Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

export default router;