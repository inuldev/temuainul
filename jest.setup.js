// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return "";
  },
}));

// Mock next/headers
jest.mock("next/headers", () => ({
  headers: jest.fn(() => Promise.resolve(new Headers())),
  cookies: jest.fn(() => Promise.resolve({ get: jest.fn() })),
}));

// Mock Radix UI components that might cause issues
jest.mock("@radix-ui/react-tooltip", () => ({
  TooltipProvider: ({ children }) => children,
  Tooltip: ({ children }) => children,
  TooltipTrigger: ({ children, asChild }) =>
    asChild ? children : <div>{children}</div>,
  TooltipContent: ({ children }) => <div>{children}</div>,
}));

// Mock Sonner toast
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    warning: jest.fn(),
    info: jest.fn(),
    loading: jest.fn(),
    promise: jest.fn(),
    dismiss: jest.fn(),
  },
  Toaster: () => null,
}));

// Mock environment variables
process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY = "test-api-key";
process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/test";
process.env.OPENAI_API_KEY = "sk-test-key";

// Global test utilities
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Suppress console errors in tests unless explicitly testing them
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Warning: ReactDOM.render is no longer supported")
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
