import { useState, useEffect, lazy } from "react";
import { useParams, useRouteMatch } from "react-router";
import fetchMoviesAPI from "../../services/movies-api";
import { NavLink, Route, Switch } from "react-router-dom";
import noPosterAvailable from "../../images/no-poster-available.jpg";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import s from "./MovieDetailsPage.module.css";

const Cast = lazy(() => import("./Cast"));
const MovieReviews = lazy(() => import("./MovieReviews"));

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const movieCardBaseUrl = "http://image.tmdb.org/t/p/w154";
  const { url } = useRouteMatch();

  useEffect(() => {
    fetchMoviesAPI
      .fetchMovieDetails(movieId)
      .then(setMovie)
      .catch((err) => console.log(err.message));
  }, [movieId]);

  return (
    <>
      <h1 className={s.header}>Movie details</h1>
      <GoBackButton />
      {movie && (
        <>
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
        </>
      )}

      <h2 className={s.header}>Additional information</h2>
      <div className={s.linkWrapper}>
        <ul>
          <li>
            <NavLink to={`${url}/cast`} className={s.link}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to={`${url}/reviews`} className={s.link}>
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <hr />
      <Switch>
        <Route path="/movies/:movieId/cast">
          <Cast />
        </Route>
        <Route path="/movies/:movieId/reviews">
          <MovieReviews />
        </Route>
      </Switch>
    </>
  );
};

export default MovieDetailsPage;
