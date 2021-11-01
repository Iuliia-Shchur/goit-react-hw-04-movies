import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link, Route } from "react-router-dom";
import fetchMoviesAPI from "../../services/movies-api";
import noCast from "../../images/no-cast.jpg";

const Cast = ({ movie }) => {
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
      {casts && (
        <>
          <ul>
            {casts.map((cast) => (
              <li key={cast.id}>
                <img
                  src={
                    cast.profile_path
                      ? `${castImageBaseUrl}${cast.profile_path}`
                      : noCast
                  }
                  alt={cast.name}
                />
                <p>{cast.original_name || cast.name}</p>
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
