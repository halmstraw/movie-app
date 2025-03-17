import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { movieApi } from '../api';
import { useTheme } from '../context/ThemeContext';

// Styled components
const HomeContainer = styled.div`
  padding: 2rem;
  background-color: ${props => props.theme.colors.background};
  min-height: 100vh;
  transition: all 0.3s ease;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  font-size: 2rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary}22;
  }
`;

const ThemeToggle = styled.button`
  background-color: transparent;
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border || '#e0e0e0'};
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.surface || '#f5f5f5'};
  }
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
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.theme.colors.primary}dd;
  }
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
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

const BackToMainButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const HomePage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch popular movies on component mount
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setLoading(true);
        const data = await movieApi.getPopularMovies();
        setMovies(data.results);
        setError(null);
      } catch (err) {
        setError('Failed to load popular movies. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPopularMovies();
  }, []);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/journey-based/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  // Extract year from release date
  const getYearFromDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).getFullYear();
  };
  
  return (
    <HomeContainer>
      <BackToMainButton to="/">
        &larr; Back to Implementations
      </BackToMainButton>
      
      <Header>
        <Title>Journey-Based Movie App</Title>
        <NavLinks>
          <NavLink to="/journey-based/favorites">My Favorites</NavLink>
          <ThemeToggle onClick={toggleTheme} id="theme-toggle">
            {theme.name === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </ThemeToggle>
        </NavLinks>
      </Header>
      
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
      
      <SectionTitle>Popular Movies</SectionTitle>
      
      {loading ? (
        <LoadingMessage>Loading popular movies...</LoadingMessage>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
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
      )}
    </HomeContainer>
  );
};

export default HomePage; 