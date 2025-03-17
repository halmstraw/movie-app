import React, { useState } from 'react';
import styled from 'styled-components';
import MainLayout from '../components/layout/MainLayout';
import MovieList from '../components/movie/MovieList';
import Loading from '../components/common/Loading';
import Button from '../components/common/Button';
import useFavorites from '../hooks/useFavorites';

const FavoritesContainer = styled.div`
  width: 100%;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${props => props.theme?.colors?.text || '#333333'};
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme?.colors?.text || '#333333'};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: ${props => props.theme?.colors?.text || '#333333'};
  
  p {
    margin-bottom: 2rem;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

/**
 * FavoritesPage component
 */
const FavoritesPage = () => {
  const { favorites, isLoading } = useFavorites();
  const [sortBy, setSortBy] = useState('date'); // 'date' or 'title'
  
  // Sort favorites based on the selected sort option
  const sortedFavorites = [...favorites].sort((a, b) => {
    if (sortBy === 'date') {
      // Sort by date added (newest first)
      return new Date(b.addedAt) - new Date(a.addedAt);
    } else {
      // Sort by title alphabetically
      return a.title.localeCompare(b.title);
    }
  });
  
  // Transform favorites to match the movie list format
  const favoriteMovies = sortedFavorites.map(favorite => ({
    id: favorite.id,
    title: favorite.title,
    poster_path: favorite.posterPath,
    // Add other properties as needed
  }));
  
  if (isLoading) {
    return (
      <MainLayout>
        <Loading text="Loading your favorites..." />
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <FavoritesContainer>
        <Header>
          <Title>Your Favorites</Title>
          <Description>
            {favorites.length > 0
              ? `You have ${favorites.length} favorite ${favorites.length === 1 ? 'movie' : 'movies'}.`
              : 'You haven\'t added any favorites yet.'}
          </Description>
          
          {favorites.length > 0 && (
            <FilterContainer>
              <Button
                variant={sortBy === 'date' ? 'contained' : 'outlined'}
                onClick={() => setSortBy('date')}
              >
                Sort by Date Added
              </Button>
              <Button
                variant={sortBy === 'title' ? 'contained' : 'outlined'}
                onClick={() => setSortBy('title')}
              >
                Sort by Title
              </Button>
            </FilterContainer>
          )}
        </Header>
        
        {favorites.length > 0 ? (
          <MovieList
            movies={favoriteMovies}
            loading={false}
            emptyMessage="No favorites found."
          />
        ) : (
          <EmptyState>
            <p>
              Start adding movies to your favorites by clicking the heart icon on any movie card or detail page.
            </p>
            <Button onClick={() => window.location.href = '/'}>
              Discover Movies
            </Button>
          </EmptyState>
        )}
      </FavoritesContainer>
    </MainLayout>
  );
};

export default FavoritesPage; 