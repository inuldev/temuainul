import { render, screen } from "@testing-library/react";
import {
  LoadingState,
  TableSkeleton,
  CardSkeleton,
  ButtonSkeleton,
} from "../loading-state";

describe("LoadingState", () => {
  it("should render default loading state", () => {
    render(<LoadingState />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(
      screen.getByText("Please wait while we load your content")
    ).toBeInTheDocument();
  });

  it("should render custom title and description", () => {
    render(
      <LoadingState title="Custom Loading" description="Custom description" />
    );

    expect(screen.getByText("Custom Loading")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("should render minimal variant", () => {
    render(<LoadingState variant="minimal" title="Loading data..." />);

    expect(screen.getByText("Loading data...")).toBeInTheDocument();
    // Should not render description in minimal variant
    expect(
      screen.queryByText("Please wait while we load your content")
    ).not.toBeInTheDocument();
  });

  it("should apply custom className", () => {
    const { container } = render(<LoadingState className="custom-class" />);

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("should render different sizes", () => {
    const { rerender } = render(<LoadingState size="sm" />);
    expect(document.querySelector(".size-4")).toBeInTheDocument();

    rerender(<LoadingState size="lg" />);
    expect(document.querySelector(".size-8")).toBeInTheDocument();
  });
});

describe("TableSkeleton", () => {
  it("should render default number of rows", () => {
    render(<TableSkeleton />);

    // Default is 5 rows
    const rows = document.querySelectorAll(".space-y-3 > div");
    expect(rows).toHaveLength(5);
  });

  it("should render custom number of rows", () => {
    render(<TableSkeleton rows={3} />);

    const rows = document.querySelectorAll(".space-y-3 > div");
    expect(rows).toHaveLength(3);
  });
});

describe("CardSkeleton", () => {
  it("should render card skeleton", () => {
    render(<CardSkeleton />);

    const skeleton = document.querySelector(".p-6.border.rounded-lg");
    expect(skeleton).toBeInTheDocument();
  });
});

describe("ButtonSkeleton", () => {
  it("should render button skeleton", () => {
    render(<ButtonSkeleton />);

    const skeleton = document.querySelector(".h-9.w-20");
    expect(skeleton).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    render(<ButtonSkeleton className="custom-button" />);

    const skeleton = document.querySelector(".custom-button");
    expect(skeleton).toBeInTheDocument();
  });
});
