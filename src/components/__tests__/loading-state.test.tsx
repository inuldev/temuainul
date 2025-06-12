import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoadingState } from "../loading-state";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  Loader2Icon: ({ className }: { className?: string }) => (
    <div data-testid="loader-icon" className={className}>
      Loading...
    </div>
  ),
}));

describe("LoadingState", () => {
  it("renders with required props", () => {
    const title = "Loading Title";
    const description = "Loading description";

    render(<LoadingState title={title} description={description} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByTestId("loader-icon")).toBeInTheDocument();
  });

  it("renders loading spinner with correct classes", () => {
    render(<LoadingState title="Title" description="Description" />);

    const loaderIcon = screen.getByTestId("loader-icon");
    expect(loaderIcon).toHaveClass("size-6", "animate-spin", "text-primary");
  });

  it("has correct structure and styling", () => {
    const { container } = render(
      <LoadingState title="Title" description="Description" />
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
