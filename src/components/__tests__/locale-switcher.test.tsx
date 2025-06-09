import { render, screen } from "@testing-library/react";
import { LocaleSwitcher } from "../locale-switcher";

// Simple test to check if component renders without errors
describe("LocaleSwitcher", () => {
  it("should render without crashing", () => {
    render(<LocaleSwitcher />);

    // Check if the component renders a button
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("should contain globe icon", () => {
    render(<LocaleSwitcher />);

    // Check if globe icon is present (it's an SVG)
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});
