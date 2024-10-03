import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PlaylistsPage } from "../PlaylistsPage";
import { PLAYLISTS } from "../../../data";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

describe("PlaylistsPage", () => {
  const mockSetSearchParam = jest.fn();
  const mockUseSearchParams = require("react-router-dom").useSearchParams;

  beforeEach(() => {
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParam,
    ]);

    PLAYLISTS.length = 0;
    PLAYLISTS.push(
      {
        id: 1,
        genre: "Rock",
        name: "Classic Rock",
        songs: ["song1", "song2", "song3"],
      },
      {
        id: 2,
        genre: "Pop",
        name: "Top Hits",
        songs: ["song1", "song2", "song3"],
      },
      {
        id: 3,
        genre: "Jazz",
        name: "Smooth Jazz",
        songs: ["song1", "song2", "song3"],
      }
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("calls setSearchParam when user inputs a genre", () => {
    render(
      <MemoryRouter>
        <PlaylistsPage />
      </MemoryRouter>
    );

    const genreInput = screen.getByLabelText(/введите жанр/i);
    fireEvent.change(genreInput, { target: { value: "Rock" } });

    expect(mockSetSearchParam).toHaveBeenCalledWith({ searchGenre: "rock" });
  });

  test("calls setSearchParam when user inputs a playlist name", () => {
    render(
      <MemoryRouter>
        <PlaylistsPage />
      </MemoryRouter>
    );

    const nameInput = screen.getByLabelText(/введите название плейлиста/i);
    fireEvent.change(nameInput, { target: { value: "Top" } });

    expect(mockSetSearchParam).toHaveBeenCalledWith({ searchName: "top" });
  });
});
