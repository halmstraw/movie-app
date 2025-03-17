import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { movieApi } from '../api';
import { useTheme } from '../context/ThemeContext';

// Styled components
const SearchPageContainer = styled.div`
  padding: 2rem;
  background-color: ${props => props.theme.colors.background};
  min-height: 100vh;
  transition: all 0.3s ease;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  font-size: 2rem;
`;

const SearchContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  max-width: 600px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.border || '#e0e0e0'};
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
  background-color: ${props => props.theme.colors.surface || '#f5f5f5'};
  color: ${props => props.theme.colors.text};
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SearchButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary}dd;
  }
`;

const ResultsInfo = styled.div`
  color: ${props => props.theme.colors.textSecondary || '#666'};
  margin-bottom: 1.5rem;
  font-size: 1rem;
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
`;

const MovieCard = styled.div`
  background-color: ${props => props.theme.colors.surface || '#f5f5f5'};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const MovieInfo = styled.div`
  padding: 1rem;
`;

const MovieTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const MovieYear = styled.p`
  color: ${props => props.theme.colors.textSecondary || '#666'};
  font-size: 0.9rem;
`;

const LoadingMessage = styled.div`
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  text-align: center;
  margin-top: 2rem;
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error || '#f44336'};
  font-size: 1.2rem;
  text-align: center;
  margin-top: 2rem;
  padding: 1rem;
  background-color: ${props => props.theme.colors.error || '#f44336'}22;
  border-radius: 4px;
`;

const NoResultsMessage = styled.div`
  color: ${props => props.theme.colors.textSecondary || '#666'};
  font-size: 1.2rem;
  text-align: center;
  margin-top: 2rem;
  padding: 2rem;
  background-color: ${props => props.theme.colors.surface || '#f5f5f5'};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.5rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.surface || '#f5f5f5'};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.border || '#e0e0e0'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.border || '#e0e0e0'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: ${props => props.theme.colors.primary};
  border: none;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('query') || '';
  const initialPage = parseInt(queryParams.get('page') || '1', 10);
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  
  const { theme } = useTheme();
  
  // Search for movies when query or page changes
  useEffect(() => {
    const searchMovies = async () => {
      if (!initialQuery.trim()) return;
      
      try {
        setLoading(true);
        const data = await movieApi.searchMovies(initialQuery, page);
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setTotalResults(data.total_results);
        setError(null);
      } catch (err) {
        setError('Failed to search for movies. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    searchMovies();
  }, [initialQuery, page]);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/journey-based/search?query=${encodeURIComponent(searchQuery)}`);
      // Reset page to 1 when performing a new search
      setPage(1);
    }
  };
  
  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
    // Update URL with new page
    const newQueryParams = new URLSearchParams(location.search);
    newQueryParams.set('page', newPage);
    navigate(`/journey-based/search?${newQueryParams.toString()}`);
    // Scroll to top
    window.scrollTo(0, 0);
  };
  
  // Extract year from release date
  const getYearFromDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).getFullYear();
  };
  
  // Generate pagination buttons
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    const buttons = [];
    const maxButtons = 5;
    let startPage = Math.max(1, page - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);
    
    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }
    
    // Previous button
    buttons.push(
      <PageButton 
        key="prev" 
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      >
        &laquo;
      </PageButton>
    );
    
    // First page
    if (startPage > 1) {
      buttons.push(
        <PageButton 
          key="1" 
          onClick={() => handlePageChange(1)}
          active={page === 1}
        >
          1
        </PageButton>
      );
      
      if (startPage > 2) {
        buttons.push(<span key="ellipsis1">...</span>);
      }
    }
    
    // Page buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <PageButton 
          key={i} 
          onClick={() => handlePageChange(i)}
          active={page === i}
        >
          {i}
        </PageButton>
      );
    }
    
    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<span key="ellipsis2">...</span>);
      }
      
      buttons.push(
        <PageButton 
          key={totalPages} 
          onClick={() => handlePageChange(totalPages)}
          active={page === totalPages}
        >
          {totalPages}
        </PageButton>
      );
    }
    
    // Next button
    buttons.push(
      <PageButton 
        key="next" 
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
      >
        &raquo;
      </PageButton>
    );
    
    return <PaginationContainer>{buttons}</PaginationContainer>;
  };
  
  return (
    <SearchPageContainer>
      <BackButton onClick={() => navigate('/journey-based')}>
        &larr; Back to Home
      </BackButton>
      
      <Title>Search Movies</Title>
      
      <form onSubmit={handleSearchSubmit}>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label="Search for movies"
          />
          <SearchButton type="submit">Search</SearchButton>
        </SearchContainer>
      </form>
      
      {initialQuery && (
        <ResultsInfo>
          {loading ? 'Searching...' : `Found ${totalResults} results for "${initialQuery}"`}
        </ResultsInfo>
      )}
      
      {loading ? (
        <LoadingMessage>Searching for movies...</LoadingMessage>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : movies.length === 0 ? (
        <NoResultsMessage>
          {initialQuery ? `No results found for "${initialQuery}"` : 'Enter a search term to find movies'}
        </NoResultsMessage>
      ) : (
        <>
          <MoviesGrid>
            {movies.map(movie => (
              <MovieCard key={movie.id} id={`movie-card-${movie.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <Link to={`/journey-based/movie/${movie.id}`}>
                  <MoviePoster
                    src={movieApi.getImageUrl(movie.poster_path)}
                    alt={movie.title}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                    }}
                  />
                  <MovieInfo>
                    <MovieTitle>{movie.title}</MovieTitle>
                    <MovieYear>{getYearFromDate(movie.release_date)}</MovieYear>
                  </MovieInfo>
                </Link>
              </MovieCard>
            ))}
          </MoviesGrid>
          
          {renderPagination()}
        </>
      )}
    </SearchPageContainer>
  );
};

export default SearchPage; 