import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { getSettlementData } from "./settlement.service";

export const getSettlement = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const result = await getSettlementData(req.params.tripId as string);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong",
    });
  }
};