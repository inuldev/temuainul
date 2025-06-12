"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { analytics } from "@/lib/analytics";

export function usePageAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view when pathname changes
    analytics.trackPageView(pathname, {
      referrer: document.referrer,
      timestamp: Date.now(),
    });
  }, [pathname]);
}
