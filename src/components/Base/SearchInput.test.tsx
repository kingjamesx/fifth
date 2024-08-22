import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchInput from "./SearchInput";
import useUserStore from "../../../store/userStore";

// Mock the useUserStore hook
jest.mock("../../../store/userStore");

describe("SearchInput Component", () => {
  const mockOnChange = jest.fn();
  const mockStore = { searchValue: "test" };

  beforeEach(() => {
    (useUserStore as any).mockReturnValue(mockStore);
  });

  test("renders input with placeholder and value from store", () => {
    render(<SearchInput onChange={mockOnChange} />);

    const inputElement = screen.getByPlaceholderText("Find a user");

    // Check if the input is rendered with the correct placeholder and value
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(mockStore.searchValue);
  });

  test("triggers onChange when input value changes", () => {
    render(<SearchInput onChange={mockOnChange} />);

    const inputElement = screen.getByPlaceholderText("Find a user");

    // Simulate user typing
    fireEvent.change(inputElement, { target: { value: "new value" } });

    // Check if the onChange handler was called
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  test("applies additional classNames", () => {
    render(
      <SearchInput
        onChange={mockOnChange}
        className="custom-class"
        contentClass="custom-content-class"
      />
    );

    const containerElement = screen.getByRole("textbox").closest("div");
    const inputElement = screen.getByPlaceholderText("Find a user");

    // Check if the additional classNames are applied
    expect(containerElement).toHaveClass("custom-class");
    expect(inputElement).toHaveClass("custom-content-class");
  });

  test("renders the search icon", () => {
    render(<SearchInput onChange={mockOnChange} />);

    const iconElement = screen.getByTestId("search-icon");

    // Check if the search icon is rendered
    expect(iconElement).toBeInTheDocument();
  });
});
