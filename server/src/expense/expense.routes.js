"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expense_controller_1 = require("./expense.controller");
const expense_validation_1 = require("./expense.validation");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.protect, expense_validation_1.createExpenseValidation, expense_controller_1.create);
router.get("/:tripId", auth_middleware_1.protect, expense_controller_1.getAll);
router.get("/details/:expenseId", auth_middleware_1.protect, expense_controller_1.getOne);
router.put("/:expenseId", auth_middleware_1.protect, expense_controller_1.update);
router.delete("/:expenseId", auth_middleware_1.protect, expense_controller_1.remove);
router.get("/summary/:tripId", auth_middleware_1.protect, expense_controller_1.summary);
router.get("/trip/:tripId/budget", auth_middleware_1.protect, expense_controller_1.getBudgetSummary);
exports.default = router;
//# sourceMappingURL=expense.routes.js.map