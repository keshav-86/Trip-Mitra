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

  // Creditors & Debtors
const creditors = balances
  .filter((b) => b.balance > 0)
  .map((b) => ({
    ...b,
    balance: Number(b.balance.toFixed(2)),
  }));

const debtors = balances
  .filter((b) => b.balance < 0)
  .map((b) => ({
    ...b,
    balance: Number(Math.abs(b.balance).toFixed(2)),
  }));

const settlements = [];

let i = 0;
let j = 0;

while (i < debtors.length && j < creditors.length) {
  const debtor = debtors[i];
  const creditor = creditors[j];

  const amount = Math.min(
    debtor.balance,
    creditor.balance
  );

  settlements.push({
    from: {
      userId: debtor.userId,
      fullName: debtor.fullName,
      email: debtor.email,
    },
    to: {
      userId: creditor.userId,
      fullName: creditor.fullName,
      email: creditor.email,
    },
    amount,
  });

  debtor.balance -= amount;
  creditor.balance -= amount;

  if (debtor.balance === 0) i++;
  if (creditor.balance === 0) j++;
}

  return {
    tripName: trip.title,
    totalExpense,
    expenseCount: expenses.length,
    memberCount,
    perPersonShare,
    balances,
    settlements,
  };
};
