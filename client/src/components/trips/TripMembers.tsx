"use client";

import React, { useState } from "react";
import { Trip, User } from "@/types";
import { tripService } from "@/services/trip.service";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import MemberCard from "./MemberCard";
import { Users, LogOut, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";

interface TripMembersProps {
  trip: Trip;
}

export default function TripMembers({ trip }: TripMembersProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [leaving, setLeaving] = useState(false);

  const handleLeaveTrip = async () => {
    if (!confirm("Are you sure you want to leave this trip? You will need an invite code to join back.")) return;
    setLeaving(true);
    try {
      const res = await tripService.leaveTrip(trip._id);
      if (res.success) {
        toast.success("You have left the trip.");
        router.push("/trips");
      } else {
        toast.error(res.message || "Failed to leave trip.");
      }
    } catch {
      toast.error("Failed to leave trip.");
    } finally {
      setLeaving(false);
    }
  };

  const creatorId = typeof trip.createdBy === "object" ? (trip.createdBy as User)._id : trip.createdBy;
  const isCurrentUserCreator = user?._id === creatorId;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
          <Users className="h-4 w-4 text-primary" />
          <span>Companions ({trip.members.length})</span>
        </h4>
        
        {!isCurrentUserCreator && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleLeaveTrip}
            disabled={leaving}
            className="text-red-500 border-red-500/20 hover:bg-red-500/5 hover:border-red-500/30 gap-1.5 font-bold"
          >
            {leaving ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <LogOut className="h-3.5 w-3.5" />
            )}
            <span>Leave Trip</span>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {trip.members.map((m) => {
          const mUser = m as User;
          const isHost = mUser._id === creatorId;
          return <MemberCard key={mUser._id} member={mUser} isCreator={isHost} />;
        })}
      </div>
    </div>
  );
}
