"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTripValidation = void 0;
const express_validator_1 = require("express-validator");
exports.createTripValidation = [
    (0, express_validator_1.body)("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required"),
    (0, express_validator_1.body)("destination")
        .trim()
        .notEmpty()
        .withMessage("Destination is required"),
    (0, express_validator_1.body)("startDate")
        .isISO8601()
        .withMessage("Invalid start date"),
    (0, express_validator_1.body)("endDate")
        .isISO8601()
        .withMessage("Invalid end date"),
    (0, express_validator_1.body)("budget")
        .isNumeric()
        .withMessage("Budget must be a number"),
];
//# sourceMappingURL=trip.validation.js.map