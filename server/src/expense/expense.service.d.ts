import { IExpense } from "../models/Expense";
/**
 * Add Expense
 */
export declare const addExpense: (tripId: string, paidBy: string, description: string, amount: number, category: IExpense["category"], participants: string[]) => Promise<import("mongoose").PopulateDocumentResult<import("mongoose").Document<unknown, {}, IExpense, {}, import("mongoose").DefaultSchemaOptions> & IExpense & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, {}, IExpense, IExpense>>;
/**
 * Get All Expenses of a Trip
 */
export declare const getExpenses: (tripId: string) => Promise<(import("mongoose").Document<unknown, {}, IExpense, {}, import("mongoose").DefaultSchemaOptions> & IExpense & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
})[]>;
/**
 * Get Expense By Id
 */
export declare const getExpenseById: (expenseId: string) => Promise<import("mongoose").Document<unknown, {}, IExpense, {}, import("mongoose").DefaultSchemaOptions> & IExpense & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
/**
 * Update Expense
 */
export declare const updateExpense: (expenseId: string, userId: string, data: {
    description?: string;
    amount?: number;
    category?: IExpense["category"];
    participants?: string[];
}) => Promise<import("mongoose").PopulateDocumentResult<import("mongoose").Document<unknown, {}, IExpense, {}, import("mongoose").DefaultSchemaOptions> & IExpense & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, {}, IExpense, IExpense>>;
/**
 * Delete Expense
 */
export declare const deleteExpense: (expenseId: string, userId: string) => Promise<{
    message: string;
}>;
/**
 * Expense Summary
 */
export declare const getExpenseSummary: (tripId: string) => Promise<{
    totalExpense: number;
    expenseCount: number;
}>;
export declare const getRemainingBudget: (tripId: string) => Promise<{
    budget: number;
    totalExpense: number;
    remainingBudget: number;
}>;
//# sourceMappingURL=expense.service.d.ts.map