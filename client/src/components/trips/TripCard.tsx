"use client";

import React from "react";
import { Calendar, MapPin, Users, Wallet, ArrowRight, Copy, Trash2 } from "lucide-react";
import { Trip } from "@/types";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

interface TripCardProps {
  trip: Trip;
  onDelete?: (id: string) => void;
}

export default function TripCard({ trip, onDelete }: TripCardProps) {
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "2-digit",
    });
  };

  const getTripStatus = () => {
    const now = new Date().getTime();
    const start = new Date(trip.startDate).getTime();
    const end = new Date(trip.endDate).getTime();

    if (now < start) return { label: "Upcoming", variant: "primary" as const };
    if (now > end) return { label: "Completed", variant: "outline" as const };
    return { label: "Active", variant: "secondary" as const };
  };

  const status = getTripStatus();

  const copyInviteCode = async () => {
    try {
      await navigator.clipboard.writeText(trip.inviteCode);
      toast.success("Invite code copied!");
    } catch {
      toast.error("Failed to copy invite code");
    }
  };

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-card-border bg-card/65 backdrop-blur-md p-5 shadow-sm hover:shadow-lg transition-all duration-300">
      <div>
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-1 text-muted-foreground text-xs font-semibold uppercase tracking-wider">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span>{trip.destination}</span>
          </div>

          <Badge variant={status.variant}>{status.label}</Badge>
        </div>

        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-1">
          {trip.title}
        </h3>

        {trip.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
            {trip.description}
          </p>
        )}

        <div className="grid grid-cols-2 gap-3 mb-5 border-t border-border/60 pt-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-4 w-4 text-muted-foreground/60" />
            <span>
              {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="h-4 w-4 text-muted-foreground/60" />
            <span>
              {trip.members?.length || 1}{" "}
              {(trip.members?.length || 1) === 1 ? "Member" : "Members"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground col-span-2">
            <Wallet className="h-4 w-4 text-muted-foreground/60" />
            <span className="font-semibold text-foreground">
              Budget: ₹{trip.budget.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Invite Code */}
        <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 p-3 mb-4">
          <div>
            <p className="text-[10px] uppercase text-muted-foreground font-semibold">
              Invite Code
            </p>
            <p className="font-mono font-bold tracking-widest text-primary">
              {trip.inviteCode}
            </p>
          </div>

          <button
            onClick={copyInviteCode}
            className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-muted transition"
          >
            <Copy className="h-3.5 w-3.5" />
            Copy
          </button>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          if (
            confirm(
              `Are you sure you want to delete "${trip.title}"?`
            )
          ) {
            onDelete?.(trip._id);
          }
        }}
        className="w-full mb-2 flex items-center justify-center gap-2 text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
      >
        <Trash2 className="h-4 w-4" />
        Delete Trip
      </Button>

      <Button
        variant="outline"
        size="sm"
        href={`/trips/${trip._id}`}
        className="w-full flex items-center justify-center gap-1.5 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
      >
        <span>View Details</span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </Button>
    </div>
  );
}