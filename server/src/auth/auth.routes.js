"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const login_validation_1 = require("./login.validation");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/register", auth_validation_1.registerValidation, auth_controller_1.register);
router.post("/login", login_validation_1.loginValidation, auth_controller_1.login);
router.post("/verify", auth_controller_1.verifyEmail);
router.post("/resend-otp", auth_controller_1.resendOtp);
router.get("/profile", auth_middleware_1.protect, auth_controller_1.profile);
router.put("/profile", auth_middleware_1.protect, auth_controller_1.updateProfile);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map