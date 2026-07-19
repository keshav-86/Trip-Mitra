"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRemainingBudget = exports.getExpenseSummary = exports.deleteExpense = exports.updateExpense = exports.getExpenseById = exports.getExpenses = exports.addExpense = void 0;
const Expense_1 = __importDefault(require("../models/Expense"));
const Trip_1 = __importDefault(require("../models/Trip"));
/**
 * Add Expense
 */
const addExpense = async (tripId, paidBy, description, amount, category, participants) => {
    const trip = await Trip_1.default.findById(tripId);
    if (!trip) {
        throw new Error("Trip not found");
    }
    // User must be a member of the trip
    const isMember = trip.members.some((member) => member.toString() === paidBy);
    if (!isMember) {
        throw new Error("Only trip members can add expenses");
    }
    const expense = await Expense_1.default.create({
        trip: tripId,
        paidBy,
        description,
        amount,
        category,
        participants,
    });
    return await expense.populate([
        { path: "paidBy", select: "fullName email" },
        { path: "participants", select: "fullName email" }
    ]);
};
exports.addExpense = addExpense;
/**
 * Get All Expenses of a Trip
 */
const getExpenses = async (tripId) => {
    return await Expense_1.default.find({
        trip: tripId,
    })
        .populate("paidBy", "fullName email")
        .populate("participants", "fullName email")
        .sort({ createdAt: -1 });
};
exports.getExpenses = getExpenses;
/**
 * Get Expense By Id
 */
const getExpenseById = async (expenseId) => {
    const expense = await Expense_1.default.findById(expenseId)
        .populate("paidBy", "fullName email")
        .populate("participants", "fullName email");
    if (!expense) {
        throw new Error("Expense not found");
    }
    return expense;
};
exports.getExpenseById = getExpenseById;
/**
 * Update Expense
 */
const updateExpense = async (expenseId, userId, data) => {
    const expense = await Expense_1.default.findById(expenseId);
    if (!expense) {
        throw new Error("Expense not found");
    }
    if (expense.paidBy.toString() !== userId) {
        throw new Error("You are not authorized to update this expense");
    }
    Object.assign(expense, data);
    await expense.save();
    return await expense.populate([
        { path: "paidBy", select: "fullName email" },
        { path: "participants", select: "fullName email" }
    ]);
};
exports.updateExpense = updateExpense;
/**
 * Delete Expense
 */
const deleteExpense = async (expenseId, userId) => {
    const expense = await Expense_1.default.findById(expenseId);
    if (!expense) {
        throw new Error("Expense not found");
    }
    if (expense.paidBy.toString() !== userId) {
        throw new Error("You are not authorized to delete this expense");
    }
    await Expense_1.default.findByIdAndDelete(expenseId);
    return {
        message: "Expense deleted successfully",
    };
};
exports.deleteExpense = deleteExpense;
/**
 * Expense Summary
 */
const getExpenseSummary = async (tripId) => {
    const expenses = await Expense_1.default.find({
        trip: tripId,
    });
    const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    return {
        totalExpense,
        expenseCount: expenses.length,
    };
};
exports.getExpenseSummary = getExpenseSummary;
const getRemainingBudget = async (tripId) => {
    const trip = await Trip_1.default.findById(tripId);
    if (!trip) {
        throw new Error("Trip not found");
    }
    const expenses = await Expense_1.default.find({
        trip: tripId,
    });
    const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const remainingBudget = trip.budget - totalExpense;
    return {
        budget: trip.budget,
        totalExpense,
        remainingBudget,
    };
};
exports.getRemainingBudget = getRemainingBudget;
//# sourceMappingURL=expense.service.js.map