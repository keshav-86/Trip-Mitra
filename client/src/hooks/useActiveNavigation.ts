"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function useActiveNavigation() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    // Only apply IntersectionObserver on the root landing page
    if (pathname !== "/") return;

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // triggers when element is centrally positioned in the viewport
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const heroEl = document.getElementById("hero");
    const featuresEl = document.getElementById("features");

    if (heroEl) observer.observe(heroEl);
    if (featuresEl) observer.observe(featuresEl);

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  const isLinkActive = (href: string) => {
    // 1. Home ("/") is active ONLY when pathname === "/" (and scroll state is hero)
    if (href === "/") {
      if (pathname !== "/") return false;
      return activeSection === "hero";
    }

    // 2. Features is active ONLY when pathname === "/" (and scroll state is features)
    if (href === "/#features") {
      if (pathname !== "/") return false;
      return activeSection === "features";
    }

    // 3. Dashboard is active ONLY when pathname === "/dashboard"
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    // 4. Trips active when pathname starts with "/dashboard/trips" or "/trips"
    if (href === "/trips" || href === "/dashboard/trips") {
      return pathname.startsWith("/dashboard/trips") || pathname.startsWith("/trips");
    }

    // 5. Expenses active when pathname starts with "/dashboard/expenses" or contains "/expenses"
    if (href === "/dashboard/expenses" || href.includes("expenses")) {
      return pathname.startsWith("/dashboard/expenses") || pathname.includes("expenses");
    }

    // 6. Settlements active when pathname starts with "/dashboard/settlements" or contains "/settlements"
    if (href === "/dashboard/settlements" || href.includes("settlements")) {
      return pathname.startsWith("/dashboard/settlements") || pathname.includes("settlements");
    }

    // 7. Profile active when pathname starts with "/profile"
    if (href === "/profile") {
      return pathname.startsWith("/profile");
    }

    // Fallback: Exact match or safe non-root prefix match
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  return { activeSection, isLinkActive };
}
