import express from "express";
import cors from "cors";

import authRoutes from "./auth";
import tripRoutes from "./trip";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "TripMitra Backend Running 🚀",
  });
});

export default app;