import { Router } from "express";
import { createTripPlan } from "./ai.controller";
import { protect } from "../middleware/auth.middleware"; // apne project ke hisaab se path verify kar lena

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "AI Module Working 🚀",
  });
});

router.post("/trip-plan", protect, createTripPlan);

export default router;