import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { PLAYLISTS } from "../../data";
import "./PlaylistInfoPage.css";

export function PlaylistInfoPage() {
  const { playlistId } = useParams();
  const { genre, name, songs } = PLAYLISTS[Number(playlistId)];

  if (genre === "Non Music") {
    return (
      <div className="playlistInfoPage">
        <h2>PlaylistInfoPage</h2>

        <div className="users">
          <p>отсутствует список композиций</p>
        </div>
      </div>
    );
  }

  return (
    <div className="playlistInfoPage">
      <h2>PlaylistInfoPage</h2>

      <div className="playlistHeader">
        <div className="playlistHeaderLink">
          Жанр:
          <Link to={"/playlists"}>{genre}</Link>
        </div>
        <p>
          Название: <span>{name}</span>
        </p>
      </div>
      <ul>
        {songs.map((song, index) => (
          <li key={index}>{song}</li>
        ))}
      </ul>
    </div>
  );
}
