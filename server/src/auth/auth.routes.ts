import { Router } from "express";
import { register } from "./auth.controller";
import { registerValidation } from "./auth.validation";

const router = Router();

router.post("/register", registerValidation, register);

export default router;