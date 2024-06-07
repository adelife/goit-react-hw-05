import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../services/application";
import css from "./HomePage.module.css";

import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsError(false);
        setIsLoading(true);

        const data = await getTrendingMovies();

        setMovies(data.results);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className={css.movieHome}>
      <h1>Trending today</h1>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {!isLoading &&
        !isError &&
        (movies.length ? (
          <MovieList movies={movies} />
        ) : (
          <p className={css.infoMessage}>Movies not found!</p>
        ))}
    </div>
  );
};

export default HomePage;