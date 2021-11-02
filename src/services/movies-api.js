import axios from "axios";

const KEY = "10a2b806dbebe4f10465e32dbdc55d37";
axios.defaults.baseURL = "https://api.themoviedb.org";

const fetchTrendingMovies = async (page = 1) => {
  try {
    const {
      data: { results },
    } = await axios.get(`/3/trending/all/day?api_key=${KEY}&page=${page}`);
    return results;
  } catch (err) {
    console.log(err.message);
  }
};

const fetchMovies = async (query, page = 1) => {
  try {
    const { data } = await axios.get(
      `/3/search/movie?api_key=${KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`
    );

    return data.results;
  } catch (error) {
    console.log(error.message);
  }
};

const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(
      `/3/movie/${movieId}?api_key=${KEY}&language=en-US`
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

const fetchMovieCast = async (movieId) => {
  try {
    const result = await axios.get(
      `/3/movie/${movieId}/credits?api_key=${KEY}&language=en-US`
    );
    return result.data.cast;
  } catch (err) {
    console.log(err.message);
  }
};

const fetchMovieReview = async (movieId) => {
  try {
    const { data } = await axios.get(
      `/3/movie/${movieId}/reviews?api_key=${KEY}&language=en-US`
    );
    return data.results;
  } catch (error) {
    console.log(error.message);
  }
};

const fetchMoviesAPI = {
  fetchMovies,
  fetchMovieDetails,
  fetchTrendingMovies,
  fetchMovieCast,
  fetchMovieReview,
};

export default fetchMoviesAPI;
