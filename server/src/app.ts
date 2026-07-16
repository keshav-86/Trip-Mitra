import express from "express";
import cors from "cors";

import authRoutes from "./auth";
import tripRoutes from "./trip";
import expenseRoutes from "./expense";

const app = express();

app.use(cors());
app.use(express.json());
import settlementRoutes from "./settlement";

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/settlements", settlementRoutes);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "TripMitra Backend Running 🚀",
  });
});

export default app;