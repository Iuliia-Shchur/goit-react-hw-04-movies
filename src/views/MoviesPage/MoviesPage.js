import { useState, useEffect, lazy, Suspense } from "react";
import {
  Route,
  useRouteMatch,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import fetchMoviesAPI from "../../services/movies-api";
import { toast } from "react-toastify";
import s from "./MoviesPage.module.css";
import Loader from "../../Components/Loader/Loader";

const MovieList = lazy(() => import("../../Components/MoviesList/MoviesList"));
const MovieDetailsPage = lazy(() =>
  import("../MovieDetailsPage/MovieDetailsPage")
);

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const handleFormSubmit = (query) => {
    setQuery(query);
    setMovies([]);
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      return toast.error("Enter your query!");
    }
    history.push({ ...location, search: `query=${query}` });
    handleFormSubmit(query);
    setQuery("");
  };

  useEffect(() => {
    if (!query) return;
    fetchMoviesAPI
      .fetchMovies(query)
      .then((movies) => {
        setMovies((prev) => [...prev, ...movies]);
        console.log(movies);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [query]);

  const moviesListNotEmpty = movies.length !== 0;

  return (
    <>
      <div>
        <header className={s.Searchbar}>
          <form className={s.SearchForm} onSubmit={handleSubmit}>
            <button type="submit" className={s.SearchFormButton}>
              <span className={s.SearchFormButtonLabel}>Search</span>
            </button>

            <input
              name="query"
              value={query}
              onChange={handleQueryChange}
              className={s.SearchFormInput}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search movies"
            />
          </form>
        </header>
      </div>
      <div>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path="/movies">
              {moviesListNotEmpty && <MovieList movies={movies} />}
            </Route>
            <Route path={`${url}/:movieId`}>
              <MovieDetailsPage />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </>
  );
};

export default MoviesPage;
