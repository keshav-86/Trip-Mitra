"use client";
 
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Compass, X, Home, LayoutDashboard, Briefcase, User as UserIcon, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Sidebar from "./Sidebar";
import DashboardNavbar from "./DashboardNavbar";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <LoadingSpinner fullPage size="lg" message="Authorising credentials..." />;
  }

  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Workspace Dashboard";
    if (pathname === "/trips") return "My Trips Directory";
    if (pathname.startsWith("/trips/")) return "Trip Plan Workspace";
    if (pathname === "/profile") return "User Settings Profile";
    return "Mitra Workspace";
  };

  const mobileLinks = [
    { label: "🏠 Home", href: "/", icon: Home },
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Trips", href: "/trips", icon: Briefcase },
    { label: "Profile", href: "/profile", icon: UserIcon }
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden relative transition-colors duration-300">
      {/* Background Gradients and Ambient Circles */}
      <div className="absolute inset-0 bg-grid-pattern -z-20 pointer-events-none" />
      <div className="absolute top-[10%] left-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-primary/2 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-secondary/2 blur-[120px] pointer-events-none" />

      {/* Desktop Sidebar Layout */}
      <Sidebar />

      {/* Mobile Sidebar Slide-over Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-background/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative flex w-full max-w-xs flex-col bg-card border-r border-border p-6 shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-secondary text-white">
                  <Compass className="h-5 w-5" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  TripMitra
                </span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="flex-1 space-y-1">
              {mobileLinks.map((item) => {
                const Active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                      Active ? "bg-primary/10 text-primary border border-primary/10" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-border pt-4 mt-auto">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-red-500 hover:bg-red-500/5 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Workspace Layout */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <DashboardNavbar title={getPageTitle()} onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 no-scrollbar pb-10">
          {children}
        </main>
      </div>
    </div>
  );
}
