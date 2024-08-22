// Button.test.tsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";

describe("Button Component", () => {
  test("renders button with correct text", () => {
    render(<Button>Click Me</Button>);

    // Find the button by its text content
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });
});
