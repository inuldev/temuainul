import { render, screen, fireEvent } from "@testing-library/react";
import { ErrorState } from "../error-state";

describe("ErrorState", () => {
  it("should render default error state", () => {
    render(<ErrorState />);

    // Since we're using i18n, the text will be the translation keys
    expect(screen.getByText("somethingWentWrong")).toBeInTheDocument();
    expect(screen.getByText("errorLoadingContent")).toBeInTheDocument();
  });

  it("should render custom title and description", () => {
    render(
      <ErrorState title="Custom Error" description="Custom error description" />
    );

    expect(screen.getByText("Custom Error")).toBeInTheDocument();
    expect(screen.getByText("Custom error description")).toBeInTheDocument();
  });

  it("should render minimal variant", () => {
    render(<ErrorState variant="minimal" title="Error occurred" />);

    expect(screen.getByText("Error occurred")).toBeInTheDocument();
    // Should not render description in minimal variant
    expect(
      screen.queryByText("We encountered an error while loading this content")
    ).not.toBeInTheDocument();
  });

  it("should show retry button when enabled", () => {
    const onRetry = jest.fn();

    render(<ErrorState showRetry onRetry={onRetry} />);

    const retryButton = screen.getByText("tryAgain");
    expect(retryButton).toBeInTheDocument();

    fireEvent.click(retryButton);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("should show home button when enabled", () => {
    const onHome = jest.fn();

    render(<ErrorState showHome onHome={onHome} />);

    const homeButton = screen.getByText("goHome");
    expect(homeButton).toBeInTheDocument();

    fireEvent.click(homeButton);
    expect(onHome).toHaveBeenCalledTimes(1);
  });

  it("should show both retry and home buttons", () => {
    const onRetry = jest.fn();
    const onHome = jest.fn();

    render(<ErrorState showRetry showHome onRetry={onRetry} onHome={onHome} />);

    expect(screen.getByText("tryAgain")).toBeInTheDocument();
    expect(screen.getByText("goHome")).toBeInTheDocument();
  });

  it("should not show buttons when handlers are not provided", () => {
    render(<ErrorState showRetry showHome />);

    expect(screen.queryByText("Try Again")).not.toBeInTheDocument();
    expect(screen.queryByText("Go Home")).not.toBeInTheDocument();
  });

  it("should apply custom className", () => {
    const { container } = render(<ErrorState className="custom-error" />);

    expect(container.firstChild).toHaveClass("custom-error");
  });
});
