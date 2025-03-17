// src/api/config.js
// Configuration for movie API (using TMDB as an example)
export const API_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.REACT_APP_TMDB_API_KEY,
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/',
  POSTER_SIZE: 'w500',
  BACKDROP_SIZE: 'original',
};

// ---------------------------------------------------

// src/api/movieApi.js
import axios from 'axios';
import { API_CONFIG } from './config';

// Create an axios instance for movie API requests
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  params: {
    api_key: API_CONFIG.API_KEY,
  },
});

export const movieApi = {
  // Search for movies by title
  searchMovies: async (query, page = 1) => {
    try {
      const response = await apiClient.get('/search/movie', {
        params: {
          query,
          page,
          include_adult: false,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  // Get trending movies
  getTrending: async (timeWindow = 'day', page = 1) => {
    try {
      const response = await apiClient.get(`/trending/movie/${timeWindow}`, {
        params: { page },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw error;
    }
  },

  // Get movie details by ID
  getMovieDetails: async (movieId) => {
    try {
      const response = await apiClient.get(`/movie/${movieId}`, {
        params: {
          append_to_response: 'credits,videos,recommendations',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching movie details for ID ${movieId}:`, error);
      throw error;
    }
  },

  // Search for TV shows
  searchTvShows: async (query, page = 1) => {
    try {
      const response = await apiClient.get('/search/tv', {
        params: {
          query,
          page,
          include_adult: false,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching TV shows:', error);
      throw error;
    }
  },

  // Get TV show details
  getTvShowDetails: async (tvId) => {
    try {
      const response = await apiClient.get(`/tv/${tvId}`, {
        params: {
          append_to_response: 'credits,videos,recommendations',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching TV show details for ID ${tvId}:`, error);
      throw error;
    }
  },
};

// ---------------------------------------------------

// src/api/index.js
// Export all API services for easy imports
export { movieApi } from './movieApi';
export { API_CONFIG } from './config';
