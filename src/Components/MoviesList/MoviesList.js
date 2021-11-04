import noPosterAvailable from "../../images/no-poster-available.jpg";
import s from "./MoviesList.module.css";
import { Link, useLocation } from "react-router-dom";

const MoviesList = ({ movies }) => {
  const ImageBaseUrl = "https://image.tmdb.org/t/p/w342";
  const moviesListNotEmpty = movies.length !== 0;
  const location = useLocation();
  return (
    <ul className={s.moviesGallery}>
      {moviesListNotEmpty &&
        movies.map((movie) => (
          <li key={movie.id} className={s.moviesGalleryItem}>
            <Link
              to={{
                pathname: `/movies/${movie.id}`,
                state: { from: location },
              }}
            >
              <h2 className={s.Title}>{movie.name || movie.original_title}</h2>
              <img
                src={
                  movie.poster_path
                    ? `${ImageBaseUrl}${movie.poster_path}`
                    : noPosterAvailable
                }
                alt={movie.title}
                className={s.moviesGalleryItemImage}
              />
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default MoviesList;
