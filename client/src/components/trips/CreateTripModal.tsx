"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { X, Loader2 } from "lucide-react";
import { tripService, CreateTripPayload } from "@/services/trip.service";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";

interface CreateTripModalProps {
  onClose: () => void;
  onTripCreated: () => void;
}

export default function CreateTripModal({ onClose, onTripCreated }: CreateTripModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateTripPayload>();

  const onSubmit = async (data: CreateTripPayload) => {
    setSubmitting(true);
    try {
      const res = await tripService.createTrip({
        ...data,
        budget: Number(data.budget)
      });
      if (res.success) {
        toast.success("Trip created successfully!");
        onTripCreated();
        onClose();
      } else {
        toast.error(res.message || "Failed to create trip.");
      }
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to create trip.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-border/80 pb-3 mb-4">
          <h3 className="text-lg font-bold text-foreground">Create New Trip</h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Trip Title</label>
            <input
              type="text"
              placeholder="e.g. Goa Vacation, Himalayan Trek"
              className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-300"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <span className="text-[10px] text-red-500 mt-1 block font-semibold">{errors.title.message}</span>}
          </div>

          <div>
            <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Destination</label>
            <input
              type="text"
              placeholder="e.g. Goa, Manali, Kerala"
              className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-300"
              {...register("destination", { required: "Destination is required" })}
            />
            {errors.destination && <span className="text-[10px] text-red-500 mt-1 block font-semibold">{errors.destination.message}</span>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Start Date</label>
              <input
                type="date"
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-300"
                {...register("startDate", { required: "Start date is required" })}
              />
              {errors.startDate && <span className="text-[10px] text-red-500 mt-1 block font-semibold">{errors.startDate.message}</span>}
            </div>
            <div>
              <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">End Date</label>
              <input
                type="date"
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-300"
                {...register("endDate", { required: "End date is required" })}
              />
              {errors.endDate && <span className="text-[10px] text-red-500 mt-1 block font-semibold">{errors.endDate.message}</span>}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Total Budget (₹)</label>
            <input
              type="number"
              placeholder="e.g. 50000"
              className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-300"
              {...register("budget", {
                required: "Budget is required",
                min: { value: 0, message: "Budget cannot be negative" }
              })}
            />
            {errors.budget && <span className="text-[10px] text-red-500 mt-1 block font-semibold">{errors.budget.message}</span>}
          </div>

          <div>
            <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Description (Optional)</label>
            <textarea
              placeholder="A brief detail about your trip plans..."
              rows={3}
              className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-300"
              {...register("description")}
            />
          </div>

          <div className="flex gap-3 justify-end border-t border-border/80 pt-4 mt-2">
            <Button type="button" variant="outline" size="md" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md" className="gap-1.5" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <span>Create Trip</span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
