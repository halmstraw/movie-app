import React, { useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../components/layout/MainLayout';
import MovieList from '../components/movie/MovieList';
import SearchBar from '../components/common/SearchBar';
import useMovieSearch from '../hooks/useMovieSearch';

const HomeContainer = styled.div`
  width: 100%;
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme?.colors?.text || '#333333'};
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: ${props => props.theme?.colors?.text || '#333333'};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 2rem;
`;

/**
 * HomePage component
 */
const HomePage = () => {
  const {
    query,
    results,
    loading,
    error,
    page,
    totalPages,
    handleSearchChange,
    loadNextPage,
    loadPreviousPage,
    loadPopularMovies
  } = useMovieSearch();
  
  useEffect(() => {
    // Load popular movies when the component mounts
    loadPopularMovies();
  }, [loadPopularMovies]);
  
  return (
    <MainLayout>
      <HomeContainer>
        <Hero>
          <Title>Discover Movies</Title>
          <Subtitle>
            Search for your favorite movies or browse popular titles
          </Subtitle>
          
          <SearchContainer>
            <SearchBar
              placeholder="Search for a movie..."
              value={query}
              onChange={handleSearchChange}
            />
          </SearchContainer>
        </Hero>
        
        <MovieList
          movies={results}
          loading={loading}
          currentPage={page}
          totalPages={totalPages}
          onNextPage={loadNextPage}
          onPreviousPage={loadPreviousPage}
          emptyMessage={error || "No movies found. Try a different search term."}
        />
      </HomeContainer>
    </MainLayout>
  );
};

export default HomePage; 