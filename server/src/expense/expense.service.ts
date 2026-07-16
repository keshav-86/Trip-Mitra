import Expense from "../models/Expense";
import Trip from "../models/Trip";

/**
 * Add Expense
 */
export const addExpense = async (
  tripId: string,
  paidBy: string,
  description: string,
  amount: number,
  category: string,
  participants: string[]
) => {
  const trip = await Trip.findById(tripId);

  if (!trip) {
    throw new Error("Trip not found");
  }

  // User must be a member of the trip
  const isMember = trip.members.some(
    (member) => member.toString() === paidBy
  );

  if (!isMember) {
    throw new Error("Only trip members can add expenses");
  }

  const expense = await Expense.create({
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

/**
 * Get All Expenses of a Trip
 */
export const getExpenses = async (tripId: string) => {
  return await Expense.find({
    trip: tripId,
  })
    .populate("paidBy", "fullName email")
    .populate("participants", "fullName email")
    .sort({ createdAt: -1 });
};

/**
 * Get Expense By Id
 */
export const getExpenseById = async (expenseId: string) => {
  const expense = await Expense.findById(expenseId)
    .populate("paidBy", "fullName email")
    .populate("participants", "fullName email");

  if (!expense) {
    throw new Error("Expense not found");
  }

  return expense;
};

/**
 * Update Expense
 */
export const updateExpense = async (
  expenseId: string,
  userId: string,
  data: {
    description?: string;
    amount?: number;
    category?: string;
    participants?: string[];
  }
) => {
  const expense = await Expense.findById(expenseId);

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

/**
 * Delete Expense
 */
export const deleteExpense = async (
  expenseId: string,
  userId: string
) => {
  const expense = await Expense.findById(expenseId);

  if (!expense) {
    throw new Error("Expense not found");
  }

  if (expense.paidBy.toString() !== userId) {
    throw new Error("You are not authorized to delete this expense");
  }

  await Expense.findByIdAndDelete(expenseId);

  return {
    message: "Expense deleted successfully",
  };
};

/**
 * Expense Summary
 */
export const getExpenseSummary = async (tripId: string) => {
  const expenses = await Expense.find({
    trip: tripId,
  });

  const totalExpense = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return {
    totalExpense,
    expenseCount: expenses.length,
  };
};