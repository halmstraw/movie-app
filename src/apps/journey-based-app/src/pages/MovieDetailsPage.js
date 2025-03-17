import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { movieApi } from '../api';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';

// Styled components
const MovieDetailsContainer = styled.div`
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

const MovieHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const PosterContainer = styled.div`
  flex: 0 0 300px;
  
  @media (min-width: 768px) {
    flex: 0 0 300px;
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const MovieInfo = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
  font-size: 2rem;
`;

const Tagline = styled.p`
  color: ${props => props.theme.colors.textSecondary || '#666'};
  font-style: italic;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const ReleaseInfo = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const InfoItem = styled.span`
  color: ${props => props.theme.colors.textSecondary || '#666'};
  font-size: 0.9rem;
`;

const GenresList = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const GenreTag = styled.span`
  background-color: ${props => props.theme.colors.primary}22;
  color: ${props => props.theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.9rem;
`;

const Overview = styled.div`
  margin-bottom: 1.5rem;
`;

const OverviewTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
`;

const OverviewText = styled.p`
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
`;

const AdditionalInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const InfoCard = styled.div`
  background-color: ${props => props.theme.colors.surface || '#f5f5f5'};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const InfoTitle = styled.h3`
  color: ${props => props.theme.colors.textSecondary || '#666'};
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const InfoValue = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;
  font-weight: 500;
`;

const FavoriteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.isFavorite ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.isFavorite ? 'white' : props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  margin-bottom: 1.5rem;
  
  &:hover {
    background-color: ${props => props.isFavorite ? `${props.theme.colors.primary}dd` : `${props.theme.colors.primary}22`};
  }
`;

const RecommendationsSection = styled.div`
  margin-top: 3rem;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1.5rem;
`;

const MovieCard = styled.div`
  background-color: ${props => props.theme.colors.surface || '#f5f5f5'};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

const SmallMoviePoster = styled.img`
  width: 100%;
  height: 225px;
  object-fit: cover;
`;

const SmallMovieInfo = styled.div`
  padding: 0.75rem;
`;

const SmallMovieTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SmallMovieYear = styled.p`
  color: ${props => props.theme.colors.textSecondary || '#666'};
  font-size: 0.8rem;
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

const NoRecommendationsMessage = styled.p`
  color: ${props => props.theme.colors.textSecondary || '#666'};
  font-style: italic;
`;

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Check if movie is in favorites
  const isFavorite = favorites.some(fav => fav.id === parseInt(movieId));
  
  // Fetch movie details and recommendations
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        
        // Fetch movie details
        const movieData = await movieApi.getMovieDetails(movieId);
        setMovie(movieData);
        
        // Fetch recommendations
        const recommendationsData = await movieApi.getMovieRecommendations(movieId);
        setRecommendations(recommendationsData.results.slice(0, 6));
        
        setError(null);
      } catch (err) {
        setError('Failed to load movie details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovieData();
  }, [movieId]);
  
  // Handle favorite toggle
  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(parseInt(movieId));
    } else if (movie) {
      addFavorite({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date
      });
    }
  };
  
  // Format runtime to hours and minutes
  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Extract year from release date
  const getYearFromDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).getFullYear();
  };
  
  // Format release date
  const formatReleaseDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  if (loading) {
    return (
      <MovieDetailsContainer>
        <LoadingMessage>Loading movie details...</LoadingMessage>
      </MovieDetailsContainer>
    );
  }
  
  if (error) {
    return (
      <MovieDetailsContainer>
        <BackButton onClick={() => navigate(-1)}>
          &larr; Go Back
        </BackButton>
        <ErrorMessage>{error}</ErrorMessage>
      </MovieDetailsContainer>
    );
  }
  
  if (!movie) {
    return (
      <MovieDetailsContainer>
        <BackButton onClick={() => navigate(-1)}>
          &larr; Go Back
        </BackButton>
        <ErrorMessage>Movie not found</ErrorMessage>
      </MovieDetailsContainer>
    );
  }
  
  return (
    <MovieDetailsContainer>
      <BackButton onClick={() => navigate(-1)}>
        &larr; Go Back
      </BackButton>
      
      <MovieHeader>
        <PosterContainer>
          <MoviePoster
            src={movieApi.getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
            }}
          />
        </PosterContainer>
        
        <MovieInfo>
          <Title>{movie.title} {movie.release_date && `(${getYearFromDate(movie.release_date)})`}</Title>
          
          {movie.tagline && <Tagline>{movie.tagline}</Tagline>}
          
          <ReleaseInfo>
            {movie.release_date && (
              <InfoItem>{formatReleaseDate(movie.release_date)}</InfoItem>
            )}
            {movie.runtime > 0 && (
              <InfoItem>• {formatRuntime(movie.runtime)}</InfoItem>
            )}
            {movie.vote_average > 0 && (
              <InfoItem>• Rating: {movie.vote_average.toFixed(1)}/10</InfoItem>
            )}
          </ReleaseInfo>
          
          {movie.genres && movie.genres.length > 0 && (
            <GenresList>
              {movie.genres.map(genre => (
                <GenreTag key={genre.id}>{genre.name}</GenreTag>
              ))}
            </GenresList>
          )}
          
          <FavoriteButton 
            onClick={handleFavoriteToggle}
            isFavorite={isFavorite}
            id="favorite-button"
          >
            {isFavorite ? '★ Remove from Favorites' : '☆ Add to Favorites'}
          </FavoriteButton>
          
          <Overview>
            <OverviewTitle>Overview</OverviewTitle>
            <OverviewText>{movie.overview || 'No overview available.'}</OverviewText>
          </Overview>
          
          <AdditionalInfo>
            {movie.budget > 0 && (
              <InfoCard>
                <InfoTitle>Budget</InfoTitle>
                <InfoValue>{formatCurrency(movie.budget)}</InfoValue>
              </InfoCard>
            )}
            
            {movie.revenue > 0 && (
              <InfoCard>
                <InfoTitle>Revenue</InfoTitle>
                <InfoValue>{formatCurrency(movie.revenue)}</InfoValue>
              </InfoCard>
            )}
            
            {movie.status && (
              <InfoCard>
                <InfoTitle>Status</InfoTitle>
                <InfoValue>{movie.status}</InfoValue>
              </InfoCard>
            )}
            
            {movie.original_language && (
              <InfoCard>
                <InfoTitle>Original Language</InfoTitle>
                <InfoValue>{movie.original_language.toUpperCase()}</InfoValue>
              </InfoCard>
            )}
          </AdditionalInfo>
        </MovieInfo>
      </MovieHeader>
      
      <RecommendationsSection>
        <SectionTitle>Recommendations</SectionTitle>
        
        {recommendations.length > 0 ? (
          <MoviesGrid>
            {recommendations.map(movie => (
              <MovieCard key={movie.id} id={`recommendation-${movie.id}`}>
                <Link to={`/journey-based/movie/${movie.id}`}>
                  <SmallMoviePoster
                    src={movieApi.getImageUrl(movie.poster_path)}
                    alt={movie.title}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150x225?text=No+Image';
                    }}
                  />
                  <SmallMovieInfo>
                    <SmallMovieTitle>{movie.title}</SmallMovieTitle>
                    <SmallMovieYear>{getYearFromDate(movie.release_date)}</SmallMovieYear>
                  </SmallMovieInfo>
                </Link>
              </MovieCard>
            ))}
          </MoviesGrid>
        ) : (
          <NoRecommendationsMessage>No recommendations available for this movie.</NoRecommendationsMessage>
        )}
      </RecommendationsSection>
    </MovieDetailsContainer>
  );
};

export default MovieDetailsPage; 