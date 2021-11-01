import s from "./MoviesList.module.css";
import { Link, useLocation } from "react-router-dom";

import noPosterAvailable from "../../images/no-poster-available.jpg";

const MovieList = ({ movies }) => {
  const location = useLocation();
  const ImageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <>
      {movies.map((movie) => (
        <ul key={movie.id}>
          <li>
            <Link
              to={{
                pathname: `movies/${movies.id}`,
                state: {
                  from: location,
                },
              }}
            >
              <h2>{movie.title || movie.original_title}</h2>
              <img
                src={
                  movie.poster_path
                    ? `${ImageBaseUrl}${movie.poster_path}`
                    : noPosterAvailable
                }
                alt={movie.title}
              />
            </Link>
          </li>
        </ul>
      ))}
    </>
  );
};

export default MovieList;
