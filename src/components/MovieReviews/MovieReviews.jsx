import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getImage } from "../../services/application";
import { getMovieReviews } from "../../services/application";
import css from "./MovieReviews.module.css";

import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchMovieReviews() {
      try {
        setIsError(false);
        setIsLoading(true);

        const data = await getMovieReviews(movieId);

        setMovieReviews(data.results);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div>
      <div className={css.reviewsContainer}>
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {!isLoading &&
          !isError &&
          (movieReviews.length ? (
            <ul className={css.reviewsList}>
              {movieReviews.map((review) => (
                <li key={review.id}>
                  <div>
                    <img
                      className={css.reviewsImages}
                      src={getImage(review.author_details.avatar_path)}
                      width='180'
                      alt={review.author}
                    />
                    <h3>{review.author}</h3>
                  </div>
                  <p className={css.reviewsText}>{review.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className={css.infoMessage}>
              We don`t have any reviews for this movie.
            </p>
          ))}
      </div>
    </div>
  );
};

export default MovieReviews;