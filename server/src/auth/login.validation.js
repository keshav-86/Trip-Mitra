"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = void 0;
const express_validator_1 = require("express-validator");
exports.loginValidation = [
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Invalid email"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("Password is required"),
];
//# sourceMappingURL=login.validation.js.map