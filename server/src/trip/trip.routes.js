"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trip_controller_1 = require("./trip.controller");
const trip_validation_1 = require("./trip.validation");
const auth_middleware_1 = require("../middleware/auth.middleware");
const trip_controller_2 = require("./trip.controller");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.protect, trip_validation_1.createTripValidation, trip_controller_1.create);
router.get("/", auth_middleware_1.protect, trip_controller_1.getAll);
router.get("/:id", auth_middleware_1.protect, trip_controller_1.getOne);
router.put("/:id", auth_middleware_1.protect, trip_controller_1.update);
router.delete("/:id", auth_middleware_1.protect, trip_controller_1.remove);
router.post("/join", auth_middleware_1.protect, trip_controller_1.join);
router.post("/:id/leave", auth_middleware_1.protect, trip_controller_2.leave);
exports.default = router;
//# sourceMappingURL=trip.routes.js.map