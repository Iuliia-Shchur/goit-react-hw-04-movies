import { useState, useEffect, Suspense } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Route, Switch, useParams } from "react-router";
import fetchMoviesAPI from "../../services/movies-api";
import Loader from "../../Components/Loader/Loader";
import Button from "../../Components/Button/Button";
import noPosterAvailable from "../../images/no-poster-available.jpg";
import MovieList from "../../Components/MoviesList/MoviesList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { url } = useParams();
  const ImageBaseUrl = "https://image.tmdb.org/t/p/w500";

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

  console.log(movies);

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
        <>
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <Link to={`movies/${movie.id}`}>
                  <h2>{movie.title || movie.original_title}</h2>
                  <img
                    src={
                      movie.poster_path
                        ? `${ImageBaseUrl}${movie.poster_path}`
                        : noPosterAvailable
                    }
                    alt={movie.title}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </>

        {/* {moviesListNotEmpty && <MovieList movies={movies} exact />} */}
      </>
      <>{loadMoreMovies && <Button onLoadMore={loadMore} />}</>
    </>
  );
};

export default HomePage;
