import { renderHook } from "@testing-library/react";
import { useIsMobile } from "../use-mobile";

// Mock window.matchMedia
const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

describe("useIsMobile", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window.innerWidth
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it("returns true when screen is mobile size", () => {
    Object.defineProperty(window, "innerWidth", { value: 500 });
    mockMatchMedia(true);

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });

  it("returns false when screen is desktop size", () => {
    Object.defineProperty(window, "innerWidth", { value: 1024 });
    mockMatchMedia(false);

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  it("handles undefined state initially", () => {
    const { result } = renderHook(() => useIsMobile());

    // Should return false for undefined state (due to !!isMobile)
    expect(typeof result.current).toBe("boolean");
  });
});
