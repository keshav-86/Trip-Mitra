import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
/**
 * Add Expense
 */
export declare const create: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Get Expenses of Trip
 */
export declare const getAll: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Get Expense By Id
 */
export declare const getOne: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Update Expense
 */
export declare const update: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Delete Expense
 */
export declare const remove: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Expense Summary
 */
export declare const summary: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Remaining Budget
 */
export declare const getBudgetSummary: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=expense.controller.d.ts.map