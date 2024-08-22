import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Switch from "./Switch";

describe("Switch Component", () => {
  const mockOnClick = jest.fn();
  const label = "Enable notifications";

  beforeEach(() => {
    render(<Switch onClick={mockOnClick} label={label} />);
  });

  test("renders with the correct label", () => {
    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();
  });

  test("renders with the switch in the 'on' state by default", () => {
    const switchElement = screen.getByRole("button");
    expect(switchElement).toHaveClass("bg-[#30bbb5]");
  });

  test("toggles the switch state and calls onClick when clicked", () => {
    const switchElement = screen.getByRole("button");

    // Initial state should be 'on'
    expect(switchElement).toHaveClass("bg-[#30bbb5]");

    // Simulate clicking the switch
    fireEvent.click(switchElement);

    // The switch should be in the 'off' state
    expect(switchElement).toHaveClass("bg-gray-400");

    // Ensure the onClick callback is called
    expect(mockOnClick).toHaveBeenCalled();

    // Simulate clicking the switch again to turn it 'on'
    fireEvent.click(switchElement);

    // The switch should be back in the 'on' state
    expect(switchElement).toHaveClass("bg-[#30bbb5]");

    // Ensure the onClick callback is called again
    expect(mockOnClick).toHaveBeenCalledTimes(2);
  });
});
