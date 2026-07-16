import Trip from "../models/Trip";
import Expense from "../models/Expense";

export const getSettlementData = async (tripId: string) => {
  // Check trip
  const trip = await Trip.findById(tripId).populate(
    "members",
    "fullName email"
  );

  if (!trip) {
    throw new Error("Trip not found");
  }

  // Get all expenses
  const expenses = await Expense.find({ trip: tripId });

  // Total Expense
  const totalExpense = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // Members
  const memberCount = trip.members.length;

  // Per Person Share
  const perPersonShare =
    memberCount > 0 ? totalExpense / memberCount : 0;

  // Paid Amount Map
  const paidMap = new Map<string, number>();

  trip.members.forEach((member: any) => {
    paidMap.set(member._id.toString(), 0);
  });

  // Calculate Paid Amount
  expenses.forEach((expense) => {
    const userId = expense.paidBy.toString();

    paidMap.set(
      userId,
      (paidMap.get(userId) || 0) + expense.amount
    );
  });

  // Balance Sheet
  const balances = trip.members.map((member: any) => {
    const paid = paidMap.get(member._id.toString()) || 0;

    return {
      userId: member._id,
      fullName: member.fullName,
      email: member.email,
      paid,
      shouldPay: perPersonShare,
      balance: paid - perPersonShare,
    };
  });

  return {
    tripName: trip.title,
    totalExpense,
    expenseCount: expenses.length,
    memberCount,
    perPersonShare,
    balances,
  };
};