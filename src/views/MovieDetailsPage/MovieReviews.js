import { useState, useEffect } from "react";
import { useParams } from "react-router";
import fetchMoviesAPI from "../../services/movies-api";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMoviesAPI
      .fetchMovieReview(movieId)
      .then(setReviews)
      .catch((err) => console.log(err.message));
  }, [movieId]);
  console.log(reviews);

  return (
    <div className={s.wrapper}>
      {reviews && (
        <ul className={s.list}>
          {reviews.map((review) => (
            <li key={review.id} className={s.item}>
              <p className={s.author}>{review.author}</p>
              <p className={s.text}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
      {reviews.length === 0 && (
        <p className={s.notext}>There are no reviews yet!</p>
      )}
    </div>
  );
};
export default MovieReviews;
