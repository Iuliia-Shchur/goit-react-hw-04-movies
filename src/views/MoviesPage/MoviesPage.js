import { useState, useEffect } from "react";

import fetchMoviesAPI from "../../services/movies-api";
import PropTypes from "prop-types";
import Loader from "../../Components/Loader/Loader";
import SearchBar from "../../Components/SearchBar/SearchBar";

import Button from "../../Components/Button/Button";

import { Switch, Route, useParams } from "react-router-dom";
import { Suspense, lazy } from "react";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { path } = useParams();

  const MovieDetailsPage = lazy(() =>
    import("../MovieDetailsPage/MovieDetailsPage")
  );
  const MovieList = lazy(() =>
    import("../../Components/MoviesList/MoviesList")
  );

  const handleFormSubmit = (query) => {
    setQuery(query);
    setMovies([]);
  };

  useEffect(() => {
    if (!query) return;
    setLoading(true);

    const fetchSearchMovies = async () => {
      try {
        const results = await fetchMoviesAPI.fetchMovies(query, page);
        setMovies((movies) => [...movies, ...results]);
        if (page !== 1) {
          scrollWindow();
        }
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchMovies();
  }, [query, page]);

  const loadMore = () => {
    setLoading(!loading);
    setPage((prev) => prev + 1);
    setLoading(loading);
  };

  const scrollWindow = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const moviesListNotEmpty = movies.length !== 0;
  const loadMoreMovies = movies.length > 0 && movies.length >= 20;

  return (
    <>
      <>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path={`${path}/:movieId`}>
              <MovieDetailsPage />
            </Route>
            <Route exact path="/movies">
              <SearchBar onSubmit={handleFormSubmit} />
              {moviesListNotEmpty && <MovieList movies={movies} />}
            </Route>
          </Switch>
        </Suspense>
        {loadMoreMovies && <Button onLoadMore={loadMore} />}

        {/* <SearchBar onSubmit={handleFormSubmit} />
        <>{moviesListNotEmpty && <MoviesList movies={movies} />}</>
        <>{loadMoreMovies && <Button onLoadMore={loadMore} />}</> */}
      </>
    </>
  );
};

MoviesPage.propTypes = {
  onSubmit: PropTypes.func,
  onLoadMore: PropTypes.func,
};

export default MoviesPage;
