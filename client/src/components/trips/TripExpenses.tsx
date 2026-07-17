"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Expense } from "@/types";
import { expenseService } from "@/services/expense.service";
import { useAuth } from "@/hooks/useAuth";
import ExpenseCard from "./ExpenseCard";
import EmptyState from "@/components/common/EmptyState";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import toast from "react-hot-toast";
import { CreditCard, Plus } from "lucide-react";
import Button from "@/components/ui/Button";

interface TripExpensesProps {
  tripId: string;
  onAddExpenseClick: () => void;
  refreshTrigger: boolean;
}

export default function TripExpenses({ tripId, onAddExpenseClick, refreshTrigger }: TripExpensesProps) {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const loadExpenses = useCallback(async () => {
    try {
      const res = await expenseService.getExpensesByTrip(tripId);
      if (res.success && res.data) {
        setExpenses(res.data);
      }
    } catch {
      toast.error("Failed to load expenses.");
    } finally {
      setLoading(false);
    }
  }, [tripId]);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses, refreshTrigger]);

  const handleDeleteExpense = async (id: string) => {
    if (!confirm("Are you sure you want to delete this expense?")) return;
    try {
      const res = await expenseService.deleteExpense(id);
      if (res.success) {
        toast.success("Expense deleted successfully.");
        loadExpenses();
      }
    } catch {
      toast.error("Failed to delete expense.");
    }
  };

  if (loading) {
    return <LoadingSpinner message="Fetching expense logs..." />;
  }

  const categories = [
    "All",
    "FOOD",
    "TRANSPORT",
    "ACCOMMODATION",
    "SHOPPING",
    "ENTERTAINMENT",
    "OTHER",
  ];
  const filteredExpenses = selectedCategory === "All"
    ? expenses
    : expenses.filter((e) => e.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-4">
      {/* Category filters */}
      {expenses.length > 0 && (
        <div className="flex flex-wrap gap-2 pb-2 border-b border-border/80">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-primary/10 border-primary/25 text-primary shadow-sm"
                  : "border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Expenses list */}
      {expenses.length === 0 ? (
        <EmptyState
          title="No Expenses Logged"
          description="Keep track of bills, food, transport costs, and more by logging your first expense."
          icon={<CreditCard className="h-8 w-8" />}
          actionLabel="Add Expense"
          onAction={onAddExpenseClick}
        />
      ) : filteredExpenses.length === 0 ? (
        <div className="text-center p-8 text-xs text-muted-foreground">
          No expenses logged in category: <strong>{selectedCategory}</strong>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filteredExpenses.map((expense) => (
            <ExpenseCard
              key={expense._id}
              expense={expense}
              onDelete={handleDeleteExpense}
              currentUserId={user?._id}
            />
          ))}
        </div>
      )}

      {/* Footer trigger (only when list is not empty) */}
      {expenses.length > 0 && (
        <div className="flex justify-end pt-2">
          <Button variant="primary" size="sm" onClick={onAddExpenseClick} className="gap-1.5 shadow-sm">
            <Plus className="h-4 w-4" />
            <span>Add Expense</span>
          </Button>
        </div>
      )}
    </div>
  );
}
