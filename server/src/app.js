"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./auth"));
const trip_1 = __importDefault(require("./trip"));
const expense_1 = __importDefault(require("./expense"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const settlement_1 = __importDefault(require("./settlement"));
const ai_routes_1 = __importDefault(require("./ai/ai.routes"));
app.use("/api/auth", auth_1.default);
app.use("/api/trips", trip_1.default);
app.use("/api/expenses", expense_1.default);
app.use("/api/settlements", settlement_1.default);
app.use("/api/ai", ai_routes_1.default);
app.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "TripMitra Backend Running 🚀",
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map