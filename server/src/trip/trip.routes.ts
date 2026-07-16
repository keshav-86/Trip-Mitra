import { Router } from "express";
import { create, getAll,getOne} from "./trip.controller";
import { createTripValidation } from "./trip.validation";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/", protect, createTripValidation, create);
router.get("/", protect, getAll);
router.get("/:id", protect, getOne);
export default router;