import { Request, Response } from "express";
import { generateTripPlan } from "./ai.service";
import { TripPlanRequest } from "./ai.types";

export const createTripPlan = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = req.body as TripPlanRequest;

    const result = await generateTripPlan(data);

    res.status(200).json({
      success: true,
      message: "Trip plan generated successfully.",
      data: result,
    });
  } catch (error) {
    console.error("AI Error:", error);

    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};