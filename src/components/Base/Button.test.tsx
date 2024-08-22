import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserButton from "./Button";

describe("UserButton Component", () => {
  test("renders button with correct children", () => {
    render(<UserButton>Click Me</UserButton>);

    // Check if the button renders with the correct text
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test("applies the correct styles and className", () => {
    const { container } = render(
      <UserButton color="red" className="custom-class">
        Click Me
      </UserButton>
    );

    // Check if the button has the correct background color and className
    const buttonElement = container.querySelector("button");
    expect(buttonElement).toHaveStyle("background: red");
    expect(buttonElement).toHaveClass("custom-class");
  });

  test("triggers onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<UserButton onClick={handleClick}>Click Me</UserButton>);

    // Click the button
    const buttonElement = screen.getByText(/Click Me/i);
    fireEvent.click(buttonElement);

    // Check if the click handler was called
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("displays the correct text below the button", () => {
    render(<UserButton text="Button Description">Click Me</UserButton>);

    // Check if the correct text is displayed below the button
    const textElement = screen.getByText(/Button Description/i);
    expect(textElement).toBeInTheDocument();
  });

  test("button is disabled when disabled prop is true", () => {
    render(<UserButton disabled>Click Me</UserButton>);

    // Check if the button is disabled
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeDisabled();
  });
});
