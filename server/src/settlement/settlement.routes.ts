import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import { getSettlement } from "./settlement.controller";

const router = Router();

router.get("/:tripId", protect, getSettlement);

export default router;