import axios from 'axios';
import API_CONFIG from './config';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  params: {
    api_key: API_CONFIG.API_KEY,
    language: 'en-US'
  }
});

// Movie API service functions
const movieApi = {
  // Search for movies by query
  searchMovies: async (query, page = 1) => {
    try {
      const response = await api.get('/search/movie', {
        params: { query, page }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  // Get popular movies
  getPopularMovies: async (page = 1) => {
    try {
      const response = await api.get('/movie/popular', {
        params: { page }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  },

  // Get movie details by ID
  getMovieDetails: async (movieId) => {
    try {
      const response = await api.get(`/movie/${movieId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching movie details for ID ${movieId}:`, error);
      throw error;
    }
  },

  // Get movie recommendations
  getMovieRecommendations: async (movieId, page = 1) => {
    try {
      const response = await api.get(`/movie/${movieId}/recommendations`, {
        params: { page }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching recommendations for movie ID ${movieId}:`, error);
      throw error;
    }
  },

  // Get image URL
  getImageUrl: (path, size = API_CONFIG.POSTER_SIZES.MEDIUM) => {
    if (!path) return null;
    return `${API_CONFIG.IMAGE_BASE_URL}${size}${path}`;
  }
};

export default movieApi; 