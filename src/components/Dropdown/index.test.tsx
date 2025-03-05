import { render, screen, fireEvent } from "@testing-library/react";
import Dropdown from "../Dropdown";

describe("Dropdown Component", () => {
  const mockOptions = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
  ];

  test("renders the dropdown with a placeholder", () => {
    render(<Dropdown placeholder="Select an option" options={mockOptions} />);
    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });

  test("opens dropdown when clicking the button", () => {
    render(<Dropdown options={mockOptions} />);
    const button = screen.getByRole("button");
    
    fireEvent.click(button);
    
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  test("selects an option and updates the selected state", () => {
    render(<Dropdown options={mockOptions} />);
    const button = screen.getByRole("button");

    fireEvent.click(button);
    fireEvent.click(screen.getByText("Option 1"));

    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  test("calls onChange when an option is selected", () => {
    const mockOnChange = jest.fn();
    render(<Dropdown options={mockOptions} onChange={mockOnChange} />);
    
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Option 2"));

    expect(mockOnChange).toHaveBeenCalledWith({ label: "Option 2", value: "option2" });
  });

  test("closes dropdown when clicking outside", () => {
    render(
      <div>
        <Dropdown options={mockOptions} />
        <button data-testid="outside-button">Outside</button>
      </div>
    );

    fireEvent.click(screen.getByTestId("qa-dropdown-button")); // Open dropdown
    expect(screen.queryByText("Option 1")).toHaveTextContent("Option 1")

    fireEvent.mouseDown(screen.getByTestId("outside-button")); // Click outside
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
  });
});
