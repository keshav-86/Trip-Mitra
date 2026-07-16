import { Router } from "express";
import { create, getAll,getOne,update,remove,join} from "./trip.controller";
import { createTripValidation } from "./trip.validation";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/", protect, createTripValidation, create);
router.get("/", protect, getAll);
router.get("/:id", protect, getOne);
router.put("/:id", protect, update);
router.delete("/:id", protect, remove);
router.post("/:id/join", protect, join);

export default router;