import React, { createContext, useState, useEffect, useCallback } from 'react';

// Utility functions for local storage
const getFavoritesFromStorage = () => {
  try {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  } catch (error) {
    console.error('Error retrieving favorites from localStorage:', error);
    return [];
  }
};

const saveFavoritesToStorage = (favorites) => {
  try {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
  }
};

// Create context
export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const loadFavorites = async () => {
      setIsLoading(true);
      const storedFavorites = getFavoritesFromStorage();
      setFavorites(storedFavorites);
      setIsLoading(false);
    };

    loadFavorites();
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveFavoritesToStorage(favorites);
    }
  }, [favorites, isLoading]);

  // Add a movie or TV show to favorites
  const addFavorite = useCallback((item) => {
    setFavorites((prevFavorites) => {
      // Check if item already exists in favorites
      const exists = prevFavorites.some(
        (favorite) => 
          favorite.id === item.id && 
          favorite.mediaType === item.mediaType
      );
      
      if (exists) return prevFavorites;
      
      // Add new favorite with timestamp
      return [...prevFavorites, {
        ...item,
        addedAt: new Date().toISOString()
      }];
    });
  }, []);

  // Remove a movie or TV show from favorites
  const removeFavorite = useCallback((id, mediaType) => {
    setFavorites((prevFavorites) => 
      prevFavorites.filter(
        (item) => !(item.id === id && item.mediaType === mediaType)
      )
    );
  }, []);

  // Check if a movie or TV show is in favorites
  const isFavorite = useCallback((id, mediaType) => {
    return favorites.some(
      (item) => item.id === id && item.mediaType === mediaType
    );
  }, [favorites]);

  // Context value
  const value = {
    favorites,
    isLoading,
    addFavorite,
    removeFavorite,
    isFavorite,
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