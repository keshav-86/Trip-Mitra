"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Settlement } from "@/types";
import { settlementService } from "@/services/settlement.service";
import SettlementCard from "./SettlementCard";
import EmptyState from "@/components/common/EmptyState";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Coins, CheckSquare } from "lucide-react";
import toast from "react-hot-toast";

interface TripSettlementsProps {
  tripId: string;
  refreshTrigger: boolean;
  onSettleRefresh: () => void;
}

export default function TripSettlements({
  tripId,
  refreshTrigger,
}: TripSettlementsProps) {
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSettlements = useCallback(async () => {
    setLoading(true);

    try {
      const res = await settlementService.getSettlements(tripId);

      if (res.success && res.data) {
        if (Array.isArray(res.data)) {
          setSettlements(res.data);
        } else if (res.data && Array.isArray(res.data.settlements)) {
          setSettlements(res.data.settlements);
        } else {
          setSettlements([]);
        }
      } else {
        setSettlements([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load settlements.");
      setSettlements([]);
    } finally {
      setLoading(false);
    }
  }, [tripId]);

  useEffect(() => {
    loadSettlements();
  }, [loadSettlements, refreshTrigger]);

  if (loading) {
    return (
      <LoadingSpinner message="Calculating settlement balances..." />
    );
  }

  const activeSettlements = Array.isArray(settlements)
    ? settlements.filter((settlement) => settlement.amount > 0)
    : [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-border/80 mb-2">
        <h4 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
          <Coins className="h-4 w-4 text-accent" />
          Debt Settlements
        </h4>
      </div>

      {activeSettlements.length === 0 ? (
        <EmptyState
          title="All Settled 🎉"
          description="Everyone has paid their fair share. No settlements are pending."
          icon={<CheckSquare className="h-8 w-8 text-secondary" />}
        />
      ) : (
        <div className="grid gap-3">
          {activeSettlements.map((settlement, index) => (
            <SettlementCard
              key={index}
              settlement={settlement}
            />
          ))}
        </div>
      )}
    </div>
  );
}