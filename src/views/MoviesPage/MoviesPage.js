import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fetchMoviesAPI from "../../services/movies-api";
import PropTypes from "prop-types";
import s from "./MoviesPage.module.css";
import SearchBar from "../../Components/SearchBar/SearchBar";
import noPosterAvailable from "../../images/no-poster-available.jpg";
import Button from "../../Components/Button/Button";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const ImageBaseUrl = "https://image.tmdb.org/t/p/w342";
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
