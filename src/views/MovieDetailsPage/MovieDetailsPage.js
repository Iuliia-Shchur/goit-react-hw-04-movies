import { useState, useEffect, lazy, Suspense } from "react";
import { useParams, useRouteMatch } from "react-router";
import fetchMoviesAPI from "../../services/movies-api";
import { NavLink, Route, Switch } from "react-router-dom";
import noPosterAvailable from "../../images/no-poster-available.jpg";
import Loader from "../../Components/Loader/Loader";

const Cast = lazy(() => import("./Cast"));
const MovieReviews = lazy(() => import("./MovieReviews"));

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const movieCardBaseUrl = "http://image.tmdb.org/t/p/w154";
  const { url, path } = useRouteMatch();

  useEffect(() => {
    fetchMoviesAPI
      .fetchMovieDetails(movieId)
      .then(setMovie)
      .catch((err) => console.log(err.message));
  }, [movieId]);

  return (
    <>
      <h1>Movie details</h1>
      {movie && (
        <>
          <div>
            <img
              src={
                movie.poster_path
                  ? `${movieCardBaseUrl}${movie.poster_path}`
                  : noPosterAvailable
              }
              alt={movie.title}
            />
          </div>
          <div>
            <h2>{movie.original_title || movie.title}</h2>
            <span>({movie.release_date})</span>
            <p>User score: {movie.vote_average * 10}%</p>
            <h3>Genres</h3>
            <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
            <p>Overview</p>
            <p>{movie.overview}</p>
          </div>

          <h2>Additional information</h2>
          <ul>
            <li>
              <NavLink to={`${url}/cast`}>Cast</NavLink>
            </li>
            <li>
              <NavLink to={`${url}/reviews`}>Reviews</NavLink>
            </li>
          </ul>
          {/* <Suspense fallback={<Loader />}>
            <Switch>
              <Route exact path={`${url}/cast`}>
                {movie && <Cast />}
              </Route>

              <Route exact path={`${url}/reviews`}>
                {movie && <MovieReviews />}
              </Route>
            </Switch>
          </Suspense> */}
        </>
      )}

      <hr />

      {/* <Route path={"/movies/:movieId/cast"}>
          {movie && <Cast />}
        </Route> */}
    </>
  );
};

export default MovieDetailsPage;
