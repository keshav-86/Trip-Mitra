"use client";

import React, { useState, useEffect, startTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { tripService } from "@/services/trip.service";
import { Trip, User } from "@/types";
import TripOverview from "@/components/trips/TripOverview";
import TripExpenses from "@/components/trips/TripExpenses";
import TripMembers from "@/components/trips/TripMembers";
import TripSettlements from "@/components/trips/TripSettlements";
import AddExpenseModal from "@/components/trips/AddExpenseModal";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Calendar, MapPin, Plus, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function TripDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.id as string;

  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "expenses" | "members" | "settlements">("overview");
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const loadTripDetails = async () => {
    try {
      const res = await tripService.getTripById(tripId);
      if (res.success && res.data) {
        setTrip(res.data);
      } else {
        toast.error("Trip not found.");
        router.push("/trips");
      }
    } catch {
      toast.error("Failed to load trip details.");
      router.push("/trips");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTripDetails();
  }, [tripId]);

  if (loading) {
    return (
      <ProtectedLayout>
        <LoadingSpinner message="Consulting travel itinerary..." />
      </ProtectedLayout>
    );
  }

  if (!trip) return null;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  const tabs = [
    { id: "overview" as const, label: "Overview" },
    { id: "expenses" as const, label: "Expenses & Budget" },
    { id: "members" as const, label: "Companions" },
    { id: "settlements" as const, label: "Settlements" }
  ];

  return (
    <ProtectedLayout>
      <div className="space-y-6 relative min-h-[calc(100vh-140px)]">
        {/* Back Button & Title Header */}
        <div className="flex items-center gap-4 border-b border-border/80 pb-4">
          <Button variant="outline" size="sm" onClick={() => startTransition(() => router.push("/trips"))} className="h-9 w-9 p-0 rounded-lg shrink-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-extrabold text-foreground tracking-tight truncate">{trip.title}</h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground mt-0.5">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>{trip.destination}</span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 shrink-0" />
                <span>
                  {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Workspace Tab bar */}
        <div className="flex border-b border-border overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-xs md:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap -mb-[2px] ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab workspace Panel */}
        <div className="py-2">
          {activeTab === "overview" && <TripOverview trip={trip} />}
          {activeTab === "expenses" && (
            <TripExpenses
              tripId={trip._id}
              onAddExpenseClick={() => setExpenseModalOpen(true)}
              refreshTrigger={refreshTrigger}
            />
          )}
          {activeTab === "members" && <TripMembers trip={trip} />}
          {activeTab === "settlements" && (
            <TripSettlements
              tripId={trip._id}
              refreshTrigger={refreshTrigger}
              onSettleRefresh={() => setRefreshTrigger((prev) => !prev)}
            />
          )}
        </div>

        {/* Floating Add Expense Button */}
        <button
          onClick={() => setExpenseModalOpen(true)}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-secondary text-white shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer animate-float border border-white/10"
          title="Add Expense"
        >
          <Plus className="h-6 w-6" />
        </button>

        {/* Add Expense Modal Overlay */}
        {expenseModalOpen && (
          <AddExpenseModal
            tripId={trip._id}
            members={trip.members as User[]}
            onClose={() => setExpenseModalOpen(false)}
            onExpenseAdded={() => setRefreshTrigger((prev) => !prev)}
          />
        )}
      </div>
    </ProtectedLayout>
  );
}
