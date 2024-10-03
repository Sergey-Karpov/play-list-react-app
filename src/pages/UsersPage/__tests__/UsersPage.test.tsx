import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UsersPage } from "../UsersPage";
import { USERS } from "../../../data";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

describe("UsersPage", () => {
  const mockSetSearchParam = jest.fn();
  const mockUseSearchParams = require("react-router-dom").useSearchParams;

  beforeEach(() => {
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParam,
    ]);

    USERS.length = 0;
    USERS.push(
      {
        id: 1,
        fullName: "John Doe",
        email: "test",
        jobTitle: "test",
        bio: "test",
        avatar: "test",
      },
      {
        id: 2,
        fullName: "Jane Smith",
        email: "test",
        jobTitle: "test",
        bio: "test",
        avatar: "test",
      },
      {
        id: 3,
        fullName: "Alice Johnson",
        email: "test",
        jobTitle: "test",
        bio: "test",
        avatar: "test",
      }
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("calls setSearchParam when user inputs a name", () => {
    render(
      <MemoryRouter>
        <UsersPage />
      </MemoryRouter>
    );

    const input = screen.getByLabelText(/введите имя/i);
    fireEvent.change(input, { target: { value: "John" } });

    expect(mockSetSearchParam).toHaveBeenCalledWith({ searchName: "john" });
  });

  test("filters users based on input", () => {
    render(
      <MemoryRouter>
        <UsersPage />
      </MemoryRouter>
    );

    const input = screen.getByLabelText(/введите имя/i);
    fireEvent.change(input, { target: { value: "Jane" } });

    expect(mockSetSearchParam).toHaveBeenCalledWith({ searchName: "jane" });
  });
});
