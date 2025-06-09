import { renderHook, act } from "@testing-library/react";
import { useIsMobile } from "../use-mobile";

// Mock window.matchMedia
const mockMatchMedia = jest.fn();
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: mockMatchMedia,
});

// Mock window.innerWidth
Object.defineProperty(window, "innerWidth", {
  writable: true,
  value: 1024,
});

describe("useIsMobile", () => {
  beforeEach(() => {
    mockMatchMedia.mockClear();
  });

  it("should return false for desktop width", () => {
    const mockMql = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
    mockMatchMedia.mockReturnValue(mockMql);

    // Set desktop width
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: 1024,
    });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
    expect(mockMatchMedia).toHaveBeenCalledWith("(max-width: 767px)");
  });

  it("should return true for mobile width", () => {
    const mockMql = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
    mockMatchMedia.mockReturnValue(mockMql);

    // Set mobile width
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: 600,
    });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });

  it("should add and remove event listeners", () => {
    const mockMql = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
    mockMatchMedia.mockReturnValue(mockMql);

    const { unmount } = renderHook(() => useIsMobile());

    expect(mockMql.addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );

    unmount();

    expect(mockMql.removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  });

  it("should update when window size changes", () => {
    const mockMql = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
    mockMatchMedia.mockReturnValue(mockMql);

    // Start with desktop width
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: 1024,
    });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);

    // Simulate window resize to mobile
    act(() => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        value: 600,
      });

      // Trigger the change event
      const changeHandler = mockMql.addEventListener.mock.calls[0][1];
      changeHandler();
    });

    expect(result.current).toBe(true);
  });
});
