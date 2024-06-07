import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies = [] }) => {
  const location = useLocation();

  return (
    <>
      {movies.length > 0 ? (
        <ul className={css.container}>
          {movies.map((movie) => (
            <li key={movie.id} className={css.movieId}>
              <Link
                className={css.movieDetails}
                state={location}
                to={`/movies/${movie.id}`}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.movieInfo}>Information is not available...</p>
      )}
    </>
  );
};

export default MovieList;