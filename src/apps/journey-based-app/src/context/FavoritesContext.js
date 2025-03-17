import React, { createContext, useState, useEffect, useCallback } from 'react';

// Create context
export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // Get favorites from localStorage or default to empty array
  const getInitialFavorites = () => {
    try {
      const savedFavorites = localStorage.getItem('journey_favorites');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error('Error retrieving favorites from localStorage:', error);
      return [];
    }
  };

  const [favorites, setFavorites] = useState(getInitialFavorites);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('journey_favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [favorites]);

  // Add a movie to favorites
  const addFavorite = useCallback((movie) => {
    setFavorites(prevFavorites => {
      // Check if movie is already in favorites
      if (prevFavorites.some(fav => fav.id === movie.id)) {
        return prevFavorites;
      }
      return [...prevFavorites, movie];
    });
  }, []);

  // Remove a movie from favorites
  const removeFavorite = useCallback((movieId) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(movie => movie.id !== movieId)
    );
  }, []);

  // Check if a movie is in favorites
  const isFavorite = useCallback((movieId) => {
    return favorites.some(movie => movie.id === movieId);
  }, [favorites]);

  // Clear all favorites
  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  // Context value
  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook for using favorites
export const useFavorites = () => {
  const context = React.useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}; 