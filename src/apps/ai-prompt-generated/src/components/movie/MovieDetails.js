import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDate, formatRuntime, formatMoney } from '../../utils/formatters';
import { movieApi } from '../../api';
import { useFavorites } from '../../context/FavoritesContext';
import Spinner from '../ui/Spinner';
import ErrorMessage from '../ui/ErrorMessage';
import FavoriteButton from './FavoriteButton';

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const PosterContainer = styled.div`
  flex: 0 0 300px;
  
  @media (max-width: 768px) {
    flex: 0 0 auto;
    max-width: 300px;
    margin: 0 auto;
  }
`;

const Poster = styled.img`
  width: 100%;
  border-radius: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const NoPoster = styled.div`
  width: 100%;
  aspect-ratio: 2/3;
  background-color: ${props => props.theme?.colors?.accent || '#f5f5f5'};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme?.colors?.text || '#333333'};
`;

const InfoContainer = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  margin: 0 0 0.5rem;
  font-size: 2rem;
  color: ${props => props.theme?.colors?.text || '#333333'};
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Tagline = styled.p`
  font-style: italic;
  color: #666666;
  margin: 0 0 1.5rem;
`;

const Overview = styled.div`
  margin-bottom: 1.5rem;
  
  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
  }
  
  p {
    line-height: 1.6;
    color: ${props => props.theme?.colors?.text || '#333333'};
  }
`;

const Metadata = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const MetaItem = styled.div`
  h4 {
    margin: 0 0 0.25rem;
    font-size: 0.875rem;
    color: #666666;
  }
  
  p {
    margin: 0;
    font-weight: 500;
    color: ${props => props.theme?.colors?.text || '#333333'};
  }
`;

const Genres = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Genre = styled.span`
  background-color: ${props => props.theme?.colors?.accent || '#f5f5f5'};
  color: ${props => props.theme?.colors?.text || '#333333'};
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  
  svg {
    color: #ffc107;
  }
  
  span {
    font-weight: 600;
    font-size: 1.125rem;
  }
`;

/**
 * MovieDetails component
 * @param {object} props - Component props
 * @param {object} props.movie - Movie data
 */
const MovieDetails = ({ movie }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentMovie, setCurrentMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await movieApi.getMovieDetails(movie.id);
        setCurrentMovie(data);
        
        // Destructure only the properties you need
        const { 
          title, 
          poster_path, 
          release_date, 
          vote_average 
        } = data;
        
        // Use only the variables you need
        setCurrentMovie({
          id: parseInt(movie.id),
          title,
          poster_path,
          release_date,
          vote_average
        });
        
        setError(null);
      } catch (err) {
        setError('Failed to fetch movie details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovieDetails();
  }, [movie.id]);

  if (!currentMovie) return null;
  
  const {
    id,
    title,
    poster_path,
    release_date,
    vote_average,
    vote_count,
    runtime,
    genres = [],
    overview,
    tagline,
    status,
    budget,
    revenue,
    production_companies = []
  } = currentMovie;
  
  const posterUrl = movieApi.getImageUrl(poster_path, 'w500');
  const releaseYear = release_date ? new Date(release_date).getFullYear() : '';
  
  return (
    <DetailsContainer>
      <PosterContainer>
        {posterUrl ? (
          <Poster src={posterUrl} alt={title} />
        ) : (
          <NoPoster>No Image Available</NoPoster>
        )}
      </PosterContainer>
      
      <InfoContainer>
        <Title>
          {title} {releaseYear && `(${releaseYear})`}
          <FavoriteButton 
            movie={{
              id,
              title,
              posterPath: poster_path,
              mediaType: 'movie'
            }}
          />
        </Title>
        
        {tagline && <Tagline>{tagline}</Tagline>}
        
        <Rating>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg>
          <span>{vote_average ? vote_average.toFixed(1) : 'N/A'}</span>
          {vote_count > 0 && <small>({vote_count} votes)</small>}
        </Rating>
        
        {genres.length > 0 && (
          <Genres>
            {genres.map(genre => (
              <Genre key={genre.id}>{genre.name}</Genre>
            ))}
          </Genres>
        )}
        
        <Metadata>
          {release_date && (
            <MetaItem>
              <h4>Release Date</h4>
              <p>{formatDate(release_date)}</p>
            </MetaItem>
          )}
          
          {runtime > 0 && (
            <MetaItem>
              <h4>Runtime</h4>
              <p>{formatRuntime(runtime)}</p>
            </MetaItem>
          )}
          
          {status && (
            <MetaItem>
              <h4>Status</h4>
              <p>{status}</p>
            </MetaItem>
          )}
        </Metadata>
        
        {overview && (
          <Overview>
            <h3>Overview</h3>
            <p>{overview}</p>
          </Overview>
        )}
        
        <Metadata>
          {budget > 0 && (
            <MetaItem>
              <h4>Budget</h4>
              <p>${budget.toLocaleString()}</p>
            </MetaItem>
          )}
          
          {revenue > 0 && (
            <MetaItem>
              <h4>Revenue</h4>
              <p>${revenue.toLocaleString()}</p>
            </MetaItem>
          )}
        </Metadata>
        
        {production_companies.length > 0 && (
          <MetaItem>
            <h4>Production Companies</h4>
            <p>{production_companies.map(company => company.name).join(', ')}</p>
          </MetaItem>
        )}
      </InfoContainer>
    </DetailsContainer>
  );
};

export default MovieDetails; 