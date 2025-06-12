import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ErrorState } from "../error-state";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  AlertCircleIcon: ({ className }: { className?: string }) => (
    <div data-testid="alert-icon" className={className}>
      Alert
    </div>
  ),
}));

describe("ErrorState", () => {
  it("renders with required props", () => {
    const title = "Error Title";
    const description = "Error description";

    render(<ErrorState title={title} description={description} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByTestId("alert-icon")).toBeInTheDocument();
  });

  it("renders alert icon with correct classes", () => {
    render(<ErrorState title="Title" description="Description" />);

    const alertIcon = screen.getByTestId("alert-icon");
    expect(alertIcon).toHaveClass("size-6", "text-red-500");
  });

  it("has correct structure and styling", () => {
    const { container } = render(
      <ErrorState title="Title" description="Description" />
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass(
      "py-4",
      "px-8",
      "flex",
      "flex-1",
      "items-center",
      "justify-center"
    );
  });
});
