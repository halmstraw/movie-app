import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { movieApi } from '../api';
import { useFavorites } from '../context/FavoritesContext';

// Styled components
const FavoritesContainer = styled.div`
  padding: 2rem;
  background-color: ${props => props.theme.colors.background};
  min-height: 100vh;
  transition: all 0.3s ease;
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

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  font-size: 2rem;
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
  position: relative;
  
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

const RemoveButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: ${props => props.theme.colors.error || '#f44336'};
  color: white;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease;
  
  ${MovieCard}:hover & {
    opacity: 1;
  }
  
  &:hover {
    background-color: ${props => props.theme.colors.error || '#f44336'}dd;
  }
`;

const EmptyMessage = styled.div`
  color: ${props => props.theme.colors.textSecondary || '#666'};
  font-size: 1.2rem;
  text-align: center;
  margin-top: 3rem;
  padding: 2rem;
  background-color: ${props => props.theme.colors.surface || '#f5f5f5'};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ExploreButton = styled(Link)`
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 1rem;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.theme.colors.primary}dd;
  }
`;

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { favorites, removeFavorite } = useFavorites();
  
  // Extract year from release date
  const getYearFromDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).getFullYear();
  };
  
  // Handle remove from favorites
  const handleRemove = (e, movieId) => {
    e.preventDefault();
    e.stopPropagation();
    removeFavorite(movieId);
  };
  
  return (
    <FavoritesContainer>
      <BackButton onClick={() => navigate('/journey-based')}>
        &larr; Back to Home
      </BackButton>
      
      <Title>My Favorites</Title>
      
      {favorites.length === 0 ? (
        <EmptyMessage>
          <p>You haven't added any movies to your favorites yet.</p>
          <ExploreButton to="/journey-based">Explore Movies</ExploreButton>
        </EmptyMessage>
      ) : (
        <MoviesGrid>
          {favorites.map(movie => (
            <MovieCard key={movie.id} id={`favorite-${movie.id}`}>
              <Link to={`/journey-based/movie/${movie.id}`}>
                <MoviePoster
                  src={movieApi.getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                  }}
                />
                <RemoveButton 
                  onClick={(e) => handleRemove(e, movie.id)}
                  aria-label={`Remove ${movie.title} from favorites`}
                >
                  ×
                </RemoveButton>
                <MovieInfo>
                  <MovieTitle>{movie.title}</MovieTitle>
                  <MovieYear>{getYearFromDate(movie.release_date)}</MovieYear>
                </MovieInfo>
              </Link>
            </MovieCard>
          ))}
        </MoviesGrid>
      )}
    </FavoritesContainer>
  );
};

export default FavoritesPage; 