import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Input } from "../input";

describe("Input", () => {
  it("renders input element", () => {
    render(<Input placeholder="Enter text" />);

    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("flex");
    expect(input).toHaveClass("h-9");
    expect(input).toHaveClass("w-full");
  });

  it("handles user input", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Enter text" />);

    const input = screen.getByPlaceholderText("Enter text");
    await user.type(input, "Hello World");

    expect(input).toHaveValue("Hello World");
  });

  it("can be disabled", () => {
    render(<Input disabled placeholder="Disabled input" />);

    const input = screen.getByPlaceholderText("Disabled input");
    expect(input).toBeDisabled();
    expect(input).toHaveClass("disabled:cursor-not-allowed");
    expect(input).toHaveClass("disabled:opacity-50");
  });

  it("accepts custom className", () => {
    render(<Input className="custom-class" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = jest.fn();
    render(<Input ref={ref} />);

    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
  });
});
