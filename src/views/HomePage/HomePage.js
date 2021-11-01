import { useState, useEffect, Suspense } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Route, Switch } from "react-router";
import fetchMoviesAPI from "../../services/movies-api";
import Loader from "../../Components/Loader/Loader";
import Button from "../../Components/Button/Button";
import noPosterAvailable from "../../images/no-poster-available.jpg";
import MovieList from "../../Components/MoviesList/MoviesList";

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
        <h1>Trending movies</h1>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route>
              {moviesListNotEmpty && <MovieList movies={movies} exact />}
            </Route>
          </Switch>
        </Suspense>
      </>
      <>{loadMoreMovies && <Button onLoadMore={loadMore} />}</>
    </>
  );
};

export default HomePage;
