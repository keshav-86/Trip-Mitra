import { Response } from "express";
import { validationResult } from "express-validator";
import { AuthRequest } from "../middleware/auth.middleware";
import { createTrip } from "./trip.service";

export const create = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const {
      title,
      destination,
      description,
      startDate,
      endDate,
      budget,
    } = req.body;

    const trip = await createTrip(
      title,
      destination,
      description,
      startDate,
      endDate,
      budget,
      req.user!.id
    );

    return res.status(201).json({
      success: true,
      message: "Trip created successfully",
      data: trip,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};