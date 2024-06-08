import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../services/application";
import css from "./MovieCast.module.css";

import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import defaultImg from "./image-not-found.png";

const MovieCast = () => {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchMovieCast() {
      try {
        setIsError(false);
        setIsLoading(true);

        const data = await getMovieCredits(movieId);

        setCasts(data);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieCast();
  }, [movieId]);

  return (
    <div className={css.mainCast}>
      {isLoading && <Loader />}
      {isError && <ErrorMessage message={isError} />}
      {!isLoading && !isError && casts.length === 0 && <ErrorMessage />}

      {casts.length > 0 && (
        <ul className={css.castList}>
          {casts.map(({ id, profile_path, name, character }) => (
            <li key={id} className={css.castsItem}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w500${profile_path}`
                    : defaultImg
                }
                width={250}
                alt={name}
              />
              <div className={css.mainCast}>
                <p className={css.actorName}>{name}</p>
                <p className={css.characterName}>{character}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;