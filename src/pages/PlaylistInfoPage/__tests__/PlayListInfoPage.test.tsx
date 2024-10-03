import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PlaylistInfoPage } from "../PlaylistInfoPage";
import { PLAYLISTS } from "../../../data";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

describe("PlaylistInfoPage", () => {
  test("renders default text when playlist is unavailable", () => {
    const mockUseParams = require("react-router-dom").useParams;
    mockUseParams.mockReturnValue({ playlistId: "0" });

    PLAYLISTS[0] = {
      id: 0,
      genre: "Non Music",
      name: "",
      songs: [],
    };

    render(
      <MemoryRouter>
        <PlaylistInfoPage />
      </MemoryRouter>
    );

    expect(
      screen.getByText("отсутствует список композиций")
    ).toBeInTheDocument();
  });

  test("renders playlist data when playlist is available", () => {
    const mockUseParams = require("react-router-dom").useParams;
    mockUseParams.mockReturnValue({ playlistId: "1" });

    PLAYLISTS[1] = {
      id: 1,
      genre: "Rock",
      name: "Great Rock Hits",
      songs: ["Song 1", "Song 2", "Song 3"],
    };

    render(
      <MemoryRouter>
        <PlaylistInfoPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Жанр:")).toBeInTheDocument();
    expect(screen.getByText("Rock")).toBeInTheDocument();
    expect(screen.getByText("Название:")).toBeInTheDocument();
    expect(screen.getByText("Great Rock Hits")).toBeInTheDocument();

    const songsList = screen.getAllByRole("listitem");
    expect(songsList.length).toBe(3);
    expect(songsList[0]).toHaveTextContent("Song 1");
    expect(songsList[1]).toHaveTextContent("Song 2");
    expect(songsList[2]).toHaveTextContent("Song 3");
  });
});
