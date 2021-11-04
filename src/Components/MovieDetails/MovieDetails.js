import s from "./MovieDetails.module.css";
import noPosterAvailable from "../../images/no-poster-available.jpg";

const MovieDetails = ({ movie }) => {
  const movieCardBaseUrl = "http://image.tmdb.org/t/p/w154";

  return (
    <div className={s.wrapper}>
      <img
        src={
          movie.poster_path
            ? `${movieCardBaseUrl}${movie.poster_path}`
            : noPosterAvailable
        }
        alt={movie.title}
        className={s.image}
      />

      <div>
        <h2 className={s.title}>{movie.original_title || movie.title}</h2>
        <span className={s.date}>({movie.release_date})</span>
        <p className={s.text}>User score: {movie.vote_average * 10}%</p>
        <h3 className={s.subTitle}>Genres</h3>
        <p className={s.text}>
          {movie.genres.map((genre) => genre.name).join(", ")}
        </p>
        <h3 className={s.subTitle}>Overview</h3>
        <p className={s.text}>{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
