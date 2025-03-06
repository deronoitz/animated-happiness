import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Field from "../Field";

describe("Field Component", () => {
  test("renders an input element by default", () => {
    render(<Field placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");

    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe("INPUT");
  });

  test("renders a textarea when 'as=textarea' is passed", () => {
    render(<Field as="textarea" placeholder="Enter details" />);
    const textarea = screen.getByPlaceholderText("Enter details");

    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe("TEXTAREA");
  });

  test("applies correct styles to input", () => {
    render(<Field />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveClass(
      "shadow-input-box outline-0 px-4 py-3 placeholder:text-xs text-base placeholder:text-slate-300 bg-white w-full rounded-xl border border-white"
    );
  });

  test("applies correct styles to textarea", () => {
    render(<Field as="textarea" />);
    const textarea = screen.getByRole("textbox");

    expect(textarea).toHaveClass(
      "shadow-input-box outline-0 px-4 py-3 placeholder:text-xs text-base placeholder:text-slate-300 bg-white w-full rounded-xl border border-white"
    );
  });

  test("passes additional props correctly", async () => {
    render(<Field placeholder="Type here" />);
    const input = screen.getByPlaceholderText("Type here");

    await userEvent.type(input, "Hello");

    expect(input).toHaveValue("Hello");
  });
});
