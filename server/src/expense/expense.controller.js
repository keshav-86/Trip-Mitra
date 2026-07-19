"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBudgetSummary = exports.summary = exports.remove = exports.update = exports.getOne = exports.getAll = exports.create = void 0;
const express_validator_1 = require("express-validator");
const expense_service_1 = require("./expense.service");
/**
 * Add Expense
 */
const create = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }
        const { tripId, description, amount, category, participants, } = req.body;
        const expense = await (0, expense_service_1.addExpense)(tripId, req.user.id, description, amount, category, participants);
        return res.status(201).json({
            success: true,
            message: "Expense added successfully",
            data: expense,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Something went wrong",
        });
    }
};
exports.create = create;
/**
 * Get Expenses of Trip
 */
const getAll = async (req, res) => {
    try {
        const expenses = await (0, expense_service_1.getExpenses)(req.params.tripId);
        return res.status(200).json({
            success: true,
            count: expenses.length,
            data: expenses,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Something went wrong",
        });
    }
};
exports.getAll = getAll;
/**
 * Get Expense By Id
 */
const getOne = async (req, res) => {
    try {
        const expense = await (0, expense_service_1.getExpenseById)(req.params.expenseId);
        return res.status(200).json({
            success: true,
            data: expense,
        });
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Expense not found",
        });
    }
};
exports.getOne = getOne;
/**
 * Update Expense
 */
const update = async (req, res) => {
    try {
        const expense = await (0, expense_service_1.updateExpense)(req.params.expenseId, req.user.id, req.body);
        return res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            data: expense,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Something went wrong",
        });
    }
};
exports.update = update;
/**
 * Delete Expense
 */
const remove = async (req, res) => {
    try {
        const result = await (0, expense_service_1.deleteExpense)(req.params.expenseId, req.user.id);
        return res.status(200).json({
            success: true,
            message: result.message,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Something went wrong",
        });
    }
};
exports.remove = remove;
/**
 * Expense Summary
 */
const summary = async (req, res) => {
    try {
        const result = await (0, expense_service_1.getExpenseSummary)(req.params.tripId);
        return res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Something went wrong",
        });
    }
};
exports.summary = summary;
/**
 * Remaining Budget
 */
const getBudgetSummary = async (req, res) => {
    try {
        const result = await (0, expense_service_1.getRemainingBudget)(req.params.tripId);
        return res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Something went wrong",
        });
    }
};
exports.getBudgetSummary = getBudgetSummary;
//# sourceMappingURL=expense.controller.js.map