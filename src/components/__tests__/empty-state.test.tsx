import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { EmptyState } from "../empty-state";

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    width,
    height,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} />
  ),
}));

describe("EmptyState", () => {
  it("renders with required props", () => {
    const title = "Test Title";
    const description = "Test description";

    render(<EmptyState title={title} description={description} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByAltText("Empty")).toBeInTheDocument();
  });

  it("renders with custom image", () => {
    const customImage = "/custom-empty.svg";

    render(
      <EmptyState title="Title" description="Description" image={customImage} />
    );

    const image = screen.getByAltText("Empty");
    expect(image).toHaveAttribute("src", customImage);
  });

  it("uses default image when not provided", () => {
    render(<EmptyState title="Title" description="Description" />);

    const image = screen.getByAltText("Empty");
    expect(image).toHaveAttribute("src", "/empty.svg");
  });

  it("has correct structure and styling classes", () => {
    const { container } = render(
      <EmptyState title="Title" description="Description" />
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass(
      "flex",
      "flex-col",
      "items-center",
      "justify-center"
    );
  });
});
