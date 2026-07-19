import { Response } from "express";
import { validationResult } from "express-validator";
import { AuthRequest } from "../middleware/auth.middleware";

import {
  addExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpenseSummary,
  getRemainingBudget,
} from "./expense.service";

/**
 * Add Expense
 */
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
      tripId,
      description,
      amount,
      category,
      participants,
    } = req.body;

    const expense = await addExpense(
      tripId,
      req.user!.id,
      description,
      amount,
      category,
      participants
    );

    return res.status(201).json({
      success: true,
      message: "Expense added successfully",
      data: expense,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};

/**
 * Get Expenses of Trip
 */
export const getAll = async (req: AuthRequest, res: Response) => {
  try {
    const expenses = await getExpenses(req.params.tripId as string);

    return res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};

/**
 * Get Expense By Id
 */
export const getOne = async (req: AuthRequest, res: Response) => {
  try {
    const expense = await getExpenseById(req.params.expenseId as string);

    return res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Expense not found",
    });
  }
};

/**
 * Update Expense
 */
export const update = async (req: AuthRequest, res: Response) => {
  try {
    const expense = await updateExpense(
      req.params.expenseId as string,
      req.user!.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      data: expense,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};

/**
 * Delete Expense
 */
export const remove = async (req: AuthRequest, res: Response) => {
  try {
    const result = await deleteExpense(
      req.params.expenseId as string,
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
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};

/**
 * Expense Summary
 */
export const summary = async (req: AuthRequest, res: Response) => {
  try {
    const result = await getExpenseSummary(req.params.tripId as string);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};

/**
 * Remaining Budget
 */
export const getBudgetSummary = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const result = await getRemainingBudget(req.params.tripId as string);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};