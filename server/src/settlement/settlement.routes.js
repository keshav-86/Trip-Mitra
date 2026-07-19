"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const settlement_controller_1 = require("./settlement.controller");
const router = (0, express_1.Router)();
router.get("/:tripId", auth_middleware_1.protect, settlement_controller_1.getSettlement);
exports.default = router;
//# sourceMappingURL=settlement.routes.js.map