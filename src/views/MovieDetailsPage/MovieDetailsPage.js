import { useState, useEffect, lazy, Suspense } from "react";
import {
  useParams,
  useRouteMatch,
  useHistory,
  useLocation,
} from "react-router";
import fetchMoviesAPI from "../../services/movies-api";
import { NavLink, Route, Switch } from "react-router-dom";
import MovieDetails from "../../Components/MovieDetails/MovieDetails";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import s from "./MovieDetailsPage.module.css";

const Cast = lazy(() => import("../../Components/Cast/Cast"));
const MovieReviews = lazy(() =>
  import("../../Components/MovieReviews/MovieReviews")
);

const MovieDetailsPage = () => {
  const history = useHistory();
  const location = useLocation();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { url } = useRouteMatch();
  const [query, setQuery] = useState("");
  console.log(location);
  useEffect(() => {
    fetchMoviesAPI
      .fetchMovieDetails(movieId)
      .then(setMovie)
      .catch((err) => console.log(err.message));
  }, [movieId]);

  const handleGoBackButton = () => {
    history.push(location?.state?.from ?? "/");
    console.log(location);
  };

  return (
    <>
      <>
        <h1 className={s.header}>Movie details</h1>
        <GoBackButton handleGoBackButton={handleGoBackButton} />
      </>
      {movie && <MovieDetails movie={movie} />}
      <>
        <h2 className={s.header}>Additional information</h2>
        <div className={s.linkWrapper}>
          <ul>
            <li>
              <NavLink
                to={{
                  pathname: `/movies/${movieId}/cast`,
                  state: {
                    from: history.location.state.from,
                    label: "back to movies from cast",
                  },
                }}
                className={s.link}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: `/movies/${movieId}/reviews`,
                  state: {
                    from: history.location.state.from,
                    label: "back to movies from cast",
                  },
                }}
                className={s.link}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>
        <hr />
        <Suspense>
          <Switch>
            <Route path="/movies/:movieId/cast">
              <Cast />
            </Route>
            <Route path="/movies/:movieId/reviews">
              <MovieReviews />
            </Route>
          </Switch>
        </Suspense>
      </>
    </>
  );
};

export default MovieDetailsPage;
