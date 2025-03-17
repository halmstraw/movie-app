import React from 'react';
import styled from 'styled-components';
import MainLayout from '../components/layout/MainLayout';
import MovieList from '../components/movie/MovieList';
import SearchBar from '../components/common/SearchBar';
import useMovieSearch from '../hooks/useMovieSearch';

const SearchContainer = styled.div`
  width: 100%;
`;

const SearchHeader = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme?.colors?.text || '#333333'};
`;

const SearchBarContainer = styled.div`
  max-width: 800px;
`;

const SearchResults = styled.div`
  margin-top: 2rem;
`;

const ResultsInfo = styled.div`
  margin-bottom: 1rem;
  font-size: 1rem;
  color: ${props => props.theme?.colors?.text || '#333333'};
`;

/**
 * SearchPage component
 */
const SearchPage = () => {
  const {
    query,
    results,
    loading,
    error,
    page,
    totalPages,
    totalResults,
    handleSearchChange,
    searchMovies,
    loadNextPage,
    loadPreviousPage
  } = useMovieSearch();
  
  const handleSubmit = (searchQuery) => {
    searchMovies(searchQuery);
  };
  
  return (
    <MainLayout>
      <SearchContainer>
        <SearchHeader>
          <Title>Search Movies</Title>
          <SearchBarContainer>
            <SearchBar
              placeholder="Search for movies by title, actor, director..."
              value={query}
              onChange={handleSearchChange}
              onSubmit={handleSubmit}
            />
          </SearchBarContainer>
        </SearchHeader>
        
        {query && (
          <ResultsInfo>
            {loading ? (
              'Searching...'
            ) : error ? (
              `Error: ${error}`
            ) : (
              `Found ${totalResults} results for "${query}"`
            )}
          </ResultsInfo>
        )}
        
        <SearchResults>
          <MovieList
            movies={results}
            loading={loading}
            currentPage={page}
            totalPages={totalPages}
            onNextPage={loadNextPage}
            onPreviousPage={loadPreviousPage}
            emptyMessage={
              query 
                ? `No results found for "${query}". Try a different search term.` 
                : "Enter a search term to find movies."
            }
          />
        </SearchResults>
      </SearchContainer>
    </MainLayout>
  );
};

export default SearchPage; 