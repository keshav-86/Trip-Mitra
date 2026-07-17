"use client";

import React, { useState, useEffect } from "react";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { useAuth } from "@/hooks/useAuth";
import { tripService } from "@/services/trip.service";
import { Trip } from "@/types";
import DashboardCard from "@/components/dashboard/DashboardCard";
import TripCard from "@/components/trips/TripCard";
import EmptyState from "@/components/common/EmptyState";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import CreateTripModal from "@/components/trips/CreateTripModal";
import { Briefcase, Calendar, Wallet, Compass, Plus, UserCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const { user } = useAuth();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const loadTrips = async () => {
    try {
      const res = await tripService.getTrips();
      if (res.success && res.data) {
        setTrips(res.data);
      }
    } catch {
      toast.error("Failed to load dashboard trips.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrips();
  }, []);

  if (loading) {
    return (
      <ProtectedLayout>
        <LoadingSpinner message="Opening your trip desk..." />
      </ProtectedLayout>
    );
  }

  // Calculate statistics
  const totalTrips = trips.length;
  const activeTrips = trips.filter((t) => {
    const now = new Date().getTime();
    const start = new Date(t.startDate).getTime();
    const end = new Date(t.endDate).getTime();
    return now >= start && now <= end;
  }).length;
  const totalBudget = trips.reduce((acc, t) => acc + t.budget, 0);

  const recentTrips = [...trips]
    .sort((a, b) => new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime())
    .slice(0, 2);

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-tr from-primary/10 via-secondary/5 to-transparent p-6 md:p-8 shadow-sm">
          <div className="absolute top-[20%] right-[10%] -z-10 h-32 w-32 rounded-full bg-secondary/10 blur-2xl animate-pulse-slow" />
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight leading-none mb-2">
            Namaste, <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{user?.name}</span>!
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg leading-relaxed">
            Welcome back to your travel dashboard. Plan smart budgets, split bills, and discover gems for your upcoming ventures.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DashboardCard
            title="Total Trips Created"
            value={totalTrips}
            icon={<Briefcase className="h-5 w-5" />}
            variant="primary"
            description="All active, upcoming & completed trips"
          />
          <DashboardCard
            title="Active Travels"
            value={activeTrips}
            icon={<Calendar className="h-5 w-5" />}
            variant="secondary"
            description="Trips currently in progress today"
          />
          <DashboardCard
            title="Total Managed Budget"
            value={`₹${totalBudget.toLocaleString("en-IN")}`}
            icon={<Wallet className="h-5 w-5" />}
            variant="accent"
            description="Combined budget size of your travels"
          />
        </div>

        {/* Dashboard Workstation split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Recent Trips */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between border-b border-border/80 pb-2">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Recent Travels</h3>
              {totalTrips > 0 && (
                <Button variant="ghost" size="sm" href="/trips" className="text-primary font-bold">
                  View All Trips
                </Button>
              )}
            </div>

            {totalTrips === 0 ? (
              <EmptyState
                title="No Trips Logged Yet"
                description="Your travel dashboard is currently blank. Plan your first tour now to start balancing bills."
                icon={<Compass className="h-8 w-8" />}
                actionLabel="Create Trip"
                onAction={() => setCreateModalOpen(true)}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentTrips.map((trip) => (
                  <TripCard key={trip._id} trip={trip} />
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions Panel */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider border-b border-border/80 pb-2">
              Quick Tasks
            </h3>
            <div className="flex flex-col gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => setCreateModalOpen(true)}
                className="w-full justify-start gap-3 rounded-2xl py-3"
              >
                <Plus className="h-4 w-4 shrink-0" />
                <span>Create New Trip</span>
              </Button>
              <Button
                variant="outline"
                size="md"
                href="/profile"
                className="w-full justify-start gap-3 rounded-2xl py-3"
              >
                <UserCircle2 className="h-4 w-4 shrink-0" />
                <span>Manage Profile Settings</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Modal overlays */}
        {createModalOpen && (
          <CreateTripModal onClose={() => setCreateModalOpen(false)} onTripCreated={loadTrips} />
        )}
      </div>
    </ProtectedLayout>
  );
}
