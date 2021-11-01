import { useState, useEffect } from "react";
import { useParams } from "react-router";
import fetchMoviesAPI from "../../services/movies-api";

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
    <div>
      {reviews && (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>{review.author}</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
      {reviews.length === 0 && <p>There are no review yet!</p>}
    </div>
  );
};
export default MovieReviews;
