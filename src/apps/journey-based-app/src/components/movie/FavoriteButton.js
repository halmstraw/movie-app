import React from 'react';
import styled from 'styled-components';
import useFavorites from '../../hooks/useFavorites';

const FavoriteButtonContainer = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s ease;
  color: ${props => props.isFavorite ? '#ff6b6b' : '#999999'};
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: ${props => props.isFavorite ? '#ff6b6b' : '#666666'};
  }
  
  &:focus {
    outline: none;
  }
  
  svg {
    transition: transform 0.2s ease;
  }
  
  &:hover svg {
    transform: scale(1.1);
  }
`;

/**
 * FavoriteButton component
 * @param {object} props - Component props
 * @param {object} props.movie - Movie data with id, title, posterPath, and mediaType
 */
const FavoriteButton = ({ movie }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  
  const { id, mediaType = 'movie' } = movie;
  const isInFavorites = isFavorite(id, mediaType);
  
  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInFavorites) {
      removeFavorite(id, mediaType);
    } else {
      addFavorite(movie);
    }
  };
  
  return (
    <FavoriteButtonContainer 
      onClick={handleToggleFavorite}
      isFavorite={isInFavorites}
      aria-label={isInFavorites ? 'Remove from favorites' : 'Add to favorites'}
      title={isInFavorites ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isInFavorites ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
        </svg>
      )}
    </FavoriteButtonContainer>
  );
};

export default FavoriteButton; 