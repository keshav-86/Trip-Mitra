"use client";

import React, { useState, useEffect } from "react";
import { Trip, BudgetReport } from "@/types";
import { expenseService } from "@/services/expense.service";
import { Wallet, Copy, Check } from "lucide-react";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface TripOverviewProps {
  trip: Trip;
}

export default function TripOverview({ trip }: TripOverviewProps) {
  const [budgetReport, setBudgetReport] = useState<BudgetReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadReport() {
      try {
        const res = await expenseService.getBudgetReport(trip._id);
        if (res.success && res.data) {
          setBudgetReport(res.data);
        }
      } catch {
        // Quietly fail and let the UI show base trip budget info
      } finally {
        setLoading(false);
      }
    }
    loadReport();
  }, [trip._id]);

  const copyInviteCode = () => {
    if (!trip.inviteCode) return;
    navigator.clipboard.writeText(trip.inviteCode);
    setCopied(true);
    toast.success("Invite code copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return <LoadingSpinner message="Calculating budget balances..." />;
  }

  const totalSpent = budgetReport?.totalExpense || 0;
  const remaining = budgetReport?.remainingBudget ?? (trip.budget - totalSpent);
  const percentSpent = Math.min(Math.round((totalSpent / trip.budget) * 100), 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Description & Invitation */}
      <div className="md:col-span-7 flex flex-col gap-6">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-2">Trip Plan Details</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {trip.description || "No description provided. Add details about places you'd like to visit or key tasks."}
          </p>
        </div>

        {trip.inviteCode && (
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-1">Invite Companions</h4>
            <p className="text-xs text-muted-foreground mb-4">Share this code with your friends to let them join this trip.</p>
            <div className="flex items-center justify-between gap-3 bg-muted/65 p-3 rounded-xl border border-border">
              <span className="font-mono text-base font-extrabold tracking-widest text-primary">{trip.inviteCode}</span>
              <button
                onClick={copyInviteCode}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                title="Copy code"
              >
                {copied ? <Check className="h-4 w-4 text-secondary" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Budget Overview */}
      <div className="md:col-span-5 flex flex-col gap-6">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">Budget Status</h4>
            <Wallet className="h-5 w-5 text-primary" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-muted-foreground">Total Budget</span>
              <span className="text-foreground">₹{trip.budget.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-muted-foreground">Total Expenses Logged</span>
              <span className="text-foreground">₹{totalSpent.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-muted-foreground">Remaining Budget</span>
              <span className={remaining < 0 ? "text-red-500 font-bold" : "text-secondary font-bold"}>
                ₹{remaining.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="pt-2">
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden border border-border">
                <div
                  className={`h-full transition-all duration-500 ${percentSpent > 90 ? "bg-red-500" : percentSpent > 70 ? "bg-accent" : "bg-secondary"}`}
                  style={{ width: `${percentSpent}%` }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground font-semibold text-right block mt-1.5">
                {percentSpent}% Spent
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
