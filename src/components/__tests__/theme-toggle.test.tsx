import { useTheme } from "next-themes";
import { render, screen } from "@testing-library/react";
import { ThemeToggle } from "../theme-toggle";

// Mock next-themes
jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));

// Mock analytics
jest.mock("@/lib/analytics", () => ({
  useAnalytics: () => ({
    trackThemeChanged: jest.fn(),
  }),
}));

const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

describe("ThemeToggle", () => {
  const mockSetTheme = jest.fn();

  beforeEach(() => {
    mockUseTheme.mockReturnValue({
      setTheme: mockSetTheme,
      theme: "light",
      themes: ["light", "dark", "system"],
      systemTheme: "light",
      resolvedTheme: "light",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("has correct accessibility attributes", () => {
    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-haspopup", "menu");
  });

  it("has correct accessibility attributes", () => {
    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-haspopup", "menu");
    expect(screen.getByText("Toggle theme")).toBeInTheDocument();
  });

  it("renders sun and moon icons", () => {
    render(<ThemeToggle />);

    // Check if button contains SVG elements
    const button = screen.getByRole("button");
    const svgElements = button.querySelectorAll("svg");
    expect(svgElements.length).toBe(2);
  });
});
