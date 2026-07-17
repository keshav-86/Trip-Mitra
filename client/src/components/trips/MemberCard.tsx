import React from "react";
import { Mail, Shield } from "lucide-react";
import { User } from "@/types";
import Badge from "@/components/ui/Badge";

interface MemberCardProps {
  member: User;
  isCreator?: boolean;
  totalSpent?: number;
}

export default function MemberCard({
  member,
  isCreator = false,
  totalSpent,
}: MemberCardProps) {

  const getInitials = (name?: string) => {
    if (!name) return "?";

    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card/65 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-primary/25 to-secondary/25 border border-primary/20 text-sm font-bold text-foreground shadow-inner">
          {getInitials(member.fullName)}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-foreground">
              {member.fullName || "Unknown User"}
            </span>

            {isCreator && (
              <Badge
                variant="primary"
                className="text-[9px] px-1.5 py-0 flex items-center gap-0.5"
              >
                <Shield className="h-2.5 w-2.5" />
                <span>Host</span>
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
            <Mail className="h-3 w-3 text-muted-foreground/60" />
            <span>{member.email}</span>
          </div>
        </div>
      </div>

      {totalSpent !== undefined && (
        <div className="flex flex-col items-end">
          <span className="text-xs text-muted-foreground">
            Expenses paid
          </span>
          <span className="font-extrabold text-sm text-foreground">
            ₹{totalSpent.toLocaleString("en-IN")}
          </span>
        </div>
      )}
    </div>
  );
}