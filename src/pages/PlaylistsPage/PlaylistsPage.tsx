import { ChangeEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PLAYLISTS } from "../../data";
import "./PlaylistsPage.css";

export function PlaylistsPage() {
  const [searchParam, setSearchParam] = useSearchParams();

  const searchGenre = searchParam.get("searchGenre") || "";
  const searchName = searchParam.get("searchName") || "";

  const updateSearchParam = (
    key: "searchGenre" | "searchName",
    value: string,
    otherKey: "searchGenre" | "searchName"
  ): void => {
    const otherValue = searchParam.get(otherKey) || "";

    if (otherValue) {
      setSearchParam({
        [key]: value.toLowerCase(),
        [otherKey]: otherValue.toLowerCase(),
      });
    } else {
      setSearchParam({
        [key]: value.toLowerCase(),
      });
    }
  };

  const handleSearchGenre = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    updateSearchParam("searchGenre", value, "searchName");
  };

  const handleSearchName = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    updateSearchParam("searchName", value, "searchGenre");
  };

  const filteredPlaylists = PLAYLISTS.filter(
    ({ genre, name }) =>
      genre.toLowerCase().includes(searchGenre) &&
      name.toLowerCase().includes(searchName)
  );

  return (
    <div className="playlistsPage">
      <h2>PlaylistsPage</h2>
      <form>
        <label>
          введите жанр:&nbsp;{" "}
          <input type="text" value={searchGenre} onChange={handleSearchGenre} />
        </label>

        <label>
          введите название плейлиста:&nbsp;{" "}
          <input type="text" value={searchName} onChange={handleSearchName} />
        </label>
      </form>

      <div className="playlists">
        {filteredPlaylists.map(({ id, genre, name }) => (
          <Link to={`/playlists/${id}`} key={id}>
            Жанр: {genre} Плейлист: {name}
          </Link>
        ))}
      </div>
    </div>
  );
}
