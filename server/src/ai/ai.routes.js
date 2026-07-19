"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ai_controller_1 = require("./ai.controller");
const auth_middleware_1 = require("../middleware/auth.middleware"); // apne project ke hisaab se path verify kar lena
const router = (0, express_1.Router)();
router.get("/health", (_req, res) => {
    res.json({
        success: true,
        message: "AI Module Working 🚀",
    });
});
router.post("/trip-plan", auth_middleware_1.protect, ai_controller_1.createTripPlan);
exports.default = router;
//# sourceMappingURL=ai.routes.js.map