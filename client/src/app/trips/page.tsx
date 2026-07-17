"use client";

import React, { useState, useEffect } from "react";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { tripService } from "@/services/trip.service";
import { Trip } from "@/types";
import TripCard from "@/components/trips/TripCard";
import EmptyState from "@/components/common/EmptyState";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import CreateTripModal from "@/components/trips/CreateTripModal";
import { Compass, Search, Plus, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [joining, setJoining] = useState(false);

  const loadTrips = async () => {
    try {
      const res = await tripService.getTrips();

      if (res.success && res.data) {
        setTrips(res.data);
      }
    } catch {
      toast.error("Failed to load trips.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrips();
  }, []);

  const handleJoinTrip = async () => {
    const inviteCode = prompt(
      "Enter the 6-character Invite Code of the trip you want to join:"
    );

    if (!inviteCode) return;

    setJoining(true);

    try {
      const res = await tripService.joinTrip({ inviteCode });

      if (res.success) {
        toast.success("Successfully joined the trip!");
        loadTrips();
      } else {
        toast.error(res.message || "Failed to join trip.");
      }
    } catch {
      toast.error("Failed to join trip.");
    } finally {
      setJoining(false);
    }
  };

  const handleDeleteTrip = async (id: string) => {
    try {
      const res = await tripService.deleteTrip(id);

      if (res.success) {
        toast.success("Trip deleted successfully!");
        loadTrips();
      } else {
        toast.error(res.message || "Failed to delete trip.");
      }
    } catch {
      toast.error("Failed to delete trip.");
    }
  };

  if (loading) {
    return (
      <ProtectedLayout>
        <LoadingSpinner message="Gathering your travel logs..." />
      </ProtectedLayout>
    );
  }

  const getStatus = (trip: Trip) => {
    const now = Date.now();
    const start = new Date(trip.startDate).getTime();
    const end = new Date(trip.endDate).getTime();

    if (now < start) return "Upcoming";
    if (now > end) return "Completed";
    return "Active";
  };

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || getStatus(trip) === statusFilter;

    return matchesSearch && matchesStatus;
  });
  return (
    <ProtectedLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
          <div>
            <h1 className="text-xl font-extrabold text-foreground tracking-tight">
              Trip Workspace Directory
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Manage and plan all your travel details and bill splits
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleJoinTrip}
              disabled={joining}
              className="font-bold"
            >
              {joining ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Join by Code"
              )}
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => setCreateModalOpen(true)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Trip
            </Button>
          </div>
        </div>

        {/* Search */}
        {trips.length > 0 && (
          <div className="flex flex-col md:flex-row gap-4 items-center bg-card border border-border rounded-xl p-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <input
                type="text"
                placeholder="Search by title or destination..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto">
              {["All", "Active", "Upcoming", "Completed"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-2 rounded-lg border text-sm ${statusFilter === status
                      ? "bg-primary text-white"
                      : "bg-card"
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Trips */}
        {trips.length === 0 ? (
          <EmptyState
            title="No Trips Found"
            description="Create your first trip or join one using an invite code."
            icon={<Compass className="h-8 w-8 text-primary" />}
            actionLabel="Create Trip"
            onAction={() => setCreateModalOpen(true)}
          />
        ) : filteredTrips.length === 0 ? (
          <div className="text-center p-10 text-muted-foreground">
            No trips found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip) => (
              <TripCard
                key={trip._id}
                trip={trip}
                onDelete={handleDeleteTrip}
              />
            ))}
          </div>
        )}

        {createModalOpen && (
          <CreateTripModal
            onClose={() => setCreateModalOpen(false)}
            onTripCreated={loadTrips}
          />
        )}
      </div>
    </ProtectedLayout>
  );
}