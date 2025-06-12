"use client";

import { useEffect } from "react";

import { analytics } from "@/lib/analytics";
import { authClient } from "@/lib/auth-client";
import { usePageAnalytics } from "@/hooks/use-page-analytics";

export function DashboardAnalytics() {
  const { data: session } = authClient.useSession();

  // Track page views automatically
  usePageAnalytics();

  // Set user ID when session is available
  useEffect(() => {
    if (session?.user?.id) {
      analytics.setUserId(session.user.id);
    }
  }, [session?.user?.id]);

  // This component doesn't render anything, it's just for analytics tracking
  return null;
}
