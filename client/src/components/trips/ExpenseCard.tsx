import React from "react";
import { CreditCard, ShoppingBag, Utensils, Plane, Hotel, Trash2, Calendar } from "lucide-react";
import { Expense, User } from "@/types";

interface ExpenseCardProps {
  expense: Expense;
  onDelete?: (id: string) => void;
  currentUserId?: string;
}

export default function ExpenseCard({ expense, onDelete, currentUserId }: ExpenseCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "food":
        return <Utensils className="h-4 w-4" />;
      case "transport":
      case "travel":
        return <Plane className="h-4 w-4" />;
      case "stay":
      case "hotel":
      case "accommodation":
        return <Hotel className="h-4 w-4" />;
      case "shopping":
        return <ShoppingBag className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "food":
        return "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20";
      case "transport":
      case "travel":
        return "bg-blue-500/10 text-blue-500 border border-blue-500/20";
      case "stay":
      case "hotel":
      case "accommodation":
        return "bg-purple-500/10 text-purple-500 border border-purple-500/20";
      case "shopping":
        return "bg-amber-500/10 text-amber-500 border border-amber-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border border-gray-500/20";
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short"
    });
  };

  const payerName = typeof expense.paidBy === "object" ? (expense.paidBy as User).fullName : "Someone";
  const payerId = typeof expense.paidBy === "object" ? (expense.paidBy as User)._id : expense.paidBy;

  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card/65 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${getCategoryColor(expense.category)}`}>
          {getCategoryIcon(expense.category)}
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-sm text-foreground">{expense.description}</span>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
            <span>
              Paid by <strong className="text-foreground/80">{payerName}</strong>
            </span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-muted-foreground/60" />
              <span>{formatDate(expense.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end">
          <span className="font-extrabold text-sm text-foreground">₹{expense.amount.toLocaleString("en-IN")}</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
            {expense.participants.length} Participants
          </span>
        </div>

        {onDelete && (currentUserId === payerId) && (
          <button
            onClick={() => onDelete(expense._id)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted/30 text-muted-foreground hover:text-red-500 hover:bg-red-500/5 transition-all duration-300 cursor-pointer"
            title="Delete expense"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
