import { useState, useEffect } from "react";

import fetchMoviesAPI from "../../services/movies-api";
import Button from "../../Components/Button/Button";
import MoviesList from "../../Components/MoviesList/MoviesList";
import s from "./HomePage.module.css";
import PropTypes from "prop-types";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchTrendingMoviesHomePage = async () => {
      try {
        const results = await fetchMoviesAPI.fetchTrendingMovies(page);
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
    fetchTrendingMoviesHomePage();
  }, [page]);

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

  const loadMoreMovies = movies.length > 0 && movies.length >= 20;
  const moviesListNotEmpty = movies.length !== 0;

  return (
    <>
      <>
        <h1 className={s.header}>Trending movies</h1>
        <>{moviesListNotEmpty && <MoviesList movies={movies} />}</>
      </>
      <>{loadMoreMovies && <Button onLoadMore={loadMore} />}</>
    </>
  );
};

HomePage.propTypes = {
  onLoadMore: PropTypes.func,
};

export default HomePage;
