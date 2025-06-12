import { analytics } from "../analytics";

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("Analytics", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    analytics.clearData();
  });

  it("tracks events correctly", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    analytics.track("test_event", { key: "value" });

    const events = analytics.getEvents();
    expect(events).toHaveLength(1);
    expect(events[0].event).toBe("test_event");
    expect(events[0].properties).toEqual({ key: "value" });

    consoleSpy.mockRestore();
  });

  it("tracks page views", () => {
    analytics.trackPageView("/dashboard");

    const events = analytics.getEventsByType("page_view");
    expect(events).toHaveLength(1);
    expect(events[0].properties?.page).toBe("/dashboard");
  });

  it("tracks button clicks", () => {
    analytics.trackButtonClick("submit", "form");

    const events = analytics.getEventsByType("button_click");
    expect(events).toHaveLength(1);
    expect(events[0].properties?.button_name).toBe("submit");
    expect(events[0].properties?.location).toBe("form");
  });

  it("tracks theme changes", () => {
    analytics.trackThemeChanged("dark");

    const events = analytics.getEventsByType("theme_changed");
    expect(events).toHaveLength(1);
    expect(events[0].properties?.theme).toBe("dark");
  });

  it("sets user ID correctly", () => {
    analytics.setUserId("user123");
    analytics.track("test_event");

    const events = analytics.getEvents();
    expect(events[0].userId).toBe("user123");
  });

  it("provides session stats", () => {
    analytics.track("event1");
    analytics.track("event2");
    analytics.track("event1"); // duplicate event type

    const stats = analytics.getSessionStats();
    expect(stats.totalEvents).toBe(3);
    expect(stats.uniqueEvents).toBe(2);
    expect(stats.sessionId).toBeDefined();
  });

  it("can be disabled and enabled", () => {
    analytics.disable();
    analytics.track("test_event");

    expect(analytics.getEvents()).toHaveLength(0);

    analytics.enable();
    analytics.track("test_event");

    expect(analytics.getEvents()).toHaveLength(1);
  });

  it("clears data correctly", () => {
    analytics.track("test_event");
    expect(analytics.getEvents()).toHaveLength(1);

    analytics.clearData();
    expect(analytics.getEvents()).toHaveLength(0);
    expect(localStorageMock.removeItem).toHaveBeenCalledWith(
      "temuai_analytics"
    );
  });
});
