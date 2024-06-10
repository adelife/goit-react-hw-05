import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
const API_KEY = "5ada1fbf8ecb6f10e35e77359a633f33";

// мой токен
// const TOKEN =
//   "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWRhMWZiZjhlY2I2ZjEwZTM1ZTc3MzU5YTYzM2YzMyIsInN1YiI6IjY2NWYwMDkxOTYxNThhM2M3ZjlkNjhhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R4PanBCRArtaWupVLI-y3xIZhlMcVJlAncVEI34cVEE"
const options = {
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWRhMWZiZjhlY2I2ZjEwZTM1ZTc3MzU5YTYzM2YzMyIsInN1YiI6IjY2NWYwMDkxOTYxNThhM2M3ZjlkNjhhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R4PanBCRArtaWupVLI-y3xIZhlMcVJlAncVEI34cVEE",
  },
};

// Trending movies

export const getTrendingMovies = async () => {
  const { data } = await axios.get(
    `/trending/movie/day?language=en-US&api_key=${API_KEY}`,
    options
  );
  return data;
};

// Search movie

export const getSearchMovie = async (query) => {
  const { data } = await axios.get(
    `/search/movie?query=${query}&include_adult=false&language=en-US&api_key=${API_KEY}`,
    options
  );
  return data;
};

// Movie details

export const getMovieDetails = async (movieId) => {
  const { data } = await axios.get(
    `/movie/${movieId}?language=en-US&api_key=${API_KEY}`,
    options
  );
  return data;
};

// Movie credits

export const getMovieCredits = async (movieId) => {
  const { data } = await axios.get(
    `/movie/${movieId}/credits?language=en-US&api_key=${API_KEY}`,
    options
  );
  const actingCast = data.cast.filter(
    (actor) => actor.known_for_department === "Acting"
  );
  return actingCast;
};

// Movie reviews

export const getMovieReviews = async (movieId) => {
  const { data } = await axios.get(
    `/movie/${movieId}/reviews?language=en-US&page=1&api_key=${API_KEY}`,
    options
  );
  return data;
};

export const getImage = (image) => {
  if (!image || image === null || image === "") {
    return "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=1800";
  }
  return `https://image.tmdb.org/t/p/w500${image}`;
};