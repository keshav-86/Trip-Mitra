import { Router } from "express";
import {
  create,
  getAll,
  getOne,
  update,
  remove,
  summary,
  getBudgetSummary,

} from "./expense.controller";
import { createExpenseValidation } from "./expense.validation";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/", protect, createExpenseValidation, create);

router.get("/:tripId", protect, getAll);

router.get("/details/:expenseId", protect, getOne);

router.put("/:expenseId", protect, update);

router.delete("/:expenseId", protect, remove);

router.get("/summary/:tripId", protect, summary);

router.get("/trip/:tripId/budget", protect, getBudgetSummary);

export default router;