import React from "react";
import { Compass } from "lucide-react";

interface LoadingSpinnerProps {
  fullPage?: boolean;
  size?: "sm" | "md" | "lg";
  message?: string;
}

export default function LoadingSpinner({
  fullPage = false,
  size = "md",
  message = "Loading your travel desk..."
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-6 w-6 text-primary",
    md: "h-10 w-10 text-primary",
    lg: "h-16 w-16 text-primary"
  };

  const spinnerContent = (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <div className="relative">
        <Compass className={`${sizeClasses[size]} animate-spin`} style={{ animationDuration: "3s" }} />
        <div className="absolute inset-0 rounded-full border-2 border-primary/10 border-t-primary animate-ping opacity-25" />
      </div>
      {message && <p className="text-sm font-medium text-muted-foreground animate-pulse">{message}</p>}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md">
        {spinnerContent}
      </div>
    );
  }

  return <div className="flex min-h-[200px] w-full items-center justify-center p-6">{spinnerContent}</div>;
}
