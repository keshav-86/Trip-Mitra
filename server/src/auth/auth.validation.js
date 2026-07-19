"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidation = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidation = [
    (0, express_validator_1.body)("fullName")
        .trim()
        .notEmpty()
        .withMessage("Full name is required"),
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Invalid email"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
];
//# sourceMappingURL=auth.validation.js.map