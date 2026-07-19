"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSettlement = void 0;
const settlement_service_1 = require("./settlement.service");
const getSettlement = async (req, res) => {
    try {
        const result = await (0, settlement_service_1.getSettlementData)(req.params.tripId);
        return res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Something went wrong",
        });
    }
};
exports.getSettlement = getSettlement;
//# sourceMappingURL=settlement.controller.js.map