"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Compass, Mail, Lock, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { isAuthenticated } from "@/lib/auth";
import Button from "@/components/ui/Button";

interface LoginFormInputs {
  email: string;
  password?: string; // made optional for strict form match, validated as required
}

export default function LoginPage() {
  const router = useRouter();
  const { login, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>();

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/dashboard");
    }
  }, [router]);

  const onSubmit = async (data: LoginFormInputs) => {
    setErrorMsg(null);
    setSubmitting(true);
    try {
      await login(data.email, data.password || "");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Login failed.";
      setErrorMsg(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4 bg-background overflow-hidden transition-colors duration-300">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern -z-20 pointer-events-none" />
      <div className="absolute top-[10%] left-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-primary/4 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-secondary/4 blur-[130px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md rounded-3xl border border-card-border bg-card/45 backdrop-blur-xl p-8 shadow-2xl transition-all duration-300">
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white shadow-lg shadow-primary/20 mb-4 animate-float">
            <Compass className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-black text-foreground tracking-tight">Sign In</h1>
          <p className="text-xs text-muted-foreground mt-1">Unlock your travel diaries with TripMitra</p>
        </div>

        {errorMsg && (
          <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3.5 mb-5 animate-pulse">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground/75">
                <Mail className="h-4 w-4" />
              </span>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-300"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" }
                })}
              />
            </div>
            {errors.email && <span className="text-[10px] text-red-500 font-semibold mt-1 block">{errors.email.message}</span>}
          </div>

          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground/75">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-300"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" }
                })}
              />
            </div>
            {errors.password && <span className="text-[10px] text-red-500 font-semibold mt-1 block">{errors.password.message}</span>}
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full gap-2 mt-2" disabled={loading || submitting}>
            {(loading || submitting) ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Entering desk...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          New to TripMitra?{" "}
          <Link href="/register" className="font-bold text-primary hover:text-primary/80 transition-colors duration-200">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
}
