"use client";

import React, { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, MailWarning, Loader2, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";

function VerifyEmailContent() {

  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const { verifyEmail, resendOtp, loading } = useAuth();
  
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Timer States
  const [expiryTime, setExpiryTime] = useState<number>(600); // 10 minutes in seconds
  const [resendCooldown, setResendCooldown] = useState<number>(0); // 30 seconds cooldown

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Expiry Timer countdown
  useEffect(() => {
    if (expiryTime <= 0) return;
    const timer = setInterval(() => {
      setExpiryTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [expiryTime]);

  // Resend Cooldown countdown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Format seconds to mm:ss
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleChange = (element: HTMLInputElement, index: number) => {
    const val = element.value;
    // Only allow numbers
    if (val && isNaN(Number(val))) return;

    const newOtp = [...otp];
    // Keep only last character
    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);

    // Auto advance
    if (newOtp[index] && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];

      if (otp[index]) {
        // If current input has a value, clear it
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // If current is empty, clear previous and focus previous
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text").trim();
    
    // Check if pasted text is a 6 digit number
    if (!/^\d{6}$/.test(pastedText)) return;

    const digits = pastedText.split("");
    setOtp(digits);
    
    // Focus last input box
    inputRefs.current[5]?.focus();
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || !email) return;
    setErrorMsg(null);
    try {
      await resendOtp(email);
      setExpiryTime(600); // Reset expiry to 10 mins
      setResendCooldown(30); // 30s cooldown
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      const message = error.response?.data?.message || error.message || "Failed to resend code.";
      setErrorMsg(message);
    }
  };

  const handleSubmitOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setErrorMsg("Please enter all 6 digits of the verification code.");
      return;
    }

    if (expiryTime <= 0) {
      setErrorMsg("Verification code has expired. Please request a new one.");
      return;
    }

    setSubmitting(true);
    try {
      await verifyEmail(email, otpCode);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      const message = error.response?.data?.message || error.message || "Verification failed.";
      setErrorMsg(message);
      
      // Focus on the first input on failure and clear OTP
      setOtp(new Array(6).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setSubmitting(false);
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4 bg-background overflow-hidden transition-colors duration-300">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern -z-20 pointer-events-none" />
      <div className="absolute top-[10%] left-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-primary/4 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-secondary/4 blur-[130px] pointer-events-none" />

      {/* Back to Login Link */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Sign In
        </Link>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md rounded-3xl border border-card-border bg-card/45 backdrop-blur-xl p-8 shadow-2xl transition-all duration-300">
        <div className="flex flex-col items-center mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white shadow-lg shadow-primary/20 mb-4 animate-float">
            {expiryTime <= 0 ? <MailWarning className="h-7 w-7" /> : <ShieldCheck className="h-7 w-7" />}
          </div>
          <h1 className="text-2xl font-black text-foreground tracking-tight">Verify Your Email</h1>
          <p className="text-xs text-muted-foreground text-center mt-2 max-w-[280px]">
            We sent a secure 6-digit OTP code to <br />
            <strong className="text-foreground">{email || "your registered email"}</strong>
          </p>
        </div>

        {errorMsg && (
          <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3.5 mb-5">
            <MailWarning className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmitOtp} className="space-y-6">
          {/* OTP Grid */}
          <div className="grid grid-cols-6 gap-2.5">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-full text-center h-12 rounded-xl border border-border bg-background/50 text-foreground text-lg font-extrabold focus:outline-none focus:ring-2 focus:ring-primary/45 focus:border-primary transition-all duration-200"
              />
            ))}
          </div>

          {/* Expiry Countdown */}
          <div className="text-center text-xs text-muted-foreground">
            {expiryTime > 0 ? (
              <span>
                Code expires in: <strong className="text-primary font-mono">{formatTime(expiryTime)}</strong>
              </span>
            ) : (
              <span className="text-red-500 font-semibold">Verification code has expired.</span>
            )}
          </div>

          {/* Action Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full gap-2 mt-2"
            disabled={loading || submitting || !isOtpComplete || expiryTime <= 0}
          >
            {(loading || submitting) ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <span>Verify Account</span>
            )}
          </Button>
        </form>

        {/* Resend Cooldown Section */}
        <div className="text-center text-xs text-muted-foreground mt-6">
          Didn&apos;t receive the code?{" "}
          {resendCooldown > 0 ? (
            <span className="text-muted-foreground font-semibold">
              Resend in {resendCooldown}s
            </span>
          ) : (
            <button
              onClick={handleResend}
              disabled={!email}
              className="font-bold text-primary hover:text-primary/80 transition-colors duration-200 cursor-pointer disabled:opacity-50"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
