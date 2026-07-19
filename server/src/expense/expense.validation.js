"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExpenseValidation = void 0;
const express_validator_1 = require("express-validator");
exports.createExpenseValidation = [
    (0, express_validator_1.body)("tripId")
        .notEmpty()
        .withMessage("Trip ID is required"),
    (0, express_validator_1.body)("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required"),
    (0, express_validator_1.body)("amount")
        .isNumeric()
        .withMessage("Amount must be a number"),
    (0, express_validator_1.body)("category")
        .notEmpty()
        .withMessage("Category is required"),
    (0, express_validator_1.body)("participants")
        .isArray({ min: 1 })
        .withMessage("Participants are required"),
];
//# sourceMappingURL=expense.validation.js.map