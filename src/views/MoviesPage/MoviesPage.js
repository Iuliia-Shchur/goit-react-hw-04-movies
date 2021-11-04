import { useState, useEffect } from "react";

import fetchMoviesAPI from "../../services/movies-api";
import PropTypes from "prop-types";

import SearchBar from "../../Components/SearchBar/SearchBar";

import Button from "../../Components/Button/Button";
import MoviesList from "../../Components/MoviesList/MoviesList";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

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
        <SearchBar onSubmit={handleFormSubmit} />
        <>{moviesListNotEmpty && <MoviesList movies={movies} />}</>
        <>{loadMoreMovies && <Button onLoadMore={loadMore} />}</>
      </>
    </>
  );
};

MoviesPage.propTypes = {
  onSubmit: PropTypes.func,
  onLoadMore: PropTypes.func,
};

export default MoviesPage;
