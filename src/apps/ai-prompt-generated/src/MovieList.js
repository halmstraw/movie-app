import React from 'react';
import styled from 'styled-components';
import MovieCard from './MovieCard';
import Loading from '../common/Loading';

const ListContainer = styled.div`
  margin: 2rem 0;
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: ${props => props.theme?.colors?.text || '#333333'};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 1rem;
`;

const PageButton = styled.button`
  background-color: ${props => props.theme?.colors?.primary || '#0070f3'};
  color: white;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 500;
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    background-color: #0062d3;
  }
`;

const PageInfo = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme?.colors?.text || '#333333'};
`;

/**
 * MovieList component
 * @param {object} props - Component props
 * @param {Array} props.movies - List of movies to display
 * @param {boolean} props.loading - Whether the list is loading
 * @param {string} props.emptyMessage - Message to display when there are no movies
 * @param {number} props.currentPage - Current page number
 * @param {number} props.totalPages - Total number of pages
 * @param {function} props.onPreviousPage - Function to call when previous page button is clicked
 * @param {function} props.onNextPage - Function to call when next page button is clicked
 */
const MovieList = ({
  movies = [],
  loading = false,
  emptyMessage = 'No movies found',
  currentPage = 1,
  totalPages = 1,
  onPreviousPage,
  onNextPage
}) => {
  if (loading) {
    return <Loading text="Loading movies..." />;
  }
  
  if (!movies.length) {
    return (
      <EmptyState>
        <p>{emptyMessage}</p>
      </EmptyState>
    );
  }
  
  return (
    <ListContainer>
      <MoviesGrid>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </MoviesGrid>
      
      {totalPages > 1 && (
        <Pagination>
          <PageButton 
            onClick={onPreviousPage} 
            disabled={currentPage <= 1}
          >
            Previous
          </PageButton>
          
          <PageInfo>
            Page {currentPage} of {totalPages}
          </PageInfo>
          
          <PageButton 
            onClick={onNextPage} 
            disabled={currentPage >= totalPages}
          >
            Next
          </PageButton>
        </Pagination>
      )}
    </ListContainer>
  );
};

export default MovieList; 