"use client";

type AnalyticsValue = string | number | boolean | null | undefined;

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, AnalyticsValue>;
  timestamp: number;
  userId?: string;
  sessionId: string;
}

class Analytics {
  private sessionId: string;
  private userId?: string;
  private events: AnalyticsEvent[] = [];
  private isEnabled: boolean = true;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.loadStoredEvents();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 11)}`;
  }

  private loadStoredEvents(): void {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem("temuai_analytics");
      if (stored) {
        this.events = JSON.parse(stored);
      }
    } catch (error) {
      console.warn("Failed to load analytics events:", error);
    }
  }

  private saveEvents(): void {
    if (typeof window === "undefined") return;

    try {
      // Keep only last 100 events to prevent storage bloat
      const eventsToStore = this.events.slice(-100);
      localStorage.setItem("temuai_analytics", JSON.stringify(eventsToStore));
    } catch (error) {
      console.warn("Failed to save analytics events:", error);
    }
  }

  setUserId(userId: string): void {
    this.userId = userId;
  }

  track(event: string, properties?: Record<string, AnalyticsValue>): void {
    if (!this.isEnabled) return;

    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      timestamp: Date.now(),
      userId: this.userId,
      sessionId: this.sessionId,
    };

    this.events.push(analyticsEvent);
    this.saveEvents();

    // Log in development
    if (process.env.NODE_ENV === "development") {
      console.log("Analytics Event:", analyticsEvent);
    }

    // In production, send to analytics service
    if (process.env.NODE_ENV === "production") {
      this.sendToAnalyticsService(analyticsEvent);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async sendToAnalyticsService(_event: AnalyticsEvent): Promise<void> {
    try {
      // TODO: Replace with actual analytics service endpoint
      // await fetch("/api/analytics", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(event),
      // });
    } catch (error) {
      console.warn("Failed to send analytics event:", error);
    }
  }

  // Common tracking methods
  trackPageView(
    page: string,
    properties?: Record<string, AnalyticsValue>
  ): void {
    this.track("page_view", { page, ...properties });
  }

  trackButtonClick(buttonName: string, location?: string): void {
    this.track("button_click", { button_name: buttonName, location });
  }

  trackMeetingCreated(meetingId: string, agentId?: string): void {
    this.track("meeting_created", { meeting_id: meetingId, agent_id: agentId });
  }

  trackMeetingJoined(meetingId: string): void {
    this.track("meeting_joined", { meeting_id: meetingId });
  }

  trackMeetingEnded(meetingId: string, duration?: number): void {
    this.track("meeting_ended", { meeting_id: meetingId, duration });
  }

  trackAgentCreated(agentId: string, agentType?: string): void {
    this.track("agent_created", { agent_id: agentId, agent_type: agentType });
  }

  trackThemeChanged(theme: string): void {
    this.track("theme_changed", { theme });
  }

  trackError(error: string, context?: string): void {
    this.track("error_occurred", { error, context });
  }

  // Get analytics data for dashboard
  getEvents(limit?: number): AnalyticsEvent[] {
    return limit ? this.events.slice(-limit) : this.events;
  }

  getEventsByType(eventType: string): AnalyticsEvent[] {
    return this.events.filter((event) => event.event === eventType);
  }

  getSessionStats(): {
    sessionId: string;
    totalEvents: number;
    uniqueEvents: number;
    sessionDuration: number;
  } {
    const sessionEvents = this.events.filter(
      (e) => e.sessionId === this.sessionId
    );
    const uniqueEvents = new Set(sessionEvents.map((e) => e.event)).size;
    const firstEvent = sessionEvents[0];
    const lastEvent = sessionEvents[sessionEvents.length - 1];
    const sessionDuration =
      firstEvent && lastEvent ? lastEvent.timestamp - firstEvent.timestamp : 0;

    return {
      sessionId: this.sessionId,
      totalEvents: sessionEvents.length,
      uniqueEvents,
      sessionDuration,
    };
  }

  // Privacy controls
  disable(): void {
    this.isEnabled = false;
  }

  enable(): void {
    this.isEnabled = true;
  }

  clearData(): void {
    this.events = [];
    if (typeof window !== "undefined") {
      localStorage.removeItem("temuai_analytics");
    }
  }
}

// Create singleton instance
export const analytics = new Analytics();

// React hook for analytics
export function useAnalytics() {
  return {
    track: analytics.track.bind(analytics),
    trackPageView: analytics.trackPageView.bind(analytics),
    trackButtonClick: analytics.trackButtonClick.bind(analytics),
    trackMeetingCreated: analytics.trackMeetingCreated.bind(analytics),
    trackMeetingJoined: analytics.trackMeetingJoined.bind(analytics),
    trackMeetingEnded: analytics.trackMeetingEnded.bind(analytics),
    trackAgentCreated: analytics.trackAgentCreated.bind(analytics),
    trackThemeChanged: analytics.trackThemeChanged.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
    getEvents: analytics.getEvents.bind(analytics),
    getSessionStats: analytics.getSessionStats.bind(analytics),
  };
}
