"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/auth.service";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import { User as UserIcon, Mail, Loader2, LogOut, Shield } from "lucide-react";

interface ProfileFormInputs {
  fullName: string;
  email: string;
}

export default function ProfilePage() {
  const { user, refreshUser, logout } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProfileFormInputs>({
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || ""
    }
  });

  const onSubmit = async (data: ProfileFormInputs) => {
    setSubmitting(true);
    try {
      const res = await authService.updateProfile(data);
      if (res.success) {
        toast.success("Profile updated successfully!");
        await refreshUser();
      } else {
        toast.error(res.message || "Failed to update profile.");
      }
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to update profile.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <ProtectedLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Profile Card Intro */}
        <div className="rounded-3xl border border-border bg-card/60 backdrop-blur-md p-6 shadow-sm flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-primary/30 to-secondary/30 border border-primary/20 text-2xl font-black text-foreground shadow-inner">
            {user ? getInitials(user.fullName) : "U"}
          </div>
          <div className="flex-1 space-y-1">
            <h1 className="text-xl font-extrabold text-foreground tracking-tight">{user?.fullName}</h1>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-semibold uppercase tracking-wider mt-1">
              <Shield className="h-3 w-3" />
              <span>Mitra Traveler</span>
            </div>
          </div>
        </div>

        {/* Profile Edit Form */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-wider border-b border-border pb-3 mb-5">
            Modify Travel Profile
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground/75">
                  <UserIcon className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-300"
                  {...register("fullName", { required: "Full name is required" })}
                />
              </div>
              {errors.fullName && <span className="text-[10px] text-red-500 font-semibold mt-1 block">{errors.fullName.message}</span>}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground/75">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-300"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" }
                  })}
                />
              </div>
              {errors.email && <span className="text-[10px] text-red-500 font-semibold mt-1 block">{errors.email.message}</span>}
            </div>

            <div className="flex gap-3 justify-end pt-2 border-t border-border/80 mt-4">
              <Button type="submit" variant="primary" size="md" className="gap-1.5" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Danger Area / Logout */}
        <div className="rounded-3xl border border-red-500/10 bg-red-500/5 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-red-500 uppercase tracking-wider border-b border-red-500/10 pb-3 mb-4">
            Security Control
          </h3>
          <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
            Close down your current device session. Your tokens will be deleted from storage.
          </p>
          <Button
            variant="outline"
            size="md"
            onClick={logout}
            className="text-red-500 border-red-500/20 hover:bg-red-500/10 hover:border-red-500/40 gap-1.5 font-bold"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out Session</span>
          </Button>
        </div>
      </div>
    </ProtectedLayout>
  );
}
