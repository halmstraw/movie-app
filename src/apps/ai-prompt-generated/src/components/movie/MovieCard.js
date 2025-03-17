import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { movieApi } from '../../api';
import Card from '../common/Card';
import FavoriteButton from './FavoriteButton';
import { truncateText } from '../../utils/formatters';

const MovieCardContainer = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MoviePoster = styled.img`
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
`;

const NoImage = styled.div`
  width: 100%;
  aspect-ratio: 2/3;
  background-color: ${props => props.theme?.colors?.accent || '#f5f5f5'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme?.colors?.text || '#333333'};
  font-size: 0.875rem;
`;

const MovieTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => props.theme?.colors?.text || '#333333'};
`;

const MovieYear = styled.span`
  font-size: 0.875rem;
  color: #666666;
`;

const MovieOverview = styled.p`
  margin: 0.5rem 0;
  font-size: 0.875rem;
  color: ${props => props.theme?.colors?.text || '#333333'};
  flex-grow: 1;
`;

const CardFooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: ${props => props.theme?.colors?.text || '#333333'};
  
  svg {
    color: #ffc107;
    margin-right: 0.25rem;
  }
`;

/**
 * MovieCard component
 * @param {object} props - Component props
 * @param {object} props.movie - Movie data
 */
const MovieCard = ({ movie }) => {
  const {
    id,
    title,
    poster_path,
    release_date,
    vote_average,
    overview
  } = movie;
  
  const releaseYear = release_date ? new Date(release_date).getFullYear() : '';
  const posterUrl = movieApi.getImageUrl(poster_path, 'w342');
  
  return (
    <MovieCardContainer interactive>
      <Link to={`/movie/${id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Card.Media>
          {posterUrl ? (
            <MoviePoster src={posterUrl} alt={title} />
          ) : (
            <NoImage>No Image Available</NoImage>
          )}
        </Card.Media>
        
        <Card.Content style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <MovieTitle>
            {title}
            {releaseYear && <MovieYear> ({releaseYear})</MovieYear>}
          </MovieTitle>
          
          <MovieOverview>
            {truncateText(overview, 120)}
          </MovieOverview>
        </Card.Content>
      </Link>
      
      <Card.Footer>
        <CardFooterContent>
          <Rating>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
            {vote_average ? vote_average.toFixed(1) : 'N/A'}
          </Rating>
          
          <FavoriteButton 
            movie={{
              id,
              title,
              posterPath: poster_path,
              mediaType: 'movie'
            }}
          />
        </CardFooterContent>
      </Card.Footer>
    </MovieCardContainer>
  );
};

export default MovieCard; 