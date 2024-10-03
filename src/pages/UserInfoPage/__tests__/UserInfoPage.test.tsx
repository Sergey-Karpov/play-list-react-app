import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserInfoPage } from "../UserInfoPage";
import { USERS, PLAYLISTS } from "../../../data";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

describe("UserInfoPage", () => {
  test("renders user data when user is available", () => {
    const mockUseParams = require("react-router-dom").useParams;
    mockUseParams.mockReturnValue({ userId: "999" });

    USERS[999] = {
      id: 999,
      email: "test@test.com",
      fullName: "Name Surname",
      jobTitle: "Test developer",
      avatar: "https://avatars.githubusercontent.com/u/14016129",
      bio: "Test text",
      playlist: PLAYLISTS[0],
    };

    render(
      <MemoryRouter>
        <UserInfoPage />
      </MemoryRouter>
    );

    expect(screen.getByText("test@test.com")).toBeInTheDocument();
    expect(screen.getByText("Name Surname")).toBeInTheDocument();
    expect(screen.getByText("Test text")).toBeInTheDocument();
    expect(screen.getByText("playlist:")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Name Surname");
  });

  test("renders message when user is not found", () => {
    const mockUseParams = require("react-router-dom").useParams;
    mockUseParams.mockReturnValue({ userId: "123" });

    render(
      <MemoryRouter>
        <UserInfoPage />
      </MemoryRouter>
    );

    expect(
      screen.getByText("пользователя таким userId нет")
    ).toBeInTheDocument();
  });
});
