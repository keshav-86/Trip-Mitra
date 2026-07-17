import { Router } from "express";
import { create, getAll,getOne,update,remove,join} from "./trip.controller";
import { createTripValidation } from "./trip.validation";
import { protect } from "../middleware/auth.middleware";
import { leave } from "./trip.controller";

const router = Router();

router.post("/", protect, createTripValidation, create);
router.get("/", protect, getAll);
router.get("/:id", protect, getOne);
router.put("/:id", protect, update);
router.delete("/:id", protect, remove);
router.post("/join", protect, join);
router.post("/:id/leave", protect, leave);

export default router;