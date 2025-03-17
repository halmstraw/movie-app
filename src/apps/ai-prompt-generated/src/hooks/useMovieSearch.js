import { useState, useEffect, useCallback } from 'react';
import { movieApi } from '../api';

/**
 * Custom hook for searching movies
 * @param {string} initialQuery - Initial search query
 * @returns {object} Search state and functions
 */
const useMovieSearch = (initialQuery = '') => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  // Search for movies
  const searchMovies = useCallback(async (searchQuery = query, pageNum = 1) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setTotalPages(0);
      setTotalResults(0);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await movieApi.searchMovies(searchQuery, pageNum);
      setResults(data.results);
      setTotalPages(data.total_pages);
      setTotalResults(data.total_results);
      setPage(pageNum);
    } catch (err) {
      setError(err.message || 'An error occurred while searching for movies');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  // Load popular movies when no search query is provided
  const loadPopularMovies = useCallback(async (pageNum = 1) => {
    setLoading(true);
    setError(null);

    try {
      const data = await movieApi.getPopularMovies(pageNum);
      setResults(data.results);
      setTotalPages(data.total_pages);
      setTotalResults(data.total_results);
      setPage(pageNum);
    } catch (err) {
      setError(err.message || 'An error occurred while loading popular movies');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load next page
  const loadNextPage = useCallback(() => {
    if (page < totalPages) {
      if (query.trim()) {
        searchMovies(query, page + 1);
      } else {
        loadPopularMovies(page + 1);
      }
    }
  }, [page, totalPages, query, searchMovies, loadPopularMovies]);

  // Load previous page
  const loadPreviousPage = useCallback(() => {
    if (page > 1) {
      if (query.trim()) {
        searchMovies(query, page - 1);
      } else {
        loadPopularMovies(page - 1);
      }
    }
  }, [page, query, searchMovies, loadPopularMovies]);

  // Handle search query change
  const handleSearchChange = useCallback((newQuery) => {
    setQuery(newQuery);
  }, []);

  // Perform search when query changes
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (query.trim()) {
        searchMovies(query, 1);
      } else {
        loadPopularMovies(1);
      }
    }, 500); // Debounce search

    return () => clearTimeout(delaySearch);
  }, [query, searchMovies, loadPopularMovies]);

  return {
    query,
    results,
    loading,
    error,
    page,
    totalPages,
    totalResults,
    searchMovies,
    loadPopularMovies,
    loadNextPage,
    loadPreviousPage,
    handleSearchChange,
  };
};

export default useMovieSearch;
