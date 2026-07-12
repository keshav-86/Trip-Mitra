import { Router } from "express";
import { create } from "./trip.controller";
import { createTripValidation } from "./trip.validation";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/", protect, createTripValidation, create);

export default router;