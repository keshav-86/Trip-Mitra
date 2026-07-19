import { Response } from "express";
import { validationResult } from "express-validator";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  createTrip,
  getMyTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  joinTrip,
  leaveTrip,

} from "./trip.service";

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
      travelers,
      itinerary,
      budgetBreakdown,
      packingList,
      localFoods,
      travelTips,
    } = req.body;

    const trip = await createTrip(
      title,
      destination,
      description,
      startDate,
      endDate,
      budget,
      req.user!.id,
      {
        travelers,
        itinerary,
        budgetBreakdown,
        packingList,
        localFoods,
        travelTips,
      }
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

export const getAll = async (req: AuthRequest, res: Response) => {
  try {
    const trips = await getMyTrips(req.user!.id);

    return res.status(200).json({
      success: true,
      count: trips.length,
      data: trips,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const getOne = async (req: AuthRequest, res: Response) => {
  try {
    const trip = await getTripById(
      req.params.id as string,
      req.user!.id
    );

    return res.status(200).json({
      success: true,
      data: trip,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Trip not found",
    });
  }
};
export const update = async (req: AuthRequest, res: Response) => {
  try {
    const trip = await updateTrip(
      req.params.id as string,
      req.user!.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Trip updated successfully",
      data: trip,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const remove = async (req: AuthRequest, res: Response) => {
  try {
    const result = await deleteTrip(
      req.params.id as string,
      req.user!.id
    );

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const join = async (req: AuthRequest, res: Response) => {
  try {
    const { inviteCode } = req.body;

    const trip = await joinTrip(
      inviteCode,
      req.user!.id
    );

    return res.status(200).json({
      success: true,
      message: "Joined trip successfully",
      data: trip,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong",
    });
  }
};
export const leave = async (req: AuthRequest, res: Response) => {
  try {
    const trip = await leaveTrip(
      req.params.id as string,
      req.user!.id
    );

    return res.status(200).json({
      success: true,
      message: "Left trip successfully",
      data: trip,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong",
    });
  }
};