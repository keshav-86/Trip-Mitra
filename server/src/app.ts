import express from "express";
import cors from "cors";

import authRoutes from "./auth";
import tripRoutes from "./trip";
import expenseRoutes from "./expense";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || true,
    credentials: true,
    maxAge: 86400, // Cache OPTIONS preflight in browser for 24 hours
  })
);
app.use(express.json());
import settlementRoutes from "./settlement";
import aiRoutes from "./ai/ai.routes";

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/settlements", settlementRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "TripMitra Backend Running 🚀",
  });
});

export default app;