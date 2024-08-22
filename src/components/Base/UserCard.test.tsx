import { render, screen } from "@testing-library/react";
import UserCard from "./UserCard";
import { User } from "../../types/backend";

// Mock the store functions
jest.mock("../../../store/userStore", () => ({
  __esModule: true,
  default: () => ({
    updateDetailsIndex: jest.fn(),
    updateDetailsPage: jest.fn(),
    showCountry: true,
  }),
}));

const mockUser: User = {
  gender: "male",
  name: { title: "Mr", first: "John", last: "Doe" },
  picture: {
    large: "https://randomuser.me/api/portraits/men/1.jpg",
    medium: "",
    thumbnail: "",
  },
  location: {
    street: { number: 123, name: "Main St" },
    city: "Springfield",
    state: "Illinois",
    country: "USA",
    postcode: 62701,
    coordinates: { latitude: "39.7817", longitude: "-89.6501" },
    timezone: { offset: "-6:00", description: "Central Time (US & Canada)" },
  },
  email: "johndoe@example.com",
  login: {
    uuid: "123456",
    username: "johndoe",
    password: "password123",
    salt: "salt",
    md5: "md5",
    sha1: "sha1",
    sha256: "sha256",
  },
  dob: { date: "1990-01-01T00:00:00Z", age: 30 },
  registered: { date: "2020-01-01T00:00:00Z", age: 1 },
  phone: "123-456-7890",
  cell: "123-456-7890",
  id: { name: "SSN", value: "123-45-6789" },
};

describe("UserCard Component", () => {
  test("renders user information correctly", () => {
    render(<UserCard user={mockUser} index={0} />);

    // Check for the user's name
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();

    // Check for the user's location
    expect(
      screen.getByText(/123, Springfield, Illinois, USA/i)
    ).toBeInTheDocument();

    // Check for the user's email
    expect(screen.getByText(/johndoe@example.com/i)).toBeInTheDocument();

    // Check for the user's cell
    expect(screen.getByText(/123-456-7890/i)).toBeInTheDocument();
  });
});
