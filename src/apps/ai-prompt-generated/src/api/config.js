// API Configuration for TMDB
const API_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.REACT_APP_TMDB_API_KEY,
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/',
  POSTER_SIZES: {
    SMALL: 'w185',
    MEDIUM: 'w342',
    LARGE: 'w500',
    ORIGINAL: 'original'
  },
  BACKDROP_SIZES: {
    SMALL: 'w300',
    MEDIUM: 'w780',
    LARGE: 'w1280',
    ORIGINAL: 'original'
  }
};

export default API_CONFIG; 