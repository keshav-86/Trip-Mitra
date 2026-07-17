"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { X, Loader2 } from "lucide-react";
import { expenseService } from "@/services/expense.service";
import { User } from "@/types";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";

interface AddExpenseModalProps {
  tripId: string;
  members: User[];
  onClose: () => void;
  onExpenseAdded: () => void;
}

interface ExpenseFormInputs {
  description: string;
  amount: number;
  category:
  | "FOOD"
  | "TRANSPORT"
  | "ACCOMMODATION"
  | "SHOPPING"
  | "ENTERTAINMENT"
  | "OTHER";
}

export default function AddExpenseModal({ tripId, members, onClose, onExpenseAdded }: AddExpenseModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ExpenseFormInputs>({
    defaultValues: {
      category: "FOOD",
    }
  });

  const onSubmit = async (data: ExpenseFormInputs) => {
    setSubmitting(true);
    try {
      const shareValue = Number(data.amount) / (members.length || 1);
      const splitBetween = members.map((m) => ({
        user: m._id,
        share: Number(shareValue.toFixed(2))
      }));

      const payload = {
        tripId,
        description: data.description,
        amount: Number(data.amount),
        category: data.category,
        participants: members.map((m) => m._id),
      };

      const res = await expenseService.createExpense(payload);
      if (res.success) {
        toast.success("Expense logged successfully!");
        onExpenseAdded();
        onClose();
      } else {
        toast.error(res.message || "Failed to log expense.");
      }
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to log expense.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-border/80 pb-3 mb-4">
          <h3 className="text-lg font-bold text-foreground">Add New Expense</h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Expense Title</label>
            <input
              type="text"
              placeholder="e.g. Dinner at Beach, Fuel, Stay"
              className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-300"
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && <span className="text-[10px] text-red-500 mt-1 block font-semibold">{errors.description.message}</span>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Amount (₹)</label>
              <input
                type="number"
                placeholder="₹ Amount"
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-300"
                {...register("amount", {
                  required: "Amount is required",
                  min: { value: 1, message: "Amount must be greater than 0" }
                })}
              />
              {errors.amount && <span className="text-[10px] text-red-500 mt-1 block font-semibold">{errors.amount.message}</span>}
            </div>
            <div>
              <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Category</label>
              <select
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-300"
                {...register("category", { required: "Category is required" })}
              >
                {["FOOD", "TRANSPORT", "ACCOMMODATION", "SHOPPING", "ENTERTAINMENT", "OTHER"].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          

          <div className="flex gap-3 justify-end border-t border-border/80 pt-4 mt-2">
            <Button type="button" variant="outline" size="md" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md" className="gap-1.5" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Logging...</span>
                </>
              ) : (
                <span>Add Expense</span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
