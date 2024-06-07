import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSearchMovie } from "../../services/application";

import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import SearchForm from "../../components/SearchForm/SearchForm";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");

  useEffect(() => {
    if (searchQuery === null) return;

    async function fetchMoviesByQuery() {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await getSearchMovie(searchQuery);

        setMovies(data.results);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMoviesByQuery();
  }, [searchQuery]);

  const onSetSearchQuery = (searchTerm) => {
    if (searchTerm.trim().length === 0) {
      return;
    }
    setSearchParams({ query: searchTerm });
  };

  return (
    <div>
      <SearchForm
        searchQuery={searchQuery}
        onSetSearchQuery={onSetSearchQuery}
      />
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}

      {!isError && !isLoading && movies.length > 0 && (
        <div>
          <MovieList movies={movies} />
        </div>
      )}
    </div>
  );
};

export default MoviesPage;