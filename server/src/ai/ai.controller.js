"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTripPlan = void 0;
const ai_service_1 = require("./ai.service");
const createTripPlan = async (req, res) => {
    try {
        const data = req.body;
        const result = await (0, ai_service_1.generateTripPlan)(data);
        res.status(200).json({
            success: true,
            message: "Trip plan generated successfully.",
            data: result,
        });
    }
    catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.createTripPlan = createTripPlan;
//# sourceMappingURL=ai.controller.js.map