import { Suspense, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { getMovieDetails } from "../../services/application";
import { getImage } from "../../services/application";
import css from "./MovieDetailsPage.module.css";

import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";

const getNavLinkClassNames = ({ isActive }) =>
  clsx(css.addItems, {
    [css.active]: isActive,
  });

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");

  useEffect(() => {
    async function fetchMoviesById() {
      try {
        setIsError(false);
        setIsLoading(true);

        const data = await getMovieDetails(movieId);
        setMovieData(data);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMoviesById();
  }, [movieId]);

  const vote = Math.floor(movieData.vote_average * 10);
  const year = movieData.release_date
    ? new Date(movieData.release_date).getFullYear()
    : "?";

  return (
    <>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {!isLoading &&
        !isError &&
        (movieData ? (
          <div>
            <Link to={backLinkRef.current}>
              <button className={css.link} type='submit'>
                Go back
              </button>
            </Link>
            <div className={css.mainMovieInfo}>
              <img
                className={css.movieImg}
                src={getImage(movieData.poster_path)}
                width='500'
                alt={movieData.title}
              />
              <div className={css.movieInfo}>
                <h1>
                  {movieData.title} ({year})
                </h1>
                <p className={css.movieScore}>User Score: {vote}% </p>
                <span>
                  <h2>Overview:</h2>
                  <p className={css.overview}>{movieData.overview}</p>
                </span>

                <span>
                  <h2>Genres:</h2>

                  {movieData.genres && (
                    <p className={css.genres}>
                      {movieData.genres.map((genre) => {
                        return <span key={genre.id}>{genre.name}</span>;
                      })}
                    </p>
                  )}
                </span>
              </div>
            </div>

            <div className={css.addInfo}>
              <ul className={clsx(css.addLinks, css.addItems)}>
                <div className={css.linkButtonContainer}>
                  <li>
                    <NavLink className={getNavLinkClassNames} to='cast'>
                      <button className={css.linkButton} type='submit'>
                        Cast
                      </button>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className={getNavLinkClassNames} to='reviews'>
                      <button className={css.linkButton} type='submit'>
                        Reviews
                      </button>
                    </NavLink>
                  </li>
                </div>
              </ul>
            </div>

            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </div>
        ) : (
          <p className={css.infoMessage}>Information is not found</p>
        ))}
    </>
  );
};

export default MovieDetailsPage;