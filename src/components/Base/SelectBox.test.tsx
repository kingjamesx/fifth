import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SelectBox from "./SelectBox";

describe("SelectBox Component", () => {
  const mockOnSelect = jest.fn();
  const label = "Fruit";
  const options = ["Apple", "Banana", "Orange"];

  beforeEach(() => {
    render(
      <SelectBox label={label} options={options} onSelect={mockOnSelect} />
    );
  });

  test("renders with the correct label", () => {
    const selectElement = screen.getByText(`Select ${label.toLowerCase()}`);
    expect(selectElement).toBeInTheDocument();
  });

  test("opens and closes the dropdown when clicked", () => {
    const selectElement = screen.getByText(`Select ${label.toLowerCase()}`);

    // Simulate clicking to open the dropdown
    fireEvent.click(selectElement);
    expect(screen.getByText(options[0])).toBeInTheDocument(); // Option should be visible

    // Simulate clicking to close the dropdown
    fireEvent.click(selectElement);
    expect(screen.queryByText(options[0])).not.toBeInTheDocument(); // Option should not be visible
  });

  test("displays the selected option and calls onSelect when an option is clicked", () => {
    const selectElement = screen.getByText(`Select ${label.toLowerCase()}`);

    // Open the dropdown
    fireEvent.click(selectElement);

    const optionElement = screen.getByText(options[1]);

    // Simulate clicking an option
    fireEvent.click(optionElement);

    // Check if the option is selected and displayed
    expect(screen.getByText(options[1])).toBeInTheDocument();

    // Check if the onSelect callback is called with the correct option
    expect(mockOnSelect).toHaveBeenCalledWith(options[1]);
  });

  test("closes the dropdown when clicking outside", () => {
    const selectElement = screen.getByText(`Select ${label.toLowerCase()}`);

    // Open the dropdown
    fireEvent.click(selectElement);
    expect(screen.getByText(options[0])).toBeInTheDocument();

    // Simulate clicking outside the dropdown
    fireEvent.mouseDown(document);

    // The dropdown should close
    expect(screen.queryByText(options[0])).not.toBeInTheDocument();
  });
});
