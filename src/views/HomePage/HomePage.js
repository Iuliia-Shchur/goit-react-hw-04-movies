import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fetchMoviesAPI from "../../services/movies-api";
import Button from "../../Components/Button/Button";
import noPosterAvailable from "../../images/no-poster-available.jpg";
import s from "./HomePage.module.css";
import PropTypes from "prop-types";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const ImageBaseUrl = "https://image.tmdb.org/t/p/w342";

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
        <h1 className={s.header}>Trending movies</h1>
        <>
          <ul className={s.moviesGallery}>
            {moviesListNotEmpty &&
              movies.map((movie) => (
                <li key={movie.id} className={s.moviesGalleryItem}>
                  <Link to={`movies/${movie.id}`}>
                    <h2 className={s.Title}>
                      {movie.name || movie.original_title}
                    </h2>
                    <img
                      src={
                        movie.poster_path
                          ? `${ImageBaseUrl}${movie.poster_path}`
                          : noPosterAvailable
                      }
                      alt={movie.title}
                      className={s.moviesGalleryItemImage}
                    />
                  </Link>
                </li>
              ))}
          </ul>
        </>
      </>
      <>{loadMoreMovies && <Button onLoadMore={loadMore} />}</>
    </>
  );
};

HomePage.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default HomePage;
