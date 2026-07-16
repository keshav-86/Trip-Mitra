import { Router } from "express";
import { create, getAll} from "./trip.controller";
import { createTripValidation } from "./trip.validation";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/", protect, createTripValidation, create);
router.get("/", protect, getAll);
export default router;