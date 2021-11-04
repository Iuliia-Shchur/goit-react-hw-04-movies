import { useState, useEffect } from "react";
import { useParams } from "react-router";
import fetchMoviesAPI from "../../services/movies-api";
import noCast from "../../images/no-cast.jpg";
import s from "./Cast.module.css";

const Cast = () => {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);
  const castImageBaseUrl = "https://image.tmdb.org/t/p/w45";

  useEffect(() => {
    fetchMoviesAPI
      .fetchMovieCast(movieId)
      .then(setCasts)
      .catch((err) => console.log(err.message));
  }, [movieId]);

  return (
    <div>
      <h2 className={s.title}>Actors</h2>
      {casts && (
        <>
          <ul className={s.moviesGallery}>
            {casts.map((cast) => (
              <li key={cast.id} className={s.moviesGalleryItem}>
                <img
                  src={
                    cast.profile_path
                      ? `${castImageBaseUrl}${cast.profile_path}`
                      : noCast
                  }
                  alt={cast.name}
                  className={s.moviesGalleryItemImage}
                />
                <p className={s.text}>{cast.original_name || cast.name}</p>
              </li>
            ))}
          </ul>
        </>
      )}
      {casts.length === 0 && <p>There is no information about the cast.</p>}
    </div>
  );
};

export default Cast;
